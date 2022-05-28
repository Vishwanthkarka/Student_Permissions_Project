const jwt= require("jsonwebtoken")
require("dotenv").config()


// write middleware to verify token
const verifyToken = (req,res,next)=> {

    //get bearer token  
   let bearerToken= req.headers.authorization ;
   
   //checking token is existed
   if(bearerToken == undefined){
       console.log("hh"+bearerToken)
       res.send({message :"Unauthorized request"})
   }
   //extract token 
 
      let token =  bearerToken.split(" ")[1];
      if (token == null ){
        res.send({message :"Unauthorized request"})
      }
      console.log(token)
      //verify token 
      try{
       let aa =jwt.verify(token,process.env.API_SECRET)
     
      //forward to private route
      next()
      }
      catch(err){
           res.send({message:"Session expired.. Relogin to continue "})

      }
    }



module.exports = verifyToken; 