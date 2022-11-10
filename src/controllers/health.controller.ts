import { NextFunction, Request, Response } from 'express';
import { db } from '../database/db';

export const healthController = async (
    request: Request,
    response: Response,
    next: NextFunction
): Promise<void> => {
    try {
        await db.from('information_schema.tables').select();
        response.status(204).send('OK');
    } catch (error) {
        next(error);
    }
};
