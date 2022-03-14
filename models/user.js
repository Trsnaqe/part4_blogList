const mongoose=require('mongoose')

const userSchema=new mongoose.Schema({
name:String,
username:{type:String,required:true,minlength:5},
password:{type:String,required:true,minlength:5},
blogs:[{
    type:mongoose.Types.ObjectId,
    ref:'Blog'
}],
})

userSchema.set('toJSON',{
transform:(document,returnedObject)=>{
    returnedObject.id=returnedObject._id.toString()
    delete returnedObject._id
    delete returnedObject.__v
    delete returnedObject.password
}
})

module.exports=mongoose.model('User',userSchema)
