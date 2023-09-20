const express = require("express");

const router = express.Router();

const {signUp, login} = require("../controllers/auth");

router.post("/signin", signUp);
router.post("/login", login);

module.exports = router