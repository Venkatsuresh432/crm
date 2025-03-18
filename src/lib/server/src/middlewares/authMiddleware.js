const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config");
const adminController = require("../controllers/authenticationController") 

module.exports = async (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) {
      return res.status(401).json({ msg: "Access denied. No token provided." });
  }
  try {
      const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
      req.user = decoded;
      console.log("Authenticated User:", req.user);
      await adminController.adminAuth(req, res, next);
  } catch (err) {
      res.status(403).json({ msg: "Invalid token.", error: err.message });
  }
};
