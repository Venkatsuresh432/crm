const pool = require('../config/db')

const createBlogCategoryTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS blog_category(
            id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
            category_name VARCHAR(255) UNIQUE NOT NULL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP 
        )
    `;
       try {
            const connection = await pool.getConnection();
            await connection.query(sql)
            connection.release();
            console.log("blog Category table created")
       } 
       catch (error) {
            console.error("error while creating blog category table", error.message)
       }
};

module.exports = { createBlogCategoryTable }