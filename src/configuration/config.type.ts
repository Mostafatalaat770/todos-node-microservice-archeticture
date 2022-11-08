import { Level } from 'pino';

export type Environment = 'production' | 'local';

export interface Config {
    environment: Environment;
    logLevel: Level;
}

export interface ProcessVariables {
    ENV?: Environment;
    LOG_LEVEL?: Level;
}
