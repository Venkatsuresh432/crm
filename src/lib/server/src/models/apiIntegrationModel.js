const pool = require('../config/db')

const createApiIntegrationTable = async () => {
    const sql =`
           CREATE TABLE IF NOT EXISTS api_integrations (
            id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
            name VARCHAR(255) NOT NULL,
            endpoint_url TEXT NOT NULL,
            method ENUM('GET', 'POST', 'PUT', 'DELETE') NOT NULL, 
            headers JSON,  
            body JSON,
            authentication JSON,
            created_by CHAR(36),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
);
    `;
 try{
    const connection = await pool.getConnection();
    await connection.query(sql);
    connection.release();
    console.log( "api integration Table Created")
}
catch (error){
        console.log( "error while creating api integration table", error.message );
}
};

module.exports = { createApiIntegrationTable };