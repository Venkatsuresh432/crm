const pool = require('../config/db')

exports.createBlogSubCategory2 = async ( data ) => {
    const { blog_category_id, sub_category_name  } = data ;
    const [ result ] = await pool.execute(
        "INSERT INTO blog_sub_category (blog_category_id, sub_category_name ) VALUES (?,?)",
        [ blog_category_id, sub_category_name  ]
    );
    return { id: result.insertId, blog_category_id, sub_category_name }
};
exports.createBlogSubCategory = async (data) => {
    const { blog_category_id, sub_category_name } = data;
    await pool.execute(
        "INSERT INTO blog_sub_category (blog_category_id, sub_category_name) VALUES (?, ?)",
        [blog_category_id, sub_category_name]
    );
    const [rows] = await pool.execute(
        "SELECT * FROM blog_sub_category WHERE sub_category_name = ? ORDER BY created_at DESC LIMIT 1",
        [sub_category_name]
    );
    return rows; 
};



exports.getAllBlogSubCategory = async () => {
    const [ rows ] = await pool.execute("SELECT * FROM blog_sub_category");
    return rows;
}

exports.getBlogSubCategoryById = async ( id ) => {
    const [ rows ] = await pool.execute("SELECT * FROM blog_sub_category WHERE id = ?", [id]);
    return rows ; 
};

exports.updateBlogSubCategory2 = async ( id, data ) => {
    const { blog_category_id, sub_category_name  } = data
    const [ rows ] = await pool.execute(
        "UPDATE blog_sub_category SET blog_category_id = ?, sub_category_name = ?   WHERE id = ?",
            [ blog_category_id, sub_category_name , id ]
    );
    return rows; 
}
exports.updateBlogSubCategory = async ( id, data ) => {
    const fields = [];
    const params = [];
    if(data.blog_category_id !== undefined){
        fields.push('blog_category_id = ?');
        params.push(data.blog_category_id);
    }
    if(data.sub_category_name !== undefined){
        fields.push('sub_category_name = ?')
        params.push(data.sub_category_name)
    }
    if(fields.length === 0){
        throw new Error("no field are provide for update")
    }
    params.push(id)
    const query =` UPDATE blog_sub_category SET ${fields.join(', ')} WHERE id = ?`
    const [ rows ] = await pool.execute(query, params) 
    return rows;
}

exports.deleteBlogSubCategory = async ( id ) => {
    const [ result ] = await pool.execute("DELETE FROM blog_sub_category WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}