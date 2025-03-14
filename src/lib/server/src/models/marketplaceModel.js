const pool = require('../config/db')

const createMarketPlaceTable = async () => {
    const sql =`
          CREATE TABLE IF NOT EXISTS marketplace (
            id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
            app_name VARCHAR(255) NOT NULL,
            description TEXT,
            icon_url TEXT,
            app_type ENUM('streamlit', 'native', 'others') NOT NULL, 
            iframe_url TEXT,
            security_groups_admin JSON, 
            security_groups_user JSON,  
            created_by CHAR(36),
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (created_by) REFERENCES users(id) ON DELETE SET NULL
    );
    `;
 try{
    const connection = await pool.getConnection();
    await connection.query(sql);
    connection.release();
    console.log( "marketplace Table Created")
}
catch (error){
        console.log( "error while creating marketplace table", error.message );
}
};

module.exports = { createMarketPlaceTable };