const User = require("../models/user");

const findMatches = async (req,res)=>{
    try{
        const currentUser = await User.findById(req.user.id);
        if(!currentUser){
            return res.status(404).json({ success: false, message:"User not found" });
        }

        //Get Skills and wants
        const mySkills = currentUser.skills || [];
        const myWants = currentUser.wantsToLearn || [];

        //Find other users(exclude self)
        const others = await User.find({ _id: { $ne:req.user.id } });

        //Check for matches
        const matches = others
            .map(user =>{
                const teachMe = user.skills.filter(skill => myWants.includes(skill));
                const learnFromMe = user.wantsToLearn.filter(skill => mySkills.includes(skill));

                if(teachMe.length > 0 || learnFromMe.length >0){
                    return {
                        userId: user._id,
                        name: user.name,
                        bio: user.bio,
                        skills: user.skills,
                        wantsToLearn: user.wantsToLearn,
                        teachMe,           // Skills they can teach me
                        learnFromMe        // Skills they want from me
                    };
                }
            })
            .filter(Boolean);
        res.json({ success: true, matches});

    }catch(err){
        console.error(err);
        res.status(500).json({ success: false, message: "Server error"});
    }
};

module.exports = { findMatches };

