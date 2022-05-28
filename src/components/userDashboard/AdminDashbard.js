import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Admin-style.css"
import {useForm} from "react-hook-form";
import { Card ,Button,Form} from "react-bootstrap";
import { useSelector } from "react-redux";
import uploadLogo from "./upload.svg"
import RightLogo from "./check-solid.svg"
import WrongLogo from "./wrong-logo.svg"
import { useNavigate } from "react-router-dom";
import SessionExpired from "./undraw_air_support_re_nybl.svg"
import { FcCheckmark,FcCancel } from "react-icons/fc";
import {clearLoginStatus} from "../slice/userSlice";
import { useDispatch } from "react-redux";
import Footer from "../Fotter/Fotter";


function AdminDashbard() {
    const [allPermission, setAllPermissions] = useState([]);
    const [tempAllPermission, setTempAllPermission] = useState([allPermission])
    
    const [isloading,setIsLoading] = useState(true)
    const [isApprove, setIsApprove] = useState({})
    const [version,setVersion] = useState(0)
    const [isFilterObj,setIsFilterObj] = useState('')
    const [lengthreq,setLength] = useState(false)
    const { register, handleSubmit, formState: { errors } } = useForm();
    var date = new Date();
    const navigate = useNavigate();
    var options = {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    };
    let dispath = useDispatch()
    useEffect(() => {
        const fetchPost = async () => {
          let token = localStorage.getItem("token");
          console.log(token)
          let abc = await axios
            .get(`/permission-api/get-all-students`,{
              headers:{Authorization:"Bearer "+token}
            })
            .then((res) => {
             
              let allPermissions = res.data.response;
             
              if(allPermissions>1){
setLength(true)
              }
              console.log(res)
              setAllPermissions(allPermissions);
              setIsLoading(false)
              setTempAllPermission( allPermissions.filter(el => (!el.isapproved && !el.isrejected)))

              if(allPermission.res.data.message =="Session expired.. Relogin to continue " ){
                localStorage.clear();
                dispath(clearLoginStatus());
              }
            }
            
            )
            .catch((err) => {
              console.log(err.message);
            });
        };
        fetchPost();
        console.log(isApprove)
     
      }, [version]);

      useEffect (()=> {
          if (isApprove.Approved == true || isApprove.Approved == false)
          {
          if(isApprove.Approved== true){
              isApprove.message.isapproved = true;
              console.log(isApprove)
          }
          else if (isApprove.Approved== false){
            isApprove.message.isrejected = true;
          }
          //updating permission is approved or not 
          const data= ({ headers:{
            'Content-Type':'application/json',
          },
          body:JSON.stringify(
            
            isApprove.message
            
          )
          })
         
        // update the permission
          const updatePermission = async () => {
              await axios.put(`/permission-api/permission-call`,isApprove.message)
              .then((res)=> {
                console.log(res)
                setVersion( s=> s+1)
console.log(version)
              })
              
              .catch((err)=> {
                  console.log("Error")
              })
            }
            updatePermission()
          }
          
         
     console.log(isApprove)
     console.log(version)
      },[isApprove])
  
    
const newresponse = () => {
  setTempAllPermission( allPermission.filter(el => (!el.isapproved && !el.isrejected)))
  console.log(allPermission)
}

const allSucessful = () => {
  setTempAllPermission(allPermission.filter(el => (el.isapproved)))
}
const allReject = () => {
  setTempAllPermission(allPermission.filter(el => (el.isrejected)))
}
      console.log(isFilterObj)

  return (

    isloading?(<div className="loading-body">
    <div className="loader"></div>
   
    </div>):(
    <>
   
    <div className="">
     

      
        
        <div className=" rounded shadow card-filter-style  " >
          <h3 className=" text-center filter-text ">Filter students By</h3>

          <div className="row mx-2 text-center">
        <button className="col-4  m-1 btn-filter" onClick ={newresponse}>New Responses</button>
        <button className="col-3 m-1 btn-filter" onClick ={allSucessful}>Sucessful</button>
        <button className="col-4 m-1 btn-filter" onClick = {allReject}>Rejected</button>
        </div>
        </div>
        <div className="row mx-2 "> 
{console.log(allPermission)}
 { allPermission !==undefined ?   tempAllPermission.map(el=>( <Card style={{ width: '18rem' }} className="col-md-4 col-lg-5  m-3 card-style shadow">
  <Card.Img variant="top" src={el.profileImg} />
  <Card.Body>
    <Card.Title className="bg-text-req text-center"><b>{el.username}</b> ({el.section})</Card.Title>

    <Card.Subtitle className="mb-2 text-muted"> <img className="rounded" src={uploadLogo}></img> {new Date( el.uploadedOn).toLocaleDateString("en-US", options)}</Card.Subtitle>
    <Card.Text>
     <b>Subject: </b> {el.subject}
    </Card.Text>
    <Card.Subtitle>{new Date( el.dateFrom).toLocaleDateString("en-US", options)} - {new Date( el.dateTo).toLocaleDateString("en-US", options)} </Card.Subtitle>
    

    { !el.isrejected && !el.isapproved ? (
     <div>
    <div className="row ">
      
      <button className="Approve-button col-5  h-25 w-50 " onClick={  ()=> ( setIsApprove({message:el,Approved:true}))}><FcCheckmark size={20}/> Approve</button>
    
      <button className="Reject-button col-5  h-25 w-50 " onClick={()=> ( setIsApprove({message:el,Approved:false}))}><FcCancel size={20}/> Reject</button>
 
      </div>
      
      </div>
      ):
    el.isrejected || !el.isapproved?
   
   (<p1 className="text-secondary" ><FcCancel size={20}/> Already Rejected...</p1>):
   (<p1 className="text-secondary" ><FcCheckmark size={20}/> Already Approved...</p1>)}
   

  </Card.Body>
</Card>)) :<><h2 className="text-center text-secondary m-3">Session Expired ... Relogin To Continue... </h2><img src={SessionExpired}width="500px" height="550px" ></img></>}
</div>
    </div>
    <Footer/>
    </>)
  )
  
}

export default AdminDashbard