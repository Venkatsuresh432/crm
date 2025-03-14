const pool = require('../config/db')
const bcrypt = require('bcrypt');


exports.createUser = async ( data ) => {
    const { username, email, role, password } = data ;
    const hashedPassword = await bcrypt.hash(password, 10);
    const sanitizedRole = role || 'user';
    const [ result ] = await pool.execute(
        "INSERT INTO users (username, email, role, password) VALUES (?,?,?,?)",
        [ username, email, sanitizedRole, hashedPassword ]
    );
    console.log(result);
    return { id: result.insertId, username, email, password}
};

exports.getAllUsers = async () => {
    const [ rows ] = await pool.execute("SELECT * FROM users");
    return rows;
}

exports.getUserById = async ( id ) => {
    const [ rows ] = await pool.execute("SELECT * FROM users WHERE id = ?", [id]);
    return rows ; 
};
exports.getUserByUserName = async ( username ) => {
    const [ rows ] = await pool.execute("SELECT * FROM users WHERE username = ? ", [ username ]);
    return rows;
}
exports.getUserByEmail = async ( email ) => {
    const [ rows ] =  await pool.execute("SELECT * FROM users WHERE email = ? ",[ email ]);
    return rows;
}

exports.updateUser2 = async ( id, data ) => {
    const { username, email, password, role } = data
    const [ rows ] = await pool.execute(
        "UPDATE users SET username = ?, email = ?, password = ?, role = ? WHERE id = ?",
            [ username, email, password, role, id ]
    );
    return rows; 
}

exports.updateUser = async ( id, data ) => {
    const fields = [];
    const params = [];

    if(data.username !== undefined){
        fields.push('username = ?');
        params.push(data.username)
    }
    if(data.email !== undefined){
        fields.push('email = ?'),
        params.push(data.email)
    }
    if(data.password !== undefined){
        fields.push('password = ?');
        params.push(data.password);
    }
    if(data.role !== undefined){
        fields.push('role = ?');
        params.push(data.push)
    }

    if(fields.length === 0){
        throw new Error ('no field are provide for update')
    }
    
    params.push(id);
    const query = `UPDATE users SET ${fields.join(', ')} WHERE id = ?`
    const [ rows ] = await pool.execute(query, params);
    return rows;
}



exports.deleteUser = async ( id ) => {
    const [ result ] = await pool.execute("DELETE FROM users WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}