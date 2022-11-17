// eslint-disable-next-line import/no-extraneous-dependencies
import { StartedTestContainer, GenericContainer } from 'testcontainers';
import { mkdir, writeFile } from 'fs/promises';
import path from 'path';
import os from 'os';

const spawnDatabase = (): Promise<StartedTestContainer> =>
    new GenericContainer('postgres:14')
        .withEnvironment({
            POSTGRES_USER: 'postgres',
            POSTGRES_DB: 'postgres',
            POSTGRES_PASSWORD: 'secret',
        })
        .withExposedPorts(5432)
        .withTmpFs({ '/temp_pgdata': 'rw,noexec,nosuid,size=65536k' })
        .start();

const shareDatabaseConfig = async (container: StartedTestContainer) => {
    const variablesDir = path.join(
        os.tmpdir(),
        'jest_testcontainers_global_setup'
    );
    await mkdir(variablesDir, { recursive: true });
    await writeFile(
        path.join(variablesDir, 'databasePort'),
        container.getMappedPort(5432).toString()
    );
};

const shareContainerForTeardown = (container: StartedTestContainer) => {
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-explicit-any
    (globalThis as any).__DATABASE_CONTAINER__ = container;
};

const setupDatabase = async (): Promise<void> => {
    const container = await spawnDatabase();
    await shareDatabaseConfig(container);
};

export default setupDatabase;
