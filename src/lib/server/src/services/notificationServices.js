const pool = require('../config/db')

exports.createNotification = async ( data ) => {
    const { user_id, message, type, is_read } = data ;
    const [ result ] = await pool.execute(
        "INSERT INTO notifications (user_id, message, type, is_read) VALUES (?,?,?,?)",
        [ user_id, message, type, is_read ]
    );
    return { id: result.insertId, user_id, message, type, is_read}
};


exports.getAllNotifications = async () => {
    const [ rows ] = await pool.execute("SELECT * FROM notifications");
    return rows;
}

exports.getNotificationById = async ( id ) => {
    const [ rows ] = await pool.execute("SELECT * FROM notifications WHERE id = ?", [id]);
    return rows ; 
};

exports.updateNotification2 = async ( id, data ) => {
    const {user_id, message, type, is_read } = data
    const [ rows ] = await pool.execute(
        "UPDATE notifications SET user_id = ?, message = ?, type = ?, is_read = ? WHERE id = ?",
            [user_id, message, type, is_read, id ]
    );
    return rows; 
}


exports.updateNotification = async (id, data) => {
    const fields = [];
    const params = [];

    if (data.user_id !== undefined) {
        fields.push('user_id = ?');
        params.push(data.user_id);
    }
    if (data.message !== undefined) {
        fields.push('message = ?');
        params.push(data.message);
    }
    if (data.type !== undefined) {
        fields.push('type = ?');
        params.push(data.type);
    }
    if (data.is_read !== undefined) {
        fields.push('is_read = ?');
        params.push(data.is_read);
    }
    if (fields.length === 0) {
        throw new Error('No fields provided for update');
    }
    params.push(id);
    const query = `UPDATE notifications SET ${fields.join(', ')} WHERE id = ?`;
    const [rows] = await pool.execute(query, params);
    return rows;
};


exports.deleteNotification = async ( id ) => {
    const [ result ] = await pool.execute("DELETE FROM notifications WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}