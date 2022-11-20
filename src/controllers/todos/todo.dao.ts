import { v4 as uuid } from 'uuid';
import { db } from '../../database/db';
import { WorkspaceId } from '../../workspace-id.type';
import { DbTodo, Todo, todoFields, TodoId } from './todo.type';

export const getTodo = async (
    workspaceId: WorkspaceId,
    id: TodoId
): Promise<Todo | undefined> =>
    db<DbTodo>('todos').where({ id, workspaceId }).first<Todo>(todoFields);

export const getTodos = async (workspaceId: WorkspaceId): Promise<Todo[]> =>
    db.table<DbTodo>('todos').where({ workspaceId }).select(todoFields);

export const createTodo = async (
    workspaceId: WorkspaceId,
    todo: Omit<Todo, 'id'>
): Promise<Todo> => {
    const todoWithId = {
        ...todo,
        id: uuid(),
    };
    await db.table<DbTodo>('todos').insert({
        ...todoWithId,
        workspaceId,
    });
    return todoWithId;
};

export const updateTodo = async (
    workspaceId: WorkspaceId,
    id: TodoId,
    todo: Omit<Todo, 'id'>
): Promise<Todo | 'NotFound'> => {
    const updatedTodo = {
        ...todo,
        id,
    };
    const changedRowsCount = await db
        .table<DbTodo>('todos')
        .where({ id, workspaceId })
        .update(updatedTodo);
    return changedRowsCount === 0 ? 'NotFound' : updatedTodo;
};

export const deleteTodo = async (
    workspaceId: WorkspaceId,
    id: TodoId
): Promise<'OK' | 'NotFound'> => {
    const deletedRowsCount = await db
        .table<DbTodo>('todos')
        .where({ id, workspaceId })
        .delete();
    return deletedRowsCount === 0 ? 'NotFound' : 'OK';
};
