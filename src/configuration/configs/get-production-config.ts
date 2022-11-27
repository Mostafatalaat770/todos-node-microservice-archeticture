import { Config, ProcessVariables } from '../config.type';

export const getProductionConfig = (
    processVariables: ProcessVariables
): Config => ({
    environment: 'production',
    logLevel: processVariables.LOG_LEVEL || 'info',
    authentication: {
        enabled: true,
        jwksUrl:
            processVariables.JWKS_URL ??
            '<JWKS_URL> needs to be set in production environment',
    },
    database: {
        connectionString: processVariables.DATABASE_URL,
        ssl: true,
    },
    http: {
        servicesUrl:
            processVariables.SERVICES_URL ??
            '<SERVICES_URL> needs to be set in production environment',
    },
});
