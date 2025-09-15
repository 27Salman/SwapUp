const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

//Register user
exports.registerUser = async(req,res) =>{ 
  try{
    const { username, email, password } = req.body;

    //check if user exists
    let user = await User.findOne({email});
    if(user) return res.status(400).json({message:"User already exists"});

    //hash papssword
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //create a new user
    user = await User.create({ username, email, password: hashedPassword});
    res.status(201).json({message:"User registered succesfully"});

  }catch(eer){
    res.status(500).json({error:err.message});
  }
};

//Login user
exports.loginUser = async(req,res)=>{
  try{
    const {email,password} = req.body;

    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message:"Invalid email or password"});

    //compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({message:"Invalid email or password"});

    //create token 
    const token = jwt.sign({id:user._id}, process.env.JWT_SECRET,{expiresIn:"7d"});

    res.json({message:"Login successful", token});

  }catch(err){
    res.status(500).json({error:err.message});
  }
};











