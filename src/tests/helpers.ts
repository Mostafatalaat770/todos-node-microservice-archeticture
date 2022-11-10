import express, { Express, NextFunction, Request, Response } from 'express';
import { sendErrorResponse } from '../error-handling/error-handler';
import { logRequest } from '../pre-requests-handlers/logger';
import { validateInputs } from '../pre-requests-handlers/openapi';

export const server = (configure: (express: Express) => void): Express => {
    const app = express();
    app.use(express.json({ limit: '1mb' }));
    app.use(logRequest(false));
    app.use(validateInputs);
    configure(app);
    app.use(sendErrorResponse);
    return app;
};

export const mockControllerInputs = (
    request: Partial<Request>
): {
    request: Request;
    response: Response;
    next: NextFunction;
} => ({
    request: {
        params: {},
        ...request,
    } as unknown as Request,
    response: {
        locals: {},
        status: jest.fn().mockReturnThis(),
        sendStatus: jest.fn(),
        send: jest.fn(),
        end: jest.fn().mockReturnThis(),
    } as unknown as Response,
    next: jest.fn() as NextFunction,
});
