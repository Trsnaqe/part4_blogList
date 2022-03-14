const dummy = (blogs) => {
return 1
  }
  const totalLikes=(props)=>{
   let sum=0
   props.forEach(value=>
    sum+=value.likes)
    return sum;
  }
  
  module.exports = {
    dummy,totalLikes
  } 