const asyncHandler = require("express-async-handler");
const User = require('../models/userModel')
const bcrypt = require("bcrypt");
const jwt= require("jsonwebtoken")

const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("All fields are manditory(username email and password)");
  }
  const userAvailable = await User.findOne({ email });
  if (userAvailable) {
    res.status(400);
    throw new Error("user already registered");
  }

  //Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  console.log("hashed password is:", hashedPassword);
  const user=await User.create({ username,email,password:hashedPassword});
  
  
  console.log(`user created ${user}`);
  if(user){
    res.status(201).json({_id:user.id,email:user.email})
} else{
    res.status(400);
    throw new Error('user data is not valid')
}
res.json({ message: "register for the user" });
});

const loginUser = asyncHandler(async (req, res) => {
    const {email,password}=req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory")
    }
    const user=await User.findOne({email});
    //compare password with hashed password
    if(user &&(await bcrypt.compare(password,user.password))){
        const accessToken=jwt.sign({
            user:{
                username:user.email,
                email:user.email,
                id:user.id,           
            }
        },process.env.ACCESS_TOKEN_SECRET,{
            expiresIn:"15m"
        })
        res.status(200).json({accessToken})
    } else{
        res.status(401)
        throw new Error('email and password is not valid')
    }
  res.json({ message: "Login user" });
});
const currentUser = asyncHandler(async (req, res) => {
  res.json(req.user);
});

module.exports = { registerUser, loginUser, currentUser };



// const registerUser = asyncHandler(async (req, res) => {
    //     const { username, email, password } = req.body;
    
//     if (!username || !email || !password) {
//       return res.status(400).json({ error: "All fields are mandatory" });
//     }
    
//     const userExists = await User.findOne({ email });
    
//     if (userExists) {
//       return res.status(400).json({ error: "User already registered" });
//     }
  
//     try {
//       // Hash password
//       const hashedPassword = await bcrypt.hash(password, 10);
//       console.log("hashed password is:", hashedPassword);
  
//       // Create a new user with hashed password
//       const newUser = new User({
//         username,
//         email,
//         password: hashedPassword // Saving the hashed password to the database
//       });
  
//       // Save the user to the database
//       await newUser.save();
  
//       res.json({ message: "User registered successfully" });
//     } catch (error) {
//       res.status(500).json({ error: "Server error" });
//     }
//   });
  

