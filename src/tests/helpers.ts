import express, { Express } from 'express';
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
