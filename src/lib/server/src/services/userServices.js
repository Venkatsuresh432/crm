const pool = require('../config/db')
const bcrypt = require('bcrypt')


exports.createUser = async ( data ) => {
    const { userName, email, role, password } = data ;
    const hashedPassword = await bcrypt.hash(password, 10);
    const [ result ] = await pool.execute(
        "INSERT INTO users (userName, email, password) VALUES (?,?,?,?)",
        [ userName, email, role , hashedPassword ]
    );
    return { id: result.insertId, userName, email, password}
};


exports.getAllUsers = async () => {
    const [ rows ] = await pool.execute("SELECT * FROM users");
    return rows
}

exports.getUserById = async ( id ) => {
    const [ rows ] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows ; 
};

exports.updateUser = async ( id, data ) => {
    const { userName, email, password, role } = data
    const [ rows ] = await pool.execute(
        "UPDATE users SET userName = ?, email = ? password = ?, role = ? WHERE id = ?",
            [ userName, email, password, role, id ]
    );
    return rows; 
}

exports.deleteUser = async ( id ) => {
    const [ result ] = await pool.execute("DELETE FROM users WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}