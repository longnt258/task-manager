require('dotenv').config({ path: ['config', '.env.' + process.env.NODE_ENV].join('/')})
const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()

// Express middleware
// app.use((req, res, next) => {
//   res.status(503).send('Site is currently down. Check back soon!')
// })

app.use(express.json())
app.use(userRouter)
app.use(taskRouter)

module.exports = app