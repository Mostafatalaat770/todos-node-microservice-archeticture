import request from 'supertest';
import { v4 as uuid } from 'uuid';
import { server } from '../../tests/helpers';
import { deleteTodoController } from './delete-todo.controller';
import { createStubTodo } from './todo.stub';

const workspaceId = uuid();

jest.mock('./todo.dao');
jest.mock('../../jwt-token', () => ({
    getToken: () => ({ workspaceId }),
}));
jest.mock('./notification.service');

type TodoDaoMock = jest.Mocked<typeof import('./todo.dao')>;

describe('deleteTodoController', () => {
    const route = '/todos/:id';

    const app = server((s) => {
        s.delete(route, deleteTodoController);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('deletes the todo, sends a notification and returns a 204', async () => {
        const { deleteTodo } = require('./todo.dao') as TodoDaoMock;
        const todo = createStubTodo();
        deleteTodo.mockResolvedValue('OK');
        const { sendNotification } = require('./notification.service');
        await request(app).delete(route.replace(':id', todo.id)).expect(204);

        expect(deleteTodo).toHaveBeenCalledWith(workspaceId, todo.id);
        expect(sendNotification).toHaveBeenCalledWith(
            `deleted todo ${todo.id}`
        );
    });

    it('rejects an invalid ID', async () => {
        const { deleteTodo } = require('./todo.dao') as TodoDaoMock;
        const todoId = '123';
        deleteTodo.mockResolvedValue('NotFound');
        const response = await request(app)
            .delete(route.replace(':id', todoId))
            .expect(400);
        expect(response).toHaveProperty(
            'body.message',
            'request.params.id should match format "uuid"'
        );
        expect(deleteTodo).not.toHaveBeenCalled();
    });
});
