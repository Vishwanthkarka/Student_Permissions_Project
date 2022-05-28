import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import Addlogo from "./plus-circle .svg";
import { useNavigate } from "react-router-dom";
import "./dashboard-style.css";
import Trash from "./trash-2.svg";
import NoResultFound from "./noResultFound.svg"
import { MdOutlineInsertInvitation } from "react-icons/md";
import Footer from "../Fotter/Fotter";

function Dashboard() {
  
  const [listPermission, setListPermissions] = useState([]);
  const [trashRequest, setTrashRequest] = useState("");
  const [count,setCount] = useState(0)
  const [isLoading,setIsLoading] = useState(true)
  console.log(trashRequest);

  // for accusing the userObj in the Redux
  const { userObj,state,isSuccess } = useSelector((state) => state.user);
  //calling the navigation function
  const navigate = useNavigate();
  const handleClick = () => {
    if(isSuccess){
   navigate("/permission-form");
    }
    else{
      (<h1>Hello</h1>)
    }
  };

  // const dateSort = listPermission.reverse()
  // listPermission : dateSort.sort((a,b)=> )
useEffect(()=> {
console.log(trashRequest)
axios.delete(`permission-api/request-delete/${trashRequest}`)
.then((req)=> {
  console.log("kkkk"+userObj.username)
  setCount((s)=> s+1)
})
.catch((err)=> {
  console.log(err)
})
},[trashRequest])
 
//it will run onl once after loading 
  useEffect(() => {
    const fetchPost = async () => {
    await axios
        .get(`/permission-api/post/${userObj.username}`)
        .then((res) => {
          let allPermissions = res.data.message;
          console.log(allPermissions);
          setListPermissions(allPermissions);
          setIsLoading(false)
          
        })
        .catch((err) => {
          console.log(err.message);
        });
    };
    fetchPost();
  }, [count]);



  var date = new Date();

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (

    isLoading?(<div className="loading-body">
    <div className="loader"></div>
   
    </div>):(
    <div className="container">
      {/* {listpermition.name.map((el)=> {  console.log(el) })}
       {listpermition} */}

      {/* {abc} */}
      <div className="text-center  shadow mt-4 mb-4 p-3 shadow rounded bg-list-req">
        <a onClick={handleClick}>
          {" "}
          <img className="text-center" src={Addlogo} />{" "}
        </a>
      </div>

      <div>
      
        {

       
        
listPermission.length ==0 ? 
(
  <>
  <h1 className ="text-center text-secondary">No Request Found</h1>
<img src={NoResultFound} width="450px" height="450px" className=" mx-auto d-block"></img>

</>
):
        
        listPermission.map((el) => (
          
          <div className="card-main text-center align-middle p-3  mt-4 mb-4 rounded shadow row bg-list-req">
            <p className="col-md-3  ">
              
        <p className=" "><b className="web-header">subject:  </b>{el.subject}</p>
            </p>
            <p className="col-md-3 "> <b className="web-header">Description:  </b> {el.letter.slice(0,70)}....</p>
           
            <p2 className="col-md-3 ">
             < MdOutlineInsertInvitation/>
              {new Date(el.uploadedOn).toLocaleDateString("en-US", options)}
            </p2>
            {el.isrejected ? (
              <p className="col-md-3 text-danger"> rejected</p>
            ) : el.isapproved ? (
              <p className="col-md-3 text-success "> success</p>
            ) : (
              <div className="col-md-3 row">
                {" "}
                <p className="col-md-6 text-warning"> pending</p>{" "}
                <img onClick={() => setTrashRequest(el._id)}
                  className="col-md-6 trash"
                  // onClick={setTrashReqest(el.dateTo)}
                  src={Trash}
                ></img>{" "}
              </div>
            )}
          </div>
        ))}
      </div>

      <Footer/>
    
    </div>)
  );
}

export default Dashboard;
