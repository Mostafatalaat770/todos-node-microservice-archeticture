import express from 'express';
import { todosRoute } from './controllers/todos/todo.router';
import { sendErrorResponse } from './error-handling/error-handler';
import { serveOpenapiSpec } from './pre-requests-handlers/openapi';

const app = express();

app.use(express.json({ limit: '1mb' }));

app.use('/todos', todosRoute);
app.use('/openapi.json', serveOpenapiSpec);

app.use(sendErrorResponse);
export default app;
