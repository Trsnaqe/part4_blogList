const blogsRouter = require('express').Router()
const { JsonWebTokenError } = require('jsonwebtoken')
const { findByIdAndUpdate } = require('../models/blog')
const schema=require('../models/blog')
const userSchema= require('../models/user')
const jwt=require('jsonwebtoken')
const { userExtractor } = require('../utils/middleware')
require('express-async-errors')





blogsRouter.get('/', async (request, response) => {

    const blogs = await schema.find({}).populate('user',{name:1,username:1})
    response.json(blogs)
})

blogsRouter.get('/:id',async (request,response)=>{
const id = request.params.id
const blogs=await schema.findById(id).populate('user',{name:1,username:1})
response.json(blogs)

})
blogsRouter.post('/',userExtractor,async (request, response) => {
  const blog = new schema(request.body)
  const decodedToken=jwt.verify(request.token,process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }  const user = request.user
  blog.user = user.id

  if ( !blog.title && !blog.url ) {
    response.status(400).end()
  } else {
    const responseBlog = await blog.save()
    user.blogs = !user.blogs ? [responseBlog] : user.blogs.concat(responseBlog)
    await user.save()
    
    response.status(201).json(responseBlog)
  }
})

blogsRouter.delete('/:id',userExtractor,async(request,response)=>{
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const userId = request.user.id
  const blog = await schema.findById(request.params.id)
  if (blog.user.toString() === userId.toString()) {
    await schema.findByIdAndRemove(request.params.id)
    response.status(204).json({'success':'Successfully deleted the blog.'}).end()
  } else {
    response
      .status(403)
      .json({ error: 'user has no permission to delete the blog' })
  }
})
blogsRouter.put('/:id',async(request,response)=>{
  const body=request.body
const id=request.params.id
const blog={
  likes:body.likes
}
const up=await schema.findByIdAndUpdate(id,blog,{new:true})
if(up) {
  response.status(204).json(blog)
}
})

   module.exports=blogsRouter