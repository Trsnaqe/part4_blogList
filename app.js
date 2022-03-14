const express=require('express')
const app=express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const userRouter = require('./controllers/users')
const mongoose = require('mongoose')
const config = require('./utils/config')
mongoose.connect(config.MANGODB_URI)
app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)
app.use('/api/users',userRouter)


module.exports = app