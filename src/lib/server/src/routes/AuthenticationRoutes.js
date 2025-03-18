const express = require("express");
const auth = require("../controllers/authenticationController");

const router = express.Router();

router.post("/admin", auth.login);

module.exports = router;
