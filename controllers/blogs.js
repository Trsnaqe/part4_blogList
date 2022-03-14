const blogsRouter = require('express').Router()
const { findByIdAndUpdate } = require('../models/blog')
const schema=require('../models/blog')
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
blogsRouter.post('/', async (request, response) => {
  
    if (!request.body.likes) request.body.likes = 0
    const blog = new schema(request.body)
    const result = await blog.save()
    response.status(201).json(result)
    if (!request.body.url && !request.body.title) {
      response.status(400).end()
    } else {
      const blog = new schema(request.body)
      const result = await blog.save()
      response.status(201).json(result)
    }
  
}
)
blogsRouter.delete('/:id',async(request,response)=>{
const id=request.params.id
const blog=await schema.findByIdAndRemove(id)
response.status(204).end()
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