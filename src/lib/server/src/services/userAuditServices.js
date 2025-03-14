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
    const [ rows ] = await pool.execute("SELECT * FROM user_audit WHERE id = ?", [id]);
    return rows ; 
};


exports.updateUserAudit2 = async ( id, data ) => {
    const  { action_message, user_id } = data;
    const [ rows ] = await pool.execute(
            "UPDATE user_audit SET action_message = ? user_id = ? WHERE id = ?",
            [ action_message, user_id, id ]
    );
    return rows.affectedRows > 0; 
}
exports.updateUserAudit = async ( id, data ) => {
    const fields = [];
    const params = [];
    if(data.user_id !== undefined){
        fields.push('user_id = ?')
        params.push(data.user_id)
    }
    if(data.action_message !== undefined){
        fields.push('action_message = ?')
        params.push(data.action_message)
    }
    if(fields.length === 0){
        throw new Error ('no field are provide for update')
    }
    params.push(id)
    console.log(data)
    const query = `UPDATE user_audit SET ${fields.join(', ')} WHERE id = ?`
    const [ rows ] = await pool.execute(query, params)
    return rows
}


exports.deleteUserAudit = async ( id ) => {
    const [ result ] = await pool.execute("DELETE FROM user_audit WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}