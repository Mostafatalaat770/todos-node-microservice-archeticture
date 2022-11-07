import express from 'express';
import swagger from 'swagger-ui-express';
import { todosRoute } from './controllers/todos/todo.router';
import { sendErrorResponse } from './error-handling/error-handler';
import openapi from '../assets/openapi.json';
import { serveOpenapiSpec } from './pre-requests-handlers/openapi';
import { logRequest } from './pre-requests-handlers/logger';

const app = express();

app.use(express.json({ limit: '1mb' }));
app.use(logRequest());
app.use('/todos', todosRoute);
app.use('/openapi.json', serveOpenapiSpec);
app.use('/swagger.json', swagger.serve, swagger.setup(openapi));

app.use(sendErrorResponse);

export default app;
