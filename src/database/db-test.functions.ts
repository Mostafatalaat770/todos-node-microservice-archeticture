import { db } from './db';

export const migrateDatabase = async () => {
    await db.migrate.latest({ directory: './src/database/migrations' });
};

export const truncateTables = async () => {
    await db.table('todos').truncate();
};
