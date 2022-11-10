import { Level } from 'pino';

export type Environment = 'production' | 'local';

export interface Config {
    environment: Environment;
    logLevel: Level;
    authentication: {
        enabled: boolean;
        jwksUrl: string;
    };
}

export interface ProcessVariables {
    ENV?: Environment;
    LOG_LEVEL?: Level;
    JWKS_URL?: string;
}
