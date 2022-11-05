import request from 'supertest';
import { server } from '../../tests/helpers';
import { createStubTodo } from './todo.stub';
import { getTodosController } from './get-todos.controller';

jest.mock('./todo.dao');
type TodoDaoMock = jest.Mocked<typeof import('./todo.dao')>;

describe('getTodoController', () => {
    const route = '/todos';

    const app = server((s) => {
        s.get(route, getTodosController);
    });

    it('returns available todos', async () => {
        const { getTodos } = require('./todo.dao') as TodoDaoMock;
        const todos = [createStubTodo(), createStubTodo()];
        getTodos.mockResolvedValue(todos);

        const response = await request(app).get(route).expect(200);
        expect(response).toHaveProperty('body', todos);

        expect(getTodos).toHaveBeenCalled();
    });
});
