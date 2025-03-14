const pool = require('../config/db')

const createNotificationTable = async () => {
    const sql =`
            CREATE TABLE IF NOT EXISTS notifications (
            id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
            user_id CHAR(36),
            message TEXT NOT NULL,
            type VARCHAR(50),
            is_read BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
        )
    `;
 try{
    const connection = await pool.getConnection();
    await connection.query(sql);
    connection.release();
    console.log( "Notifications Table Created")
}
catch (error){
        console.log( "error while creating notification table", error.message );
}
};

module.exports = { createNotificationTable };