const pool = require('../config/db')

exports.createPageBlog = async ( data ) => {
    const { category_id, sub_category_id, title, content, metadata, author_id, is_published } = data ;
    const [ result ] = await pool.execute(
        "INSERT INTO pages_blogs (category_id, sub_category_id, title, content, metadata, author_id, is_published) VALUES (?,?,?,?,?,?,?)",
        [category_id, sub_category_id, title, content, metadata, author_id, is_published ]
    );
    return { id: result.insertId, category_id, sub_category_id, title, content, metadata, author_id, is_published }
};


exports.getAllPageBlog  = async () => {
    const [ rows ] = await pool.execute("SELECT * FROM pages_blogs");
    return rows;
}

exports.getPageBlogById = async ( id ) => {
    const [ rows ] = await pool.execute("SELECT * FROM pages_blogs WHERE id = ?", [id]);
    return rows ; 
};

exports.updatePageBlog = async ( id, data ) => {
    const { category_id, sub_category_id, title, content, metadata, author_id, is_published } = data
    const [ rows ] = await pool.execute(
        "UPDATE pages_blogs SET category_id = ? , sub_category_id = ?, title = ?, content = ?, metadata = ?, author_id = ?, is_published = ? WHERE id = ?",
            [ category_id, sub_category_id, title, content, metadata, author_id, is_published, id ]
    );
    return rows; 
}

exports.deletePageBlog = async ( id ) => {
    const [ result ] = await pool.execute("DELETE FROM pages_blogs WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}