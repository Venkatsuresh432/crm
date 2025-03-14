const pool = require('../config/db')

const createPagesBlogsTable = async () => {
    const sql =`
           CREATE TABLE IF NOT EXISTS pages_blogs (
            id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
            category_id CHAR(36),  
            subcategory_id CHAR(36),  
            title VARCHAR(255) NOT NULL,
            content TEXT NOT NULL,
            metadata JSON, 
            author_id CHAR(36),
            is_published BOOLEAN DEFAULT FALSE,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            FOREIGN KEY (author_id) REFERENCES users(id) ON DELETE SET NULL
);
 `;
 try{
    const connection = await pool.getConnection();
    await connection.query(sql);
    connection.release();
    console.log( "pages blog Table Created")
}
catch (error){
        console.log( "error while creating pages Blog table", error.message );
}
};

module.exports = { createPagesBlogsTable };