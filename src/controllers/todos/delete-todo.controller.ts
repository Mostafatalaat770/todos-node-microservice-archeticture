import { NextFunction, Request, Response } from 'express';
import { getToken } from '../../jwt-token';
import { sendNotification } from './notification.service';
import { deleteTodo } from './todo.dao';

export const deleteTodoController = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { workspaceId } = getToken(response);
        await deleteTodo(workspaceId, request.params.id);
        await sendNotification(`deleted todo ${request.params.id}`);
        response.sendStatus(204);
    } catch (error) {
        next(error);
    }
};
