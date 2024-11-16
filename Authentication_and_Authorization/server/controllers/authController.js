const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const {promisify} = require('util')

const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

exports.signUp = async (req, res, next) => {
  try {
    const newUser = await User.create(req.body);
    const token = signToken(newUser._id)

    res.status(201).json({
      status: "success",
      token,
      newUser
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const {email,password} = req.body
    
    if(!email || !password) {
      return res.status(400).json({
        status: 'fail',
        message: 'please provide email and password'
      })
    } 

    const user = await User.findOne({email}).select("+password")

    if(!user) {
      return res.status(400).json({
        status: 'fail',
        message: `user with ${email} not found`
      })
    }

    const isPasswordCorrect = await user.checkPassword(password,user.password)

    if(!isPasswordCorrect) {
      return res.status(401).json({
        status: "fail",
        message: "Incorrect email or password",
      });
    }

    const token = signToken(user._id)

    res.status(200).json({
      status: "success",
      token,
    });
  } catch (err) {
    res.status(500).json({
      status: "fail",
      message: err,
    });
  }
};

exports.protect = async (req,res,next) => {
  let token;
  if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1] 
  }

  if(!token) {
    return res.status(404).json({
      status: 'fail',
      message: 'please login to get access'
    })
  }

  const decoded = await promisify(jwt.verify)(token,process.env.JWT_SECRET)

  const currentUser = await User.findById(decoded.id)
  
  if(!currentUser) {
    return res.status(404).json({
      status: 'fail',
      message: 'User Belonging to this token no longer exists'
    })
  }

  req.user = currentUser

  next()
}