/** @type {import('ts-jest').JestConfigWithTsJest} */

process.env = Object.assign(process.env, {
    DISABLE_LOGGER: 'true',
    ENV: 'test',
});

module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['.d.ts', '.js'],
    globalSetup: '<rootDir>/src/database/db-test.setup.ts',
    globalTeardown: '<rootDir>/src/database/db-test.teardown.ts',
};
