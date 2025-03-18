const pool = require('../config/db')


exports.createApiIntegration2 = async ( data ) => {
    const { name, endpoint_url, method, headers, body, authentication } = data ;
    const [ result ] = await pool.execute(
        "INSERT INTO api_integrations (name, endpoint_url, method, headers, body, authentication, created_by ) VALUES (?,?,?,?,?,?,?)",
        [ name, endpoint_url, method, headers, body, authentication  ]
    );
    return { id: result.insertId, name, endpoint_url, method, headers, body, authentication }
};
exports.createApiIntegration = async (data) => {
    const { name, endpoint_url, method, headers, body, authentication, created_by } = data;
    const headersJson = headers ? JSON.stringify(headers) : null;
    const bodyJson = body ? JSON.stringify(body) : null;
    const authJson = authentication ? JSON.stringify(authentication) : null;
    const [result] = await pool.execute(
        "INSERT INTO api_integrations (name, endpoint_url, method, headers, body, authentication, created_by) VALUES (?,?,?,?,?,?,?)",
        [ name, endpoint_url, method, headersJson, bodyJson, authJson, created_by]
    );
    return { id: result.insertId, name, endpoint_url, method, headers, body, authentication, created_by };
};


exports.getAllApiIntegration = async () => {
    const [ rows ] = await pool.execute("SELECT * FROM api_integrations");
    return rows;
}

exports.getApiIntegrationById = async ( id ) => {
    const [ rows ] = await pool.execute("SELECT * FROM api_integrations WHERE id = ?", [id]);
    return rows ; 
};

exports.updateApiIntegration2 = async ( id, data ) => {
    const { name, endpoint_url, method, headers, body, authentication , created_by } = data
    const [ rows ] = await pool.execute(
        "UPDATE api_integrations SET name = ?, endpoint_url = ?, method = ?, headers = ?, body = ?, authentication = ? created_by = ? WHERE id = ?",
            [name, endpoint_url, method, headers, body, authentication, id ]
    );
    return rows; 
}

exports.updateApiIntegration = async (id, data) => {
    const fields = [];
    const params = [];

    if (data.name !== undefined) {
        fields.push('name = ?');
        params.push(data.name);
    }
    if (data.endpoint_url !== undefined) {
        fields.push('endpoint_url = ?');
        params.push(data.endpoint_url);
    }
    if (data.method !== undefined) {
        fields.push('method = ?');
        params.push(data.method);
    }
    if (data.headers !== undefined) {
        fields.push('headers = ?');
        params.push(typeof data.headers === 'object' ? JSON.stringify(data.headers) : data.headers);
    }
    if (data.body !== undefined) {
        fields.push('body = ?');
        params.push(typeof data.body === 'object' ? JSON.stringify(data.body) : data.body);
    }
    if (data.authentication !== undefined) {
        fields.push('authentication = ?');
        params.push(typeof data.authentication === 'object' ? JSON.stringify(data.authentication) : data.authentication);
    }
    if(data.created_by !== undefined){
        fields.push('created_by = ?')
        params.push(data.created_by)
    }
    if (fields.length === 0) {
        throw new Error('No fields provided for update');
    }
    params.push(id);
    const query = `UPDATE api_integrations SET ${fields.join(', ')} WHERE id = ?`;
    const [rows] = await pool.execute(query, params);

    return rows;
};


exports.deleteApiIntegration = async ( id ) => {
    const [ result ] = await pool.execute("DELETE FROM api_integrations WHERE id = ? ", [id]);
    return result.affectedRows > 0;
}