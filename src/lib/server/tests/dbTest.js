// tests/db.test.js
const pool = require('../config/db');

describe('Database Connection Tests', () => {
    test('Database should connect successfully', async () => {
        const connection = await pool.getConnection();
        expect(connection).toBeDefined();
        connection.release();
    });

    test('Users table should exist', async () => {
        const [rows] = await pool.execute("SHOW TABLES LIKE 'users'");
        expect(rows.length).toBe(1);
    });
});
