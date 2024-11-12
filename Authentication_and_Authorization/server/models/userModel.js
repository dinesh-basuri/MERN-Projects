const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const userSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    validate: {
      validator: function(e) {
        return /^\d{10}$/.test(e)
      },
      message: 'phone number should be 10 digit'
    }
  },
  role: {
    type: String,
    enum: ['admin','frontdesk','user'],
    default: 'user'
  },
  password: {
    type: String,
    required: true,
    selected: false
  },
  confirmPassword: {
    type: String,
    required: true,
    validate: {
      validator: function(e) {
        return e === this.password
      },
      message: 'passwords should be same'
    }
  }
})

userSchema.pre('save', async function (next) {
  if(!this.isModified('password')) return next()
  this.password = bcrypt.hash(this.password,12)
  this.confirmPassword = undefined
  next()
})

userSchema.methods.checkPassword = async function (candidatePassword, userPassword) {
  return bcrypt.compare(candidatePassword,userPassword)
}

const user = mongoose.model('user',userSchema)

module.exports = user