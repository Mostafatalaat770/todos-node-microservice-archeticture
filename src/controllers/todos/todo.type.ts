export type TodoId = string;

export interface Todo {
    id: TodoId;
    name: string;
    assignee: string;
    dueDate: string;
}
