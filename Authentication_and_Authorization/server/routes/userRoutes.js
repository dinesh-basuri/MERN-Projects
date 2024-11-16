const express = require('express')
const Router = express.Router()
const userController = require('../controllers/userController')
const authController = require('../controllers/authController')

Router.route('/').get(authController.protect, userController.getAllUsers)

Router.route('/:id').put(authController.protect,userController.updateUser).delete(authController.protect,userController.deleteUser).get(authController.protect,userController.getUser)

Router.post('/signup',authController.signUp)
Router.post('/login',authController.login)
module.exports = Router