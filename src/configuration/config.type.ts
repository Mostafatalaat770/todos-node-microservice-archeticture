import { Knex } from 'knex';
import { Level } from 'pino';

export type Environment = 'production' | 'local';

export interface Config {
    environment: Environment;
    logLevel: Level;
    authentication: {
        enabled: boolean;
        jwksUrl: string;
    };
    database: Knex.PgConnectionConfig;
}

export interface ProcessVariables {
    ENV?: Environment;
    LOG_LEVEL?: Level;
    JWKS_URL?: string;
    DATABASE_URL?: string;
}
