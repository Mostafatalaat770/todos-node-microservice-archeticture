import { NextFunction, Request, Response } from 'express';
import { updateTodo } from './todo.dao';

export const putTodoController = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const todo = await updateTodo(request.params.id, request.body);
        if (todo === 'NotFound') {
            response.status(404).send({ message: 'Todo not found' });
        } else {
            response.send(todo);
        }
    } catch (error) {
        next(error);
    }
};
