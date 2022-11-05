import { NextFunction, Request, Response } from 'express';
import { createTodo } from './todo.dao';

export const postTodoController = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const todo = await createTodo(request.body);
        response.status(201).send(todo);
    } catch (error) {
        next(error);
    }
};
