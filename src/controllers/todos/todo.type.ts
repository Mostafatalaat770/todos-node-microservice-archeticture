export type TodoId = string;

export interface Todo {
    id: TodoId;
    name: string;
    asignee: string;
    dueDate: string;
}
