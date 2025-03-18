const pool = require('../config/db')

exports.createMarketPlace = async ( data ) => {
    const { app_name, description, icon_url, app_type, iframe_url, security_groups_admin, security_groups_user, created_by } = data ;
    const [ result ] = await pool.execute(
        "INSERT INTO marketplace ( app_name, description, icon_url, app_type, iframe_url, security_groups_admin, security_groups_user, created_by) VALUES (?,?,?,?,?,?,?,?)",
        [ app_name, description, icon_url, app_type, iframe_url, security_groups_admin, security_groups_user, created_by ]
    );
    return { id: result.insertId, app_name, description, icon_url, app_type, iframe_url, security_groups_admin, security_groups_user }
};


exports.getAllMarketPlace = async () => {
    const [ rows ] = await pool.execute("SELECT * FROM marketplace");
    return rows;
}

exports.getMarketPlaceById = async ( id ) => {
    const [ rows ] = await pool.execute("SELECT * FROM marketplace WHERE id = ?", [id]);
    return rows ; 
};

exports.updateMarketPlace2 = async ( id, data ) => {
    const existingMarket = await exports.getMarketPlaceById(id);
    if (!existingMarket) return null;
    const { app_name, description, icon_url, app_type, iframe_url, security_groups_admin, security_groups_user } = data
    const [ rows ] = await pool.execute(
        "UPDATE marketplace SET app_name = ?, description = ?, icon_url = ?, app_type = ?, iframe_url = ?, security_groups_admin = ?, security_groups_user =? WHERE id = ?",
            [ app_name, description, icon_url, app_type, iframe_url, security_groups_admin, security_groups_user, id ]
    );
    return rows; 
}

exports.updateMarketPlace = async (id, data) => {
    try {
        const existingMarket = await exports.getMarketPlaceById(id);
    if (!existingMarket) return null;
    const fields = [];
    const params = [];

    if (data.app_name !== undefined) {
        fields.push('app_name = ?');
        params.push(data.app_name);
    }
    if (data.description !== undefined) {
        fields.push('description = ?');
        params.push(data.description);
    }
    if (data.icon_url !== undefined) {
        fields.push('icon_url = ?');
        params.push(data.icon_url);
    }
    if (data.app_type !== undefined) {
        fields.push('app_type = ?');
        params.push(data.app_type);
    }
    if (data.iframe_url !== undefined) {
        fields.push('iframe_url = ?');
        params.push(data.iframe_url);
    }
    if (data.security_groups_admin !== undefined) {
        fields.push('security_groups_admin = ?');
        params.push(data.security_groups_admin);
    }
    if (data.security_groups_user !== undefined) {
        fields.push('security_groups_user = ?');
        params.push(data.security_groups_user);
    }
    if(data.created_at !== undefined){
        fields.push('created_at = ?')
        params.push(data.created_at)
    }
    if (fields.length === 0) {
        throw new Error('No fields provided for update');
    }
    params.push(id);
    const query = `UPDATE marketplace SET ${fields.join(', ')} WHERE id = ?`;
    const [rows] = await pool.execute(query, params);
    return rows;
    } 
    catch (error) {
        console.error(error.message)
    }
    
};


exports.deleteMarketPlace = async ( id ) => {
    const [ result ] = await pool.execute("DELETE FROM marketplace WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}