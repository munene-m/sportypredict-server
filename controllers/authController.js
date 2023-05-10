const User = require('../models/User');
const jwt = require("jsonwebtoken")
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt')
const passport = require('passport')
require('../passport.js')
 
const registerUser = asyncHandler(async (req, res) => {
    const { username, email, password, googleId } = req.body;
  
    if ((!username || !email || !password) && !googleId)  {
      res.status(400);
      throw new Error("Please enter all the required fields");
    }
    const userExists = await User.findOne({ email });
  
    //check if user account exists in the database
    if (userExists) {
      res.status(400);
      throw new Error("User already exists!");
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
  
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
  
    if (user) {
      res.status(201);
      res.json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400);
      throw new Error("Invalid credentials");
    }
  });
  
  //Log in user
  const loginUser = asyncHandler(async (req, res) => {
    const { email, password, googleId } = req.body;
  
    if ((!email || !password) && !googleId) {
      res.status(400);
      throw new Error("Please enter all the required fields");
    } 
    let user
    if(googleId){
        user = await User.findOne({ googleId });
        if(!user) {
            user = await User.create({
                email, googleId
            })
        }
    } else {
        user = await User.findOne({ email })
        if(!user || !(bcrypt.compare(password, user.password))){
            res.status(400)
            throw new Error("The credentials you entered are invalid");
        }        
    }
    res.status(200).json({
        _id: user.id,
        username: user.username,
        email: user.email,
        token: generateToken(user._id),
      });
  });

  // Log in user with Google
 const loginWithGoogle = passport.authenticate("google", {
    scope: ["profile", "email"],
  });
  
  // Callback for Google authentication
 const googleAuthCallback = passport.authenticate("google", {
    failureRedirect: "/login",
    successRedirect: "/dashboard",
  });

  const getCredentials = asyncHandler(async (req, res) => {
    res.status(200).json(req.user);
  });
  
  const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });
  };

  module.exports = { registerUser, loginUser, loginWithGoogle, googleAuthCallback, getCredentials }