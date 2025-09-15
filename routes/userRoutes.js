const express = require("express");
const router = express.Router();
const { registerUser, loginUser, test } = require("../controllers/userController");

router.get("/test", test);
router.post("/register", registerUser);
router.post("/login",loginUser);

module.exports = router;
