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

exports.updateNotification = async ( id, data ) => {
    const {user_id, message, type, is_read } = data
    const [ rows ] = await pool.execute(
        "UPDATE notifications SET user_id = ?, message = ?, type = ?, is_read = ? WHERE id = ?",
            [user_id, message, type, is_read, id ]
    );
    return rows; 
}

exports.deleteNotification = async ( id ) => {
    const [ result ] = await pool.execute("DELETE FROM notifications WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}