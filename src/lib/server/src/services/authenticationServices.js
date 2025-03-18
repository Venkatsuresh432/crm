const pool = require("../config/db");

exports.getUserByEmail = async (email) => {
  const [rows] = await pool.execute("SELECT * FROM users WHERE email = ?", [email]);
  return rows.length ? rows[0] : null;
};


