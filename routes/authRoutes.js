const express = require("express");
const {body} = require("express-validator");
const validate = require("../middlewares/validateMiddleware");
const {registerUser, loginUser} = require("../controllers/authController");

const router = express.Router();

router.post(
    "/register",
    [
        body("name").notEmpty().withMessage("Name is required"),
        body("email").isEmail().withMessage("Valid email is required"),
        body("passwprd")
            .isLength({ min:6 })
            .withMessage("Password must be at least 6 chars"),
    ],
    validate,
    registerUser
);

router.post(
    "/login",
    [
        body("email").isEmail().withMessage("Valid email required"),
        body("password").notEmpty().withMessage("Password is required"),
    ],
    validate,
    loginUser
);

module.exports = router;



