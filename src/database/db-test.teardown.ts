import { db } from './db';

export const teardownDatabase = async (): Promise<void> => {
    // eslint-disable-next-line no-underscore-dangle, @typescript-eslint/no-explicit-any
    (globalThis as any).__DATABASE_CONTAINER__.stop();
    await db.destroy();
};

export default teardownDatabase;
