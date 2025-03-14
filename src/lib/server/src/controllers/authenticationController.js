const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const { getUserByUserName } = require("../services/userServices")


exports.login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await getUserByUserName(username);
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email:user.email }, JWT_SECRET, { expiresIn: "1h" });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" ,error: err.message });
  }
};
