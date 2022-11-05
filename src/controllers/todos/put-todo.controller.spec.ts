import request from 'supertest';
import { server } from '../../tests/helpers';
import { putTodoController } from './put-todo.controller';
import { createStubTodo } from './todo.stub';

jest.mock('./todo.dao');
type TodoDaoMock = jest.Mocked<typeof import('./todo.dao')>;

describe('putTodoController', () => {
    const route = '/todos/:id';

    const app = server((s) => {
        s.post(route, putTodoController);
    });

    it('creates a todo', async () => {
        const { updateTodo } = require('./todo.dao') as TodoDaoMock;
        const todo = createStubTodo();
        updateTodo.mockResolvedValue(todo);

        const response = await request(app)
            .post(route.replace(':id', todo.id))
            .send(todo)
            .expect(200);
        expect(response).toHaveProperty('body', todo);

        expect(updateTodo).toHaveBeenCalledWith(todo.id, todo);
    });
});
