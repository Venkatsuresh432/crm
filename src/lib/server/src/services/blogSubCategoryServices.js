const pool = require('../config/db')

exports.createBlogSubCategory = async ( data ) => {
    const { blog_category_id, sub_category_name  } = data ;
    const [ result ] = await pool.execute(
        "INSERT INTO blog_sub_category (blog_category_id, sub_category_name ) VALUES (?,?)",
        [ blog_category_id, sub_category_name  ]
    );
    return { id: result.insertId, blog_category_id, sub_category_name }
};


exports.getAllBlogSubCategory = async () => {
    const [ rows ] = await pool.execute("SELECT * FROM blog_sub_category");
    return rows;
}

exports.getBlogSubCategoryById = async ( id ) => {
    const [ rows ] = await pool.execute("SELECT * FROM blog_sub_category WHERE id = ?", [id]);
    return rows ; 
};

exports.updateBlogSubCategory = async ( id, data ) => {
    const { blog_category_id, sub_category_name  } = data
    const [ rows ] = await pool.execute(
        "UPDATE blog_sub_category SET blog_category_id = ?, sub_category_name = ?   WHERE id = ?",
            [ blog_category_id, sub_category_name , id ]
    );
    return rows; 
}

exports.deleteBlogSubCategory = async ( id ) => {
    const [ result ] = await pool.execute("DELETE FROM blog_sub_category WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}