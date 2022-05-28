import React from 'react'
import welcomeSvg from "../resourses/welcome.svg"
import {Container } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Footer from '../Fotter/Fotter';


function Home() {
  let {isSuccess} = useSelector(state=> state.user)
  const navigate = useNavigate();
  const navToDash = ()=> {
    navigate('/dashboard')
  }
  const navLogin = () => {
    navigate('/login')
  }
  return (
    <div className='hello'>

{/* <Navigation/> */}
 <Container className='my-5'>
        {/* cover */}
<div className='row web-hero '>
   
<div className='col'>
<h1 className=' text-center hero-text '> Welcome To collage work</h1>
<p className='text-center'>One Website for all collage work</p>
{
  isSuccess?(<button className='btn-login text-center' onClick={navToDash}>Get Started </button>):(
    <button className='btn-login text-center' onClick={navLogin}>Login</button>
  )

}

</div>

<div className='col welcome-Svg-div '>
<img src={welcomeSvg} className="welcome-Svg  " alt=""/>
</div>
</div>
</Container>
<Footer/>
    </div>
  )
}

export default Home