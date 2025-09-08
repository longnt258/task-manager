const User = require('../../src/models/user')
const Task = require('../../src/models/task')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')

const userOneId = new mongoose.Types.ObjectId()
const userOne = {
  _id: userOneId,
  name: 'User Test',
  email: 'test@gmail.com',
  password: 'test@12345',
  tokens: [
    {
      token: jwt.sign({ _id: userOneId.toString() }, process.env.JWT_SECRET)
    }
  ]
}

const userTwoId = new mongoose.Types.ObjectId()
const userTwo = {
  _id: userTwoId,
  name: 'User Test 2',
  email: 'test2@gmail.com',
  password: 'test@12345',
  tokens: [
    {
      token: jwt.sign({ _id: userTwoId.toString() }, process.env.JWT_SECRET)
    }
  ]
}

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: 'First task',
  completed: false,
  owner: userOne._id
}

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Second task',
  completed: true,
  owner: userOne._id
}

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: 'Third task',
  completed: false,
  owner: userTwo._id
}

const initialDb = async () => {
  await User.deleteMany()
  await Task.deleteMany()
  await new User(userOne).save()
  await new User(userTwo).save()
  await new Task(taskOne).save()
  await new Task(taskTwo).save()
  await new Task(taskThree).save()
}

module.exports = {
  userOneId,
  userOne,
  userTwo,
  taskOne,
  taskTwo,
  taskThree,
  initialDb
}