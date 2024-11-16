const User = require('../models/userModel')

exports.getAllUsers = async (req,res) => {
  try {
    const users = await User.find();

    if(users.length === 0) {
      res.status(404).json({
        status: 'success',
        message: 'no users available'
      })      
    } else {
      res.status(200).json({
        status: 'success',
        users
      })
    }
  } catch(err) {
    res.status(500).json({
      status: 'fail',
      message: err
    })
  }
}

exports.getUser = async (req,res) => {
  try {
    const id = req.params.id
    const user = await User.findById(id)
    
   if(user) {
    res.status(200).json({
      status: 'success',
      user
    })
   } else {
    res.status(404).json({
      status: 'fail',
      message: 'no user found'
    })
   }
  } catch(err) {
    res.status(500).json({
      status: 'fail',
      message: err
    })
  }
}

exports.updateUser = async (req,res) => {
  try {
    const id = req.params.id
    const updatedUser = await User.findByIdAndUpdate(id,req.body)
    
    res.status(200).json({
      status: 'success',
      updatedUser
    })
  } catch(err) {
    res.status(500).json({
      status: 'fail',
      message: err
    })
  }
}

exports.deleteUser = async (req,res) => {
  try {
    const id = req.params.id
    const deletedUser = await User.findByIdAndDelete(id)
    
    res.status(200).json({
      status: 'success',
      deletedUser
    })
  } catch(err) {
    res.status(500).json({
      status: 'fail',
      message: err
    })
  }
}