const express = require("express");
const { body, param } = require("express-validator");
const validate = require("../middlewares/validateMiddleware");
const { protect } = require("../middlewares/authMiddleware");
const { getProfile, updateProfile, addSkill, removeSkill} = require("../controllers/profileController");

const router = express.Router();

router.get("/", protect, getProfile);

router.put("/",
    [
        body("bio").optional().isLength({ max:200 }).withMessage("Bio too long"),
        body("wantsToLearn").optional().isArray().withMessage("wantsToLearn must be array"),
    ],
    validate,
    protect,
    updateProfile
);

router.post("/add-skill",
    [
        body("skill").notEmpty().withMessage("Skill is required")
    ],
    validate,
    protect, 
    addSkill
);

router.delete("/remove-skill/:skillName",
    [
        param("skillName").notEmpty().withMessage("Skill name required")
    ],
    validate,
    protect, 
    removeSkill
);

module.exports = router;










