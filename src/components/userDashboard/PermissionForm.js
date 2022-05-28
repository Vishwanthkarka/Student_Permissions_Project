import React,{useState} from 'react'
import { useSelector} from "react-redux";
import { useForm } from "react-hook-form";
import { Form,Button,Container,Toast,ToastContainer } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import "./form.css"

function PermissionForm() {
  const[isRequestSuccess,setIsRequestSuccess] = useState(false)
  const [isRequestClose , setRequestClose] = useState(true)
  const [toDay,setToDay] = useState("") 
  const[fromDate,setFromDate] = useState("")
 
  //for the form handling
  const { register, handleSubmit , formState: { errors }} = useForm();
  //navigation
  const navigate = useNavigate();
  const closeRequest = () =>{
    // closing the tost
    setIsRequestSuccess(!isRequestSuccess)
  }
  //Navigating to Dashboard
  const cancelHand = () => {
    navigate('/dashboard')
  }
  // for accusing the userObj in the Redux
    const {userObj} = useSelector(state=> state.user)
//adding to the state
  const todate = (ele) => {
setToDay(ele.target.value)

  }
  const fromdate = (el) => {
setFromDate(el.target.value)
  }
  console.log(toDay)
    //on form submit
    const onSubmitHandler = (permissioninfo) => {
      
      const d = new Date();
      let day = d.getDay();
      console.log(d)
      console.log(day)
      let perdata ={
        profileImg:userObj.profileImg,
        username:userObj.username,
        section:userObj.section,
        uploadedOn:new Date(d),
        isapproved:false,
        isrejected:false,
        dateTo:new Date(toDay),
        dateFrom: new Date(fromDate)

      }
      console.log(perdata)

  let permissionREQ = Object.assign(perdata,permissioninfo)
  axios.post("/permission-api/post-permission",permissionREQ)
  .then((res)=> {
    console.log(res)
    if(res.data.message == "Permission requested successfully"){
      console.log("gggg")
      setIsRequestSuccess(true)
      navigate('/dashboard')
    }
console.log("heol")
  })
  .catch((err)=>{
    alert("error in code")
  })
    }
  return (
    <Container>
      
      <div className='row form-style  rounded'>
      <div className='col-12 col-sm-8 col-md-6 form-col m-auto shadow p-4 "'>
      <h2 className='text-center mt-3 w-75'> Hello 👋 <span>{userObj.username}</span> Fill the form for the leave </h2>
      <Form className=' ' onSubmit={handleSubmit(onSubmitHandler)}>
      <Form.Group  className="mb-3 " controlId="formBasicEmail">
        <Form.Label>Subject</Form.Label>
        <Form.Control type="text" placeholder="what's your reason"  {...register("subject",{required:true})}  />
      </Form.Group>
      {errors.subject&&<p className="text-danger">*Subject is required</p>}
<div className='row'>
      <Form.Group className="mb-2 col-6" controlId="formBasicEmail">
        <Form.Label> LEAVE FROM</Form.Label>
        <Form.Control type="date" placeholder="DATE" onChange={fromdate} />
        
      </Form.Group>
      {errors.subject&&<p className="text-danger">*Date is required</p>}

      <Form.Group className="mb-2 col-6 " controlId="formBasicEmail">
        <Form.Label>TO</Form.Label>
        <Form.Control type="date" placeholder="DATE" onChange={todate} />
        {/* {...register("dateTo",{required:true})}  */}
        
      </Form.Group>
      </div>

      {/* <Form.Group className="mb-3 col-3" controlId="formBasicEmail">
        <Form.Label>Days</Form.Label>
        <Form.Control type="number" placeholder="Enter email" />
      
      </Form.Group> */}

      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1" >
    <Form.Label>Type the brief explanation about the reason </Form.Label>
    <Form.Control as="textarea" rows={3}  {...register("letter",{required:true})}/>
  </Form.Group>
  {errors.letter&&<p className="text-danger">*Description is required</p>}
  <div className='row d-flex justify-content-end'>
  <button className='col-3 btn-cancel' onClick={cancelHand}  >
    Cancel
  </button>
  <button  className='col-3 btn-submit' type="submit">
    Submit
  </button>
  </div>

      </Form>
      </div>
      </div>
    
      {
        //is successful posted
        isRequestSuccess?(
          <ToastContainer position="top-end" className="p-3 mt-5">

          <Toast show={isRequestSuccess} onClose={closeRequest}>
          <Toast.Header>
            {/* <img
              src="holder.js/20x20?text=%20"
              className="rounded me-2"
              alt=""
            /> */}
            <strong className="me-auto"></strong>
            <small></small>
          </Toast.Header>
          <Toast.Body className='text-center'><b>Successfully uploaded permission</b></Toast.Body>
        </Toast>  
        </ToastContainer>
        ):
        (<h1></h1>)
      }
  </Container>
      
  )
}

export default PermissionForm