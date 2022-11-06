import express from 'express';
import { validateInputs } from '../../pre-requests-handlers/openapi';
import { deleteTodoController } from './delete-todo.controller';
import { getTodoController } from './get-todo.controller';
import { getTodosController } from './get-todos.controller';
import { postTodoController } from './post-todo.controller';
import { putTodoController } from './put-todo.controller';

export const todosRoute = express.Router();

todosRoute.use(validateInputs);

todosRoute.get('/:id', getTodoController);
todosRoute.get('', getTodosController);
todosRoute.put('/:id', putTodoController);
todosRoute.delete('/:id', deleteTodoController);
todosRoute.post('', postTodoController);
