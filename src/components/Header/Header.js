import React from "react";
import './HeaderStyle.css'
import { Navbar, NavDropdown, Nav, Container } from "react-bootstrap";
import { Route, Routes, NavLink, useNavigate,Navigate} from "react-router-dom";
import { useSelector } from 'react-redux';
import {clearLoginStatus} from "../slice/userSlice";
import { useDispatch } from "react-redux";
import Home from "../Home/Home";
import Login from "../login/Login";
import Signup from "../signup/Signup";
import Dashboard from "../userDashboard/Dashboard";
import PermissionForm from "../userDashboard/PermissionForm";
import AdminDashbard from "../userDashboard/AdminDashbard";


function Navigation() {
  let dispath = useDispatch()
  let {userObj,isError, isSuccess} = useSelector(
    state => state.user
  )
    //get navigate function
    let navigate = useNavigate();

  //logout user
  const userLogout = () => {
    localStorage.clear();
    dispath(clearLoginStatus());
    navigate("/login");
  };
   

  return (
    <div>
     <Navbar bg="" expand="lg" className="shadow">
    <Container>
      <Navbar.Brand href="#home" className="web-header"><b>Collage work</b></Navbar.Brand>
      
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      
      <Navbar.Collapse id="basic-navbar-nav">

        <Nav className="ms-auto">
          <>
        <NavLink className='nav-link'  to="/">Home</NavLink>
          <NavLink className='nav-link' to="/signup" >signup</NavLink>
          <NavLink className='nav-link' to="/Login" >login</NavLink>
      
          </>
        
            {isSuccess  == true ?(
                 <>
                 <NavDropdown title={<img src={userObj.profileImg} width="37px"  height="37px" className="rounded-circle shadow   mx-4 "></img>} id="basic-nav-dropdown">
                 <NavDropdown.Item > {userObj.username}</NavDropdown.Item>
               <NavDropdown.Item >change password</NavDropdown.Item>
               
               <NavDropdown.Item  onClick={userLogout} >Logout</NavDropdown.Item>
     
             </NavDropdown>
            
     
                 </>
         
          ):(
<p> </p>
           
          
          )}
   
        </Nav>
      </Navbar.Collapse>
      
    </Container>
  
  </Navbar>

      <Routes>
        
        <Route path="/" element={<Home/>}/>
        <Route path="/signup" element={<Signup/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/permission-form" element={< PermissionForm/>} />
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/admin-dashboard" element={<AdminDashbard/>}/>
      </Routes>
    </div>
  );
}

export default Navigation;
