import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
    await knex.schema.createTable('todos', (table) => {
        table.uuid('id').primary();
        table.string('name').notNullable();
        table.string('assignee').notNullable();
        table.date('dueDate').notNullable();
    });
};

export const down = async (knex: Knex): Promise<void> => {
    await knex.schema.dropTable('todos');
};
