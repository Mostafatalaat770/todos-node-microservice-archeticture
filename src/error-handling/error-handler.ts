import { NextFunction, Request, Response } from 'express';

export const sendErrorResponse = (
    error: Error & { status?: number; errors?: unknown[] },
    _request: Request,
    response: Response,
    _next: NextFunction
): void => {
    const status = error.status ?? 500;
    response.status(status).json({
        message: error.message,
        errors: error.errors,
    });
};
