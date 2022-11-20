import { Knex } from 'knex';

export const up = async (knex: Knex): Promise<void> => {
    await knex.schema.alterTable('todos', (table) => {
        table.uuid('workspaceId').notNullable();
        table.dropPrimary();
        table.primary(['id', 'workspaceId']);
    });
};

export const down = async (knex: Knex): Promise<void> => {
    await knex.schema.alterTable('todos', (table) => {
        table.dropColumn('workspaceId');
        table.dropPrimary();
        table.primary(['id']);
    });
};
