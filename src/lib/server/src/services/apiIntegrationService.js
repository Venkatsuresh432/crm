const pool = require('../config/db')


exports.createApiInetgration = async ( data ) => {
    const { name, endpoint_url, method, headers, body, authentication } = data ;
    const [ result ] = await pool.execute(
        "INSERT INTO api_integrations (name, endpoint_url, method, headers, body, authentication ) VALUES (?,?,?,?,?,?)",
        [ name, endpoint_url, method, headers, body, authentication  ]
    );
    return { id: result.insertId, name, endpoint_url, method, headers, body, authentication }
};


exports.getAllApiInetgration = async () => {
    const [ rows ] = await pool.execute("SELECT * FROM api_integrations");
    return rows;
}

exports.getApiInetgrationById = async ( id ) => {
    const [ rows ] = await pool.execute("SELECT * FROM api_integrations WHERE id = ?", [id]);
    return rows ; 
};

exports.updateApiInetgration = async ( id, data ) => {
    const { name, endpoint_url, method, headers, body, authentication  } = data
    const [ rows ] = await pool.execute(
        "UPDATE api_integrations SET name = ?, endpoint_url = ?, method = ?, headers = ?, body = ?, authentication = ? WHERE id = ?",
            [name, endpoint_url, method, headers, body, authentication, id ]
    );
    return rows; 
}

exports.deleteApiInetgration = async ( id ) => {
    const [ result ] = await pool.execute("DELETE FROM api_integrations WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}