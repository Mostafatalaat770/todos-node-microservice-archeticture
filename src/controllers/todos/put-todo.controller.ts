import { NextFunction, Request, Response } from 'express';
import { getToken } from '../../jwt-token';
import { updateTodo } from './todo.dao';

export const putTodoController = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { workspaceId } = getToken(response);
        const todo = await updateTodo(
            workspaceId,
            request.params.id,
            request.body
        );
        if (todo === 'NotFound') {
            response.status(404).send({ message: 'Todo not found' });
        } else {
            response.send(todo);
        }
    } catch (error) {
        next(error);
    }
};
