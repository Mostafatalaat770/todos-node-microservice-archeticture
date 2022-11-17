import knex from 'knex';
import { types } from 'pg';
import { config } from '../configuration/config';

types.setTypeParser(1082, (date: string) => date);

export const db = knex({
    client: 'pg',
    connection: config.database,
});
