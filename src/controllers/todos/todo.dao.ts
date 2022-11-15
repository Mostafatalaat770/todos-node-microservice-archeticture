import { v4 as uuid } from 'uuid';
import { db } from '../../database/db';
import { Todo, TodoId } from './todo.type';

export const getTodo = async (id: TodoId): Promise<Todo | undefined> =>
    db<Todo>('todos').where({ id }).first();

export const getTodos = async (): Promise<Todo[]> =>
    db.table<Todo>('todos').select('*');

export const createTodo = async (todo: Omit<Todo, 'id'>): Promise<Todo> => {
    const todoWithId = {
        ...todo,
        id: uuid(),
    };
    await db.table<Todo>('todos').insert(todoWithId);
    return todoWithId;
};

export const updateTodo = async (
    id: TodoId,
    todo: Omit<Todo, 'id'>
): Promise<Todo | 'NotFound'> => {
    const updatedTodo = {
        ...todo,
        id,
    };
    const changedRowsCount = await db
        .table<Todo>('todos')
        .where({ id })
        .update(updatedTodo);
    return changedRowsCount === 0 ? 'NotFound' : updatedTodo;
};

export const deleteTodo = async (id: TodoId): Promise<'OK' | 'NotFound'> => {
    const deletedRowsCount = await db
        .table<Todo>('todos')
        .where({ id })
        .delete();
    return deletedRowsCount === 0 ? 'NotFound' : 'OK';
};
