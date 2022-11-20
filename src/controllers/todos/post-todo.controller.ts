import { NextFunction, Request, Response } from 'express';
import { getToken } from '../../jwt-token';
import { createTodo } from './todo.dao';

export const postTodoController = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { workspaceId } = getToken(response);
        const todo = await createTodo(workspaceId, request.body);
        response.status(201).send(todo);
    } catch (error) {
        next(error);
    }
};
