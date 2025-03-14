const pool = require('../config/db')

const createUserTable = async () => {
    const sql =`
            CREATE TABLE IF NOT EXISTS users(
                id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
                username VARCHAR(255) UNIQUE NOT NULL,
                email VARCHAR(255) UNIQUE NOT NULL,
                role ENUM('admin', 'user') NOT NULL DEFAULT 'user',
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
    `;
 try{
    const connection = await pool.getConnection();
    await connection.query(sql);
    connection.release();
    console.log( "User Table Created")
}
catch (error){
        console.log( "error while creating user table", error.message );
}
};

module.exports = { createUserTable };