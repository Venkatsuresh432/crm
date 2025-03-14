const pool = require("../config/db");

// exports.createUser = async (username, hashedPassword) => {
//   await db.execute("INSERT INTO users (username, password) VALUES (?, ?)", [username, hashedPassword]);
// };

exports.getUserByUsername = async (username) => {
  const [rows] = await pool.execute("SELECT * FROM users WHERE username = ?", [username]);
  return rows.length ? rows[0] : null;
};


