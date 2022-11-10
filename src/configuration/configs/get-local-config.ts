import { Config, ProcessVariables } from '../config.type';

export const getLocalConfig = (processVariables: ProcessVariables): Config => ({
    environment: 'local',
    logLevel: processVariables.LOG_LEVEL || 'debug',
    authentication: {
        enabled: false,
        jwksUrl: '',
    },
    database: {
        host: 'localhost',
        port: 5432,
        user: 'postgres',
        password: 'secret',
        database: 'postgres',
        ssl: false,
    },
});
