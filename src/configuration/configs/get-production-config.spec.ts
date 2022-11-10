import { Knex } from 'knex';
import { getProductionConfig } from './get-production-config';

describe('the production environment', () => {
    it('prefers the log level from the environment', () => {
        expect(getProductionConfig({ LOG_LEVEL: 'fatal' })).toHaveProperty(
            'logLevel',
            'fatal'
        );
    });

    it('defaults the log level to info', () => {
        expect(getProductionConfig({})).toHaveProperty('logLevel', 'info');
    });

    it('read the database url from the environment', () => {
        expect(
            getProductionConfig({
                DATABASE_URL: 'postgresql://username:password@host:port/dbname',
            })
        ).toHaveProperty('database', {
            connectionString: 'postgresql://username:password@host:port/dbname',
            ssl: true,
        } as Knex.PgConnectionConfig);
    });
});
