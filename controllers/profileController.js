const User = require("../models/user");

// GET logged users profile
const getProfile = async(req,res)=>{
    try{
        const user = await User.findById(req.user.id).select("-password");
        res.json(user);
    }catch(error){
        res.status(500).json({ message:"Server error"});
    }
};

// update profile bio or wantsToLearn
const updateProfile = async(req,res)=>{
    try{
        const { bio, wantsToLearn} = req.body;
        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({ message:"User not found"});

        if(bio) user.bio = bio;
        if(wantsToLearn) user.wantsToLearn = wantsToLearn;

        await user.save();
        res.json(user);
    }catch(error){
        res.status(500).json({ message:"Server error"});
    }
};

//Add Skill
const addSkill = async(req,res)=>{
    try{
        const {skill} = req.body;
        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({ message:"User not found"});

        if(!user.skills.includes(skill)){
            user.skills.push(skill);
            await user.save();
        }
        res.json(user);
    }catch(error){
        res.status(500).json({ message:"Server error"});
    }
};


//Remove Skill
const removeSkill = async(req,res)=>{
    try{
        const {skillName} = req.params;
        const user = await User.findById(req.user.id);
        if(!user) return res.status(404).json({message:"User not found"});

        user.skills = user.skills.filter(skill => skill !== skillName);
        await user.save();

        res.json(user);

    }catch(error){
        res.status(500).json({ message:"Server Error" })
    }
};

module.exports = { getProfile, updateProfile, addSkill, removeSkill};



