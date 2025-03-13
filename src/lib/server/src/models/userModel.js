const pool = require('../config/db')


const createUserTable = async () => {
    const sql =`
            CREATE TABLE IF NOT EXISTS users(
                id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
                username VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                role ENUM('admin', 'user') NOT NULL 'user',
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
    `;
    await pool.query(sql);
};

module.exports = { createUserTable };