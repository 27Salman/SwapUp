const express = require("express");
const { protect } = require("../middlewares/authMiddleware");
const { getProfile, updateProfile, addSkill, removeSkill} = require("../controllers/profileController");

const router = express.Router();

router.get("/", protect, getProfile);
router.put("/",protect,updateProfile);
router.post("/add-skill", protect, addSkill);
router.delete("/remove-skill/:skillName",protect, removeSkill);

module.exports = router;










