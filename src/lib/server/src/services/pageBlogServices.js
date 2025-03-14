const pool = require('../config/db')

exports.createPageBlog2 = async ( data ) => {
    const { category_id, sub_category_id, title, content, metadata, author_id, is_published } = data ;
    const [ result ] = await pool.execute(
        "INSERT INTO pages_blogs (category_id, sub_category_id, title, content, metadata, author_id, is_published) VALUES (?,?,?,?,?,?,?)",
        [category_id, sub_category_id, title, content, metadata, author_id, is_published ]
    );
    return { id: result.insertId, category_id, sub_category_id, title, content, metadata, author_id, is_published }
};


exports.createPageBlog = async (data) => {
    try {
        const { category_id, subcategory_id, title, content, metadata, author_id, is_published } = data;

        const metadataJson = typeof metadata === 'object' ? JSON.stringify(metadata) : metadata;

        const [result] = await pool.execute(
            "INSERT INTO pages_blogs (category_id, subcategory_id, title, content, metadata, author_id, is_published) VALUES (?,?,?,?,?,?,?)",
            [category_id, subcategory_id, title, content, JSON.stringify(metadata), author_id, is_published]
        );
        return { id: result.insertId, category_id, subcategory_id, title, content, metadataJson, author_id, is_published };
    } catch (error) {
        console.error("Error inserting page blog:", error);
        throw new Error("Database error occurred");
    }
};



exports.getAllPageBlog  = async () => {
    const [ rows ] = await pool.execute("SELECT * FROM pages_blogs");
    return rows;
}

exports.getPageBlogById2 = async ( id ) => {
    const [ rows ] = await pool.execute("SELECT * FROM pages_blogs WHERE id = ?", [id]);
    return rows ; 
};

exports.getPageBlogById = async (id) => {
    const [rows] = await pool.execute("SELECT * FROM pages_blogs WHERE id = ?", [id]);
    return rows.length > 0 ? rows[0] : null; // Return single object instead of array
};


exports.updatePageBlog2 = async ( id, data ) => {
    const { category_id, sub_category_id, title, content, metadata, author_id, is_published } = data
    const [ rows ] = await pool.execute(
        "UPDATE pages_blogs SET category_id = ? , sub_category_id = ?, title = ?, content = ?, metadata = ?, author_id = ?, is_published = ? WHERE id = ?",
            [ category_id, sub_category_id, title, content, metadata, author_id, is_published, id ]
    );
    return rows; 
}
exports.updatePageBlog = async (id, data) => {
    const fields = [];
    const params = [];

    if (data.category_id !== undefined) {
        fields.push('category_id = ?');
        params.push(data.category_id);
    }
    if (data.sub_category_id !== undefined) {
        fields.push('sub_category_id = ?');
        params.push(data.sub_category_id);
    }
    if (data.title !== undefined) {
        fields.push('title = ?');
        params.push(data.title);
    }
    if (data.content !== undefined) {
        fields.push('content = ?');
        params.push(data.content);
    }
    if (data.metadata !== undefined) {
        fields.push('metadata = ?');
        params.push(typeof data.metadata === 'object' ? JSON.stringify(data.metadata) : data.metadata);
    }
    
    if (data.author_id !== undefined) {
        fields.push('author_id = ?');
        params.push(data.author_id);
    }
    if (data.is_published !== undefined) {
        fields.push('is_published = ?');
        params.push(data.is_published);
    }

    if (fields.length === 0) {
        throw new Error('No fields provided for update');
    }

    params.push(id);
    const query = `UPDATE pages_blogs SET ${fields.join(', ')} WHERE id = ?`;
    const [rows] = await pool.execute(query, params);
    
    return rows;
};


exports.deletePageBlog = async ( id ) => {
    const [ result ] = await pool.execute("DELETE FROM pages_blogs WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}