//importing express
const express = require('express')
const expressAsyncHandler = require('express-async-handler')
//Accessing express function
const permissionApp = express.Router()
//importing JSON middleware
permissionApp.use(express.json())
var ObjectId = require('mongodb').ObjectID;
const verifyToken = require('./middlewares/verifyToken')


permissionApp.get('/get-all-students',verifyToken,expressAsyncHandler(async(req,res)=> {
  //PermissionCollection object
  console.log("requested successfull")
 const permissionCollectionObject = req.app.get('permissionCollectionObject')
 //getting all the permission list
 const getAllStudent = await permissionCollectionObject.find().toArray()
  res.send({message:"Successfully got all users",response:getAllStudent})

}))



// api to update the permission 
permissionApp.put('/permission-call',expressAsyncHandler(async(req,res)=> {
  const permissionCollectionObject = req.app.get('permissionCollectionObject')
  let modifiedProduct  = req.body
  console.log(req.body.message)
 console.log(modifiedProduct)
 
 await permissionCollectionObject.updateOne({_id:ObjectId(modifiedProduct._id)},{$set:{isapproved: modifiedProduct.isapproved,isrejected:modifiedProduct.isrejected,}}) // ... => spread syntax
  res.send({message:"product modified"})
}))


permissionApp.get("/post/:id",expressAsyncHandler(async(req,res)=> {
  //get productCollectionObject
  const permissionCollectionObject = req.app.get('permissionCollectionObject')
  // get the id 
  let pid = req.params.id
  console.log(pid)
  let allUserPer = await permissionCollectionObject.find({username:pid}).toArray()
  console.log(allUserPer)
  res.send({message:allUserPer})
  // // if product is not existed then it returns null
  // if (product == null){
  //   res.send({message:"product not existed"})
  // }
  // // if product existing
  // else{
  // res.send({message:"product existed",payload:product})
  // }
}))

permissionApp.delete('/request-delete/:id',expressAsyncHandler(async(req,res)=> {
  let pid=(req.params.id);
  console.log(req.params.id)
   // permissionCollectionObject
   const permissionCollectionObject = req.app.get('permissionCollectionObject')
   await permissionCollectionObject.deleteOne({"_id":ObjectId(pid)})
   res.send({message:"Request deleted successfully"})

}))

// router posting request fro HOD
permissionApp.post('/post-permission',expressAsyncHandler(async(req,res)=> {
  //get permissionCollection 
  //const permissionCollectionObject = req.app.get('permissionCollectionObject')
  //information from user
  const userpermissionOBJ = req.body
   // permissionCollectionObject
   const permissionCollectionObject = req.app.get('permissionCollectionObject')
  //calling fun
  const d = new Date();
  //getting date
  let day = d.getDay();
  // getting the response of the same days
  const permissionCheck = await permissionCollectionObject.find({uploadedOn:day , username:userpermissionOBJ.username}).toArray()
   //checking for permission on that days
    if (permissionCheck.length>1){
      res.send({message:"Daily you can take a single permission"})
    }
    // if permissions not taken
    else{
     // permissionCollectionObject
      const permissionCollectionObject = req.app.get('permissionCollectionObject')
      //posting to DB
      const permissionCheck = await permissionCollectionObject.insertOne(userpermissionOBJ)
  res.send({message:"Permission requested successfully"})
    }
}))



module.exports = permissionApp