import { Knex } from 'knex';
import { Level } from 'pino';

export type Environment = 'production' | 'local' | 'test';

export interface Config {
    environment: Environment;
    logLevel: Level;
    authentication: {
        enabled: boolean;
        jwksUrl: string;
    };
    database: Knex.PgConnectionConfig;
    http: {
        servicesUrl: string;
        clientId: string;
        clientSecret: string;
    };
}

export interface ProcessVariables {
    ENV?: Environment;
    LOG_LEVEL?: Level;
    JWKS_URL?: string;
    DATABASE_URL?: string;
    SERVICES_URL?: string;
    CLIENT_ID?: string;
    CLIENT_SECRET?: string;
}
