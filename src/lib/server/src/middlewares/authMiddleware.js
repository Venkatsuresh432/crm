const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config/config"); 

module.exports = (req, res, next) => {
  const token = req.header("Authorization");
  if (!token) return res.status(401).json({ msg: "Access denied. No token provided." });
  try {
    const decoded = jwt.verify(token.replace("Bearer ", ""), JWT_SECRET);
    req.user = decoded;
    next();
  } 
  catch (err) {
    res.status(403).json({ msg: "Invalid token.", error: err.message });
  }
};
