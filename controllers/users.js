const usersRouter=require('express').Router()
const schema = require('../models/user')
const bcrypt=require('bcrypt')
const { response } = require('../app')

usersRouter.post('/',async(request,response)=>{
const {username,name,password}=request.body
const existingUser = await schema.findOne({ username })
if (existingUser) {
  return response.status(400).json({
    error: 'username must be unique'
  })
}
if (!username || !password) {
    response.status(400).json("username or password is empty").end()
  } 
  if (!(username.length>5) || !(password.length>5)) {
    response.status(400).json("min length problem").end()
  } 
const passwordHash = await bcrypt.hash(password, 10);
const newUser= new schema({
    name:name,
    username:username,
    password:passwordHash
})
const savedUser=await newUser.save()
response.status(201).json(savedUser)
})

usersRouter.get('/',async(request,response)=>{
  const users = await schema    
  .find({}).populate('blogs')

  response.json(users)

})
usersRouter.get('/:id',async (request,response)=>{
  const id = request.params.id
  const users=await schema.findById(id).populate('blogs',{name:1,username:1})
  response.json(users)
  
  })


module.exports=usersRouter