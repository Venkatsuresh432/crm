const pool = require('../config/db')

exports.createUserAudit = async (data) => {
    const { user_id, action_message } = data;
    const [ result ] = await pool.execute(
        "INSERT INTO user_audit ( user_id, action_message ) VALUES (? , ?)", [user_id, action_message]
    );
    return { id: result.insertId, user_id, action_message }
};


exports.getAllUsersAudit = async () => {
    const [ rows ] = await pool.execute("SELECT * FROM user_audit");
    return rows;
}

exports.getUserAuditById = async ( id ) => {
    const [ rows ] = await pool.execute("SELECT * FROM users_audit WHERE id = ?", [id]);
    return rows ; 
};


exports.updateUserAudit = async ( id, data ) => {
  
    const [ rows ] = await pool.execute(
        "UPDATE user_audit SET userName = ?, email = ?, password = ?, role = ? WHERE id = ?",
            [ data, id ]
    );
    return rows; 
}


exports.deleteUserAudit = async ( id ) => {
    const [ result ] = await pool.execute("DELETE FROM user_audit WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}