import { NextFunction, Request, Response } from 'express';
import { updateTodo } from './todo.dao';

export const putTodoController = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const todo = await updateTodo(request.params.id, request.body);
        response.send(todo);
    } catch (error) {
        next(error);
    }
};
