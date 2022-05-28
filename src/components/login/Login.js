import React,{useEffect} from "react";
import "./style.css";
import shape from "./Shape.svg";
import loginImg from "./login_img.svg";
import {useForm} from "react-hook-form";
import { Form, FloatingLabel } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import {userLogin} from "../slice/userSlice"
import { useNavigate } from "react-router-dom";
function Login() {
//get dispathc function to call action creator functions
let dispatch = useDispatch();
let {userObj,isError,isLoading,isSuccess,errMsg,data} = useSelector(state=> state.user)
  const { register, handleSubmit, formState: { errors } } = useForm();
const formSubmitHandler = (userCredentialsObject)=>{
  dispatch(userLogin(userCredentialsObject));
console.log(userObj)
console.log(data)
}
const navigate = useNavigate()
useEffect(() => {
  if (isSuccess && userObj.isAdmin == true) {
      navigate("/admin-dashboard", { replace: true });
   
  }
  else if (isSuccess && userObj.isAdmin == false) {
   
   
    // navigate("/permission-form");
    navigate("/dashboard", { replace: true });
}
}, [isSuccess, isError]);

  return (
    <div>
      {/* <div className='hero row'>
    <div className='img_block col'>
      <img src={shape} className="shape_img" alt=""/>
      <img src={loginImg} className="loginImg" alt=""/>
      
    </div>
    </div>
    <div className='col'>
      <h1>hello</h1>
    </div> */}

      <div className="media row">
        <span className="media-left col">
          <img src={shape} className="shape_img" alt="" />
          <img src={loginImg} className="loginImg" alt="..." />
        </span>
        <div className="media-body col">
          <div className="sign-form-login shadow">
            <h2 className="text-secondary">Login</h2>
<form onSubmit={handleSubmit(formSubmitHandler)}>
            <FloatingLabel
              controlId="floatingInput"
              label="user name"
              className="mb-3"
        
            >
              <Form.Control type="username"  {...register("username",{required:true})} placeholder="username" />
              {errors.username&&<p className="text-danger">*Username is required</p>}
            </FloatingLabel>

        
            <FloatingLabel
              controlId="floatingPassword "
              className="mb-3"
              label="password"
              
              
            >
               

              <Form.Control type="password" placeholder="Password"  {...register("password",{required:true})} />
              {errors.password&&<p className="text-danger">*Username is required</p>}
            </FloatingLabel>
            <div class="form-floating">
              <button type="submit" className=" Form-button mb-3 shadow">
                LOGIN
              </button>
              
            </div>
            </form>
            <p className="text-center  mt-2">
              {" "}
              Don’t have an account?{" "}
              <span>
                <a href="/signup" className="web-header">
                  <b>SignUp</b>
                </a>{" "}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
