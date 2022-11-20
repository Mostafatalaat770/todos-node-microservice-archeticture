import { v4 as uuid } from 'uuid';
import { omit } from 'lodash/fp';
import {
    migrateDatabase,
    truncateTables,
} from '../../database/db-test.functions';
import {
    getTodos,
    createTodo,
    deleteTodo,
    getTodo,
    updateTodo,
} from './todo.dao';
import { createStubTodo } from './todo.stub';

describe('the todo dao', () => {
    beforeAll(migrateDatabase);
    afterEach(truncateTables);
    it('retrieves no todos if the workspaceId is empty', async () => {
        const workspaceId = uuid();
        await expect(getTodos(workspaceId)).resolves.toEqual([]);
    });

    it('inserts a todo and retrieves it', async () => {
        const workspaceId = uuid();
        const todo = omit('id', createStubTodo());
        const createdTodo = await createTodo(workspaceId, todo);
        expect(createdTodo).toHaveProperty('id');
        await expect(getTodos(workspaceId)).resolves.toEqual([createdTodo]);
        await expect(getTodo(workspaceId, createdTodo.id)).resolves.toEqual(
            createdTodo
        );
    });

    it('does not retireve todo of a different workspace', async () => {
        const workspaceId1 = uuid();
        const workspaceId2 = uuid();
        const todo = omit('id', createStubTodo());
        const createdTodo = await createTodo(workspaceId1, todo);
        await expect(getTodos(workspaceId2)).resolves.toEqual([]);
        await expect(
            getTodo(workspaceId2, createdTodo.id)
        ).resolves.toBeUndefined();
    });

    it('updates an existing todo', async () => {
        const workspaceId = uuid();
        const toBeCreatedTodo = omit('id', createStubTodo());
        const createdTodo = await createTodo(workspaceId, toBeCreatedTodo);
        const toBeUpdatedTodo = omit('id', createStubTodo());
        const updatedTodo = await updateTodo(
            workspaceId,
            createdTodo.id,
            toBeUpdatedTodo
        );
        await expect(getTodos(workspaceId)).resolves.toEqual([updatedTodo]);
        await expect(getTodo(workspaceId, createdTodo.id)).resolves.toEqual(
            updatedTodo
        );
    });

    it('does not update a todo of a different workspace', async () => {
        const workspaceId1 = uuid();
        const workspaceId2 = uuid();
        const toBeCreatedTodo = omit('id', createStubTodo());
        const createdTodo = await createTodo(workspaceId1, toBeCreatedTodo);
        const toBeUpdatedTodo = omit('id', createStubTodo());
        await expect(
            updateTodo(workspaceId2, createdTodo.id, toBeUpdatedTodo)
        ).resolves.toBe('NotFound');
        await expect(getTodos(workspaceId1)).resolves.toEqual([createdTodo]);
        await expect(getTodo(workspaceId1, createdTodo.id)).resolves.toEqual(
            createdTodo
        );
        await expect(getTodos(workspaceId2)).resolves.toEqual([]);
        await expect(
            getTodo(workspaceId2, createdTodo.id)
        ).resolves.toBeUndefined();
    });

    it('deletes an existing todo', async () => {
        const workspaceId = uuid();
        const toBeCreatedTodo = omit('id', createStubTodo());
        const createdTodo = await createTodo(workspaceId, toBeCreatedTodo);
        await expect(deleteTodo(workspaceId, createdTodo.id)).resolves.toEqual(
            'OK'
        );
        await expect(getTodos(workspaceId)).resolves.toEqual([]);
        await expect(getTodo(workspaceId, createdTodo.id)).resolves.toEqual(
            undefined
        );
    });

    it('does not delete a todo of a different workspace', async () => {
        const workspaceId1 = uuid();
        const workspaceId2 = uuid();
        const toBeCreatedTodo = omit('id', createStubTodo());
        const createdTodo = await createTodo(workspaceId1, toBeCreatedTodo);
        await expect(deleteTodo(workspaceId2, createdTodo.id)).resolves.toEqual(
            'NotFound'
        );
        await expect(getTodos(workspaceId1)).resolves.toEqual([createdTodo]);
        await expect(getTodo(workspaceId1, createdTodo.id)).resolves.toEqual(
            createdTodo
        );
        await expect(getTodos(workspaceId2)).resolves.toEqual([]);
        await expect(
            getTodo(workspaceId2, createdTodo.id)
        ).resolves.toBeUndefined();
    });

    it('does not find a non-existing todo on update', async () => {
        const workspaceId = uuid();
        const todo = omit('id', createStubTodo());
        await expect(updateTodo(workspaceId, uuid(), todo)).resolves.toEqual(
            'NotFound'
        );
    });

    it('does not find a non-existing todo on delete', async () => {
        const workspaceId = uuid();
        await expect(deleteTodo(workspaceId, uuid())).resolves.toEqual(
            'NotFound'
        );
    });
});
