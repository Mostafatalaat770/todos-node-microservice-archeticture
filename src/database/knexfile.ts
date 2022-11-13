/* eslint-disable import/no-import-module-exports */
import { Knex } from 'knex';
import { config } from '../configuration/config';

const knexConfig = {
    client: 'pg',
    connection: config.database,
    migrations: {
        directory: './migrations',
    },
    seeds: {
        directory: './seeds',
    },
} as Knex.Config;

module.exports = knexConfig;
