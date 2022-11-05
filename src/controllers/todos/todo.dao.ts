import { Todo, TodoId } from './todo.type';

export const getTodo = async (id: TodoId): Promise<Todo | undefined> =>
    undefined;

export const getTodos = async (): Promise<Todo[]> => [];

export const createTodo = async (todo: Todo): Promise<Todo> => todo;

export const updateTodo = async (id: TodoId, todo: Todo): Promise<Todo> => todo;

export const deleteTodo = async (id: TodoId): Promise<void> => {};
