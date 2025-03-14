const pool = require('../config/db')

const createBlogSubCategoryTable = async () => {
    const sql = `
        CREATE TABLE IF NOT EXISTS blog_sub_category (
        id CHAR(36) PRIMARY KEY DEFAULT (UUID()),
        blog_category_id CHAR(36) NOT NULL,
        sub_category_name VARCHAR(255) NOT NULL UNIQUE,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (blog_category_id) REFERENCES blog_category(id) ON DELETE CASCADE
)
  `
   try {
    const connection = await pool.getConnection()
    await connection.query(sql)
    connection.release()
    console.log("blog sub category table created")
    } 
catch (error) {
    console.log( "error while creating blog sub category table", error.message );
}
  
}


module.exports = { createBlogSubCategoryTable }