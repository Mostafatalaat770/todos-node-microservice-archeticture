import knex from 'knex';
import { config } from '../configuration/config';

export const db = knex({
    client: 'pg',
    connection: config.database,
});
