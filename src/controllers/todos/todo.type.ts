import { WithWorkspaceId } from '../../workspace-id.type';

export type TodoId = string;

export interface Todo {
    id: TodoId;
    name: string;
    assignee: string;
    dueDate: string;
}

export type DbTodo = Todo & WithWorkspaceId;

export const todoFields: (keyof Todo)[] = ['id', 'name', 'assignee', 'dueDate'];
