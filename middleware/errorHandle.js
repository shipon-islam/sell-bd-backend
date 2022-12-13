//@Date: 01/10/2022
//@Author: Shipon islam

const notFoundHandler=(req,res,next)=>{
res.status(404).send("your requested content was not found")
}


const errorHandler=(error,req,res,next)=>{
    if(error.message){
    const statusCode=res.statusCode?res.statusCode:500;
    res.status(statusCode);
    res.json({
        message:error.message,
        stack:process.env.NODE_ENV==='production'?null:error.stack
    })}else{
        const statusCode=res.statusCode?res.statusCode:500;
        res.status(statusCode);
        res.json({message:error})
    }
}
            
  
   
module.exports={errorHandler,notFoundHandler}