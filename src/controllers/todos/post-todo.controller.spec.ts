import request from 'supertest';
import { server } from '../../tests/helpers';
import { postTodoController } from './post-todo.controller';
import { createStubTodo } from './todo.stub';

jest.mock('./todo.dao');
type TodoDaoMock = jest.Mocked<typeof import('./todo.dao')>;

describe('postTodoController', () => {
    const route = '/todos';

    const app = server((s) => {
        s.post(route, postTodoController);
    });

    it('creates a todo', async () => {
        const { createTodo } = require('./todo.dao') as TodoDaoMock;
        const todo = createStubTodo();
        createTodo.mockResolvedValue(todo);

        const response = await request(app).post(route).send(todo).expect(201);
        expect(response).toHaveProperty('body', todo);

        expect(createTodo).toHaveBeenCalledWith(todo);
    });
});
