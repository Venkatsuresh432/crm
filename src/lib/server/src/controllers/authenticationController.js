const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const { getUserByEmail } = require("../services/authenticationServices")
const { getUserById } = require("../services/userServices")
const responseHandler = require("../utils/responseHandler")


exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await getUserByEmail(email);
    console.log(user)
    if (!user) return res.status(400).json({ msg: "Invalid credentials" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user.id, email:user.email }, JWT_SECRET, { expiresIn: "1d" });
    res.json({ token, user });
  } catch (err) {
    res.status(500).json({ msg: "Server error" ,error: err.message });
  }
};

exports.adminAuth = async (req, res, next) => {
  try {
      const user = await getUserById(req.user.id);
      if (!user) {
          return responseHandler.notFound(res, "User not found");
      }
      const data = user[0]
      if (data.role === 'admin') 
      {
          return next(); 
      }

      return responseHandler.error(res, "Authentication denied. Admins only.");
  } catch (error) {
      console.error("Error during authentication:", error.message);
      return responseHandler.error(res, "Internal server error");
  }
};
