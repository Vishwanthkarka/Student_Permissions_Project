// importing express
const express = require("express")
//calling the express function
const app = express()
//importing .env
require('dotenv').config()
//import mongodb
const mclient = require('mongodb').MongoClient;
//importing Path module 
const path = require('path')

//DB connection URL 
const DBurl = process.env.DATABASE_CONNECTION_LINK

//connecting with mongodb
mclient.connect(DBurl)
.then(
    (client)=> {
        //get db obj 
        const DBobj = client.db('collageprojdb')
        //use collection object
        let userCollectionObject = DBobj.collection("usercollection")
//using permission object
let permissionCollectionObject = DBobj.collection("permissioncollection")
        //sharing collection obj to the API 
        app.set("userCollectionObject",userCollectionObject)
        app.set("permissionCollectionObject",permissionCollectionObject)
       console.log("DB connected ")
    }

)
// error handler
.catch((err)=> {
    console.log("Error in DB connection")
})


//connecting backend with frontend
app.use(express.static(path.join(__dirname,'./build')))

//import userApi.js
const userApp = require('./API/userApi')
//importing permissionApi.js
const permissionApp = require('./API/permissionApi')
//giving userApp to middleware
app.use('/user-api',userApp)
//accessing permission with middleware
app.use('/permission-api',permissionApp)


app.use('*',(req,res)=> {
    res.sendFile(path.join(__dirname,"./build/index.html"))
})

// router err printing middleware
app.use((req,res,nex)=> {
    res.send({message:`path ${req.url} is invalid`})
})

// error handling middleware
app.use((err,req,res,next)=> {
    res.send({message:"ERROR", reason:`${err.message}`})
})

//server listening to 
app.listen(process.env.PORT,()=>{
console.log("server is running")
})