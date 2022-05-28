import React,{useState} from 'react'
import {useForm} from "react-hook-form";
import { Form, FloatingLabel,ToastContainer,Toast } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import axios from "axios";
import "./style.css"
import { useNavigate } from "react-router-dom";
import Footer from '../Fotter/Fotter';


function Signup() {
  //state for image
  let [img, setImg] = useState(null);
  const [isLoading,setIsLoading] = useState(false)
  const {userObj} = useSelector(state=> state.user)
  const [displayToast , SetDisplayToast] =useState(false)
  const { register, handleSubmit, formState: { errors } } = useForm();

  const navigate = useNavigate();
  
  const onImageSelect = (event) => {
    
    setImg(event.target.files[0]);
    // setFile(event.target.files[0])
    //console.log(event.target.files[0]);
  //  console.log(event);
  };

  const formSubmitHandler = async (newUser) => {

    let formData = new FormData();
   
   const newUseObj = {
     ...newUser,
     isAdmin:false,
   }
   formData.append("userObj", JSON.stringify(newUseObj));
   formData.append("photo", img);
   console.log(newUseObj)
   
    await axios.post('user-api/create-user',formData ).then( res=> {console.log(res)
      alert(res.data.message)
      // alert(res.data.message)
      // if user created
       // if user created
       if(res.data.message === 'New user Created'){
        navigate("/login")
      }
      isLoading(true)

    })


    .catch(error => {
      console.log(error)
      alert('something went wrong')

    })
    // (response)=> {response.data.message})
    }

    
  

  return (
    isLoading?(
<div className="loading-body">
    <div className="loader"></div>
   
    </div>):(
<div>
    <div className='signup-head '>
        
<div className='sign-form shadow' >
<h2 className='text-secondary'>Sign Up</h2>
<form onSubmit={handleSubmit(formSubmitHandler)}>
<FloatingLabel
    controlId="floatingInput"
    label="user name"
    className="mb-3"
  >
    <Form.Control type="username" placeholder="username"  {...register("username",{required:true})} />
  </FloatingLabel>
  {errors.username&&<p className="text-danger">*Section is required</p>}

  <FloatingLabel
    controlId="username"
    label="Email address"
    className="mb-3"
  >
    <Form.Control type="email" placeholder="name@example.com"  {...register("email",{required:true})} />
  </FloatingLabel>
  {errors.email&&<p className="text-danger">*Email is required</p>}
  
  <FloatingLabel controlId="floatingPassword " className='mb-3' label="Password">
    <Form.Control type="password" placeholder="Password"  {...register("password",{required:true})} />
  </FloatingLabel>
  {errors.password&&<p className="text-danger">*Password is required</p>}
  <Form.Group className=" text-center mb-3 col w-80" controlId="formBasicEmail">
  <FloatingLabel controlId="floatingSelectGrid" label="Select you branch">
<Form.Select aria-label="Select Branch" {...register("section",{required:true})} >
<option value="" > Select Branch</option>
<option  value="ALML">AIML</option>
<option value="DS">DS</option>
<option value="CS">CS</option>
</Form.Select>
</FloatingLabel>
</Form.Group>
{errors.section&&<p className="text-danger">*Section is required</p>}

<Form.Group controlId="formFileLg" className="mb-3">

    <Form.Control type="file" size="lg" {...register("photo", { required: true })}
                onChange={(event) => onImageSelect(event)} />
  </Form.Group>
  {errors.photo&&<p className="text-danger">*Photo is required</p>}

  <div class="form-floating">
  <button type="submit" className=' Form-button mb-3 shadow'>Get&nbsp;Started</button>
  </div>

 
  <p className='text-center mt-2  '>   Already have an account? <span><a href="/Login" className='web-header'><b>Login</b></a> </span></p>
  </form> 
</div>

</div>
<Footer/>
</div>)

  )
}
   

export default Signup