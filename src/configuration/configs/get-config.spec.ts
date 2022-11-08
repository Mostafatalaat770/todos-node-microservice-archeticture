import { getConfig } from './get-config';

jest.mock('./get-local-config', () => ({
    getLocalConfig: () => ({ environment: 'local' }),
}));
jest.mock('./get-production-config', () => ({
    getProductionConfig: () => ({
        environment: 'production',
    }),
}));

describe('the configuration', () => {
    it('should defaults to the local environment', () => {
        expect(getConfig({})).toHaveProperty('environment', 'local');
    });

    it('should return the local configuration', () => {
        const config = getConfig({ ENV: 'local' });
        expect(config).toHaveProperty('environment', 'local');
    });

    it('should return the production configuration', () => {
        const config = getConfig({ ENV: 'production' });
        expect(config).toHaveProperty('environment', 'production');
    });
});
