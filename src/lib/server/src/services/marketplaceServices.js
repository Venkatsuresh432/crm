const pool = require('../config/db')

exports.createMarketPlace = async ( data ) => {
    const { app_name, description, icon_url, app_type, iframe_url, security_groups_admin, security_groups_user } = data ;
    const [ result ] = await pool.execute(
        "INSERT INTO marketplace ( app_name, description, icon_url, app_type, iframe_url, security_groups_admin, security_groups_user) VALUES (?,?,?,?,?,?,?)",
        [ app_name, description, icon_url, app_type, iframe_url, security_groups_admin, security_groups_user ]
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

exports.updateMarketPlace = async ( id, data ) => {
    const { app_name, description, icon_url, app_type, iframe_url, security_groups_admin, security_groups_user } = data
    const [ rows ] = await pool.execute(
        "UPDATE marketplace SET app_name = ?, description = ?, icon_url = ?, app_type = ?, iframe_url = ?, security_groups_admin = ?, security_groups_user =? WHERE id = ?",
            [ app_name, description, icon_url, app_type, iframe_url, security_groups_admin, security_groups_user, id ]
    );
    return rows; 
}

exports.deleteMarketPlace = async ( id ) => {
    const [ result ] = await pool.execute("DELETE FROM marketplace WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}