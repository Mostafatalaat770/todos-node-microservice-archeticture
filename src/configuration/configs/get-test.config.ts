import path from 'path';
import os from 'os';
import { readFileSync } from 'fs';
import { Config, ProcessVariables } from '../config.type';

const readDatabasePort = (): number | undefined => {
    const variablesDir = path.join(
        os.tmpdir(),
        'jest_testcontainers_global_setup'
    );
    const port = readFileSync(path.join(variablesDir, 'databasePort'), 'utf8');
    // eslint-disable-next-line radix
    return port ? parseInt(port) : undefined;
};

export const getTestConfig = (processVariables: ProcessVariables): Config => ({
    environment: 'test',
    logLevel: processVariables.LOG_LEVEL ?? 'info',
    authentication: {
        enabled: false,
        jwksUrl: '<jwksUrl> is not set in a test environment',
    },
    database: {
        user: 'postgres',
        host: 'localhost',
        database: 'postgres',
        port: readDatabasePort(),
        password: 'secret',
        ssl: false,
    },
    http: {
        servicesUrl: 'http://localhost:3001',
        clientId: 'todos',
        clientSecret: 'secret',
    },
});
