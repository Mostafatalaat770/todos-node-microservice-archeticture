import request from 'supertest';
import { server } from '../../tests/helpers';
import { putTodoController } from './put-todo.controller';
import { createStubTodo } from './todo.stub';

jest.mock('./todo.dao');
type TodoDaoMock = jest.Mocked<typeof import('./todo.dao')>;

describe('putTodoController', () => {
    const route = '/todos/:id';

    const app = server((s) => {
        s.put(route, putTodoController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('updates a todo', async () => {
        const { updateTodo } = require('./todo.dao') as TodoDaoMock;
        const todo = createStubTodo();
        updateTodo.mockResolvedValue(todo);

        const response = await request(app)
            .put(route.replace(':id', todo.id))
            .send(todo)
            .expect(200);
        expect(response).toHaveProperty('body', todo);

        expect(updateTodo).toHaveBeenCalledWith(todo.id, todo);
    });

    it('rejects an invalid ID', async () => {
        const { updateTodo } = require('./todo.dao') as TodoDaoMock;
        const todo = createStubTodo();
        updateTodo.mockResolvedValue(todo);
        const response = await request(app)
            .put(route.replace(':id', '123'))
            .send(todo)
            .expect(400);
        expect(response).toHaveProperty(
            'body.message',
            'request.params.id should match format "uuid"'
        );
        expect(updateTodo).not.toHaveBeenCalled();
    });

    it('rejects an invalid todo', async () => {
        const { updateTodo } = require('./todo.dao') as TodoDaoMock;
        const todo = createStubTodo();
        updateTodo.mockResolvedValue(todo);
        const response = await request(app)
            .put(route.replace(':id', todo.id))
            .send({ ...todo, dueDate: '123' })
            .expect(400);
        expect(response).toHaveProperty(
            'body.message',
            'request.body.dueDate should match format "date-time"'
        );
        expect(updateTodo).not.toHaveBeenCalled();
    });
});
