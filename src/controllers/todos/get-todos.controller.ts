import { NextFunction, Request, Response } from 'express';
import { getToken } from '../../jwt-token';
import { getTodos } from './todo.dao';

export const getTodosController = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const { workspaceId } = getToken(response);
        const todos = await getTodos(workspaceId);
        response.send(todos);
    } catch (error) {
        next(error);
    }
};
