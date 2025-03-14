const pool = require("../config/db")


const createUserAuditTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS user_audit (
        id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
        user_id CHAR(36) NOT NULL,
        action_message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
    )`

    try {
        const connection = await pool.getConnection()
        await connection.query(sql)
        connection.release()
        console.log("user audit table created")
    } 
    catch (error) {
        console.log( "error while creating user table", error.message );
    }
}

module.exports = { createUserAuditTable }