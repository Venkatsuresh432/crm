const pool = require('../config/db')

exports.createBlogCategory = async (data) => {
        const { category_name } = data;
        const [ result ] = await pool.execute(
            "INSERT INTO blog_category (category_name) VALUES (?)", [ category_name ]
        )
        return { id: result.insertId, category_name }
};

exports.allBlogCategories = async () => {
        const [ rows ] = await pool.execute("SELECT * FROM blog_category") ;
        return rows;
}

exports.getBlogCategoryById = async ( id ) => {
    const [ rows ] = await pool.execute ("SELECT * FROM blog_category WHERE id = ? ",[id]);
    return rows
}

exports.updateBlogCategory = async ( id, data ) => {
    const { category_name } = data;
    const [ rows ] = await pool.execute("UPDATE blog_category SET category_name = ? WHERE id = ? ", [category_name, id]);
    return rows;
}

exports.deleteBlogCategory = async (id) => {
    const [ result ] = await pool.execute("DELETE FROM blog_category WHERE id = ? ",[id]);
    return result.affectedRows > 0;
}