//importing the express
const express = require('express')
//calling express function
const userApp = express.Router()
//import dotenv
require("dotenv").config()
//using json middle to handle with JSON
userApp.use(express.json())
// importing express async handler
const expressAsyncHandler = require('express-async-handler')
// importing bcrypt 
const bcryptjs = require('bcryptjs')
// importing jsonwebtoken to create token
const jwt = require("jsonwebtoken")
var cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");


//configure cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
    secure: true,
  });

  //config cloudinary storage
const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
      return {
        folder: "MLR-Project",
        public_id: file.fieldname + "-" + Date.now(),
      };
    },
  });

  //configure multer
var upload = multer({ storage: cloudinaryStorage });

//Get Method for printing values and get values
userApp.get('/',(req,res)=> {
    res.sen({message:"new get method"})
    })

//post method for posting values
userApp.post('/create-user',upload.single("photo"),expressAsyncHandler(async(req,res)=> {
   
    //getting the userCollectionObject obj
    const userCollectionObject = req.app.get('userCollectionObject')
    //getting the JSON input from user
    let newUserOBJ = JSON.parse(req.body.userObj)
    console.log(newUserOBJ)
    
    //inserting the json to the DB
const userOBJ =  await userCollectionObject.findOne({username:newUserOBJ.username})
// console.log(`this is some ${userOBJ.toArray()} to see you out`);
//checking the username in DB
   if(userOBJ !== null){
    res.send({message:"UserName has already taken"})
   }
   // creating a new user
   else{
       //hashing the password
    let hashed_password = await bcryptjs.hash(newUserOBJ.password, 8);
newUserOBJ.password = hashed_password
newUserOBJ.profileImg=req.file.path;
delete newUserOBJ.photo;
 //getting the userCollectionObject obj
await userCollectionObject.insertOne(newUserOBJ)

res.send({message:"New user Created"})
   }
   
}))

//login route
userApp.post('/login',expressAsyncHandler (async(req,res)=> {
    //userCollection object
    const userCollectionObject = req.app.get('userCollectionObject')
    //user input JSON
    let userCredObj = req.body
   console.log(userCredObj)
    // getting the data from the DB
    let userOfDB = await userCollectionObject.findOne({username:userCredObj.username})
    //checking the userName in DB
    if(userOfDB== null){
        res.send({message:"Invalid username"})
    }
    else{
        //compare the password 
        let status = await bcryptjs.compare(userCredObj.password,userOfDB.password)
        //checking the password 
        if (status == false){
            res.send({message:"Invalid Password"})
        }
        // if password match
        else{  
            // create token 
            let token = jwt.sign({username:userOfDB.username},process.env.API_SECRET,{expiresIn:10})
            //send the token 
res.send({message:"success", payload:token, userObj:userOfDB})
        }
    }

}))


//deleting user 
userApp.delete('/remove-user/:id',expressAsyncHandler(async(req,res)=> {
//userCollection object
const userCollectionObject = req.app.get('userCollectionObject')
const userId =req.params.id
const userDEL = userCollectionObject.deleteOne({username:userId})
res.send({message:"Deleted user"})
}))


//exporting the userApi 
module.exports = userApp