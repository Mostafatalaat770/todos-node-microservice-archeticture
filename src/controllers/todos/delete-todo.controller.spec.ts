import request from 'supertest';
import { server } from '../../tests/helpers';
import { deleteTodoController } from './delete-todo.controller';
import { createStubTodo } from './todo.stub';

jest.mock('./todo.dao');
type TodoDaoMock = jest.Mocked<typeof import('./todo.dao')>;

describe('deleteTodoController', () => {
    const route = '/todos/:id';

    const app = server((s) => {
        s.delete(route, deleteTodoController);
    });

    it('deletes a todo', async () => {
        const { deleteTodo } = require('./todo.dao') as TodoDaoMock;
        const todo = createStubTodo();
        deleteTodo.mockResolvedValue();

        await request(app).delete(route.replace(':id', todo.id)).expect(204);

        expect(deleteTodo).toHaveBeenCalledWith(todo.id);
    });
});
