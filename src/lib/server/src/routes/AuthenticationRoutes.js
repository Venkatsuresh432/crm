const express = require("express");
const auth = require("../controllers/authenticationController");

const router = express.Router();

router.post("/login", auth.login);

module.exports = router;
