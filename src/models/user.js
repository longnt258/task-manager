const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  }, 
  email: {
    type: String,
    unique: true,
    require: true,
    trim: true,
    lowercase: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Email is invalid')
      }
    }
  },
  age: {
    type: Number,
    default: 0,
    validate(value) {
      if(value < 0) {
        throw new Error('Age must be a positive number')
      }
    }
  },
  password: {
    type: String,
    required: true,
    trim: true,
    minlength: 7,
    validate(value) {
      if(validator.contains(value.toLowerCase(), 'password')) {
        throw new Error('Password cannot contain "password"')
      }
    }
  },
  // Store tokens for multi device login (server side)
  tokens: [{
    token: {
      type: String,
      required: true
    }
  }],
  avatar: {
    type: Buffer
  }
}, {
  timestamps: true
})

// Virtual property
userSchema.virtual('tasks', {
  ref: 'Tasks',
  localField: '_id',
  foreignField: 'owner'
})

// Method (instance method)
// This method will be called when we send back user data in response
userSchema.methods.toJSON = function() {
  const user = this
  const userObject = user.toObject()

  delete userObject.password
  delete userObject.tokens

  return userObject
}

userSchema.methods.generateAuthToken = async function() {
  const user = this
  const token = jwt.sign({ _id: user._id.toString() }, 'thisisprivatekey')
  user.tokens.push({ token })
  await user.save()

  return token
}

// Static method (model method)
userSchema.statics.findByCredentials = async (email, password) => {
  const user = await User.findOne({ email })
  if(!user) {
    throw new Error('Unable to login')
  }

  const isMatch = await bcrypt.compare(password, user.password)
  if(!isMatch) {
    throw new Error('Unable to login')
  }

  return user
}

// Middleware
userSchema.pre('save', async function(next) {
  const user = this
  if(user.isModified('password')) {
    user.password = await bcrypt.hash(user.password, 8)
  }

  next()
})

userSchema.pre('deleteOne',{ document: true, query: false } , async function(next) {
  const user = this // actually document
  await Task.deleteMany({ owner: user._id })

  next()
})

const User = mongoose.model('User', userSchema)

module.exports = User