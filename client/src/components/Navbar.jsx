import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import fetchData from '../http/api';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserAuth } from '../Redux/Action/AuthenticationAction';
import profileIcon from "../assets/images/profile.png";
import { isEmpty } from 'lodash';
import { GET_CURRENT_USER } from '../common/constant';
const Navbar = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
  const {token} =useSelector((state)=>state.AuthenticationReducer)
  
  const [showDropdown, setShowDropdown] = useState(false);
  const {currentUser}=useSelector((state)=>state.AuthenticationReducer)
  console.log('currentUser: ', currentUser);
  
const getCurrentUser=async()=>{
  try {
    const res = await fetchData('/currentuser','get',null,{Authorization:token})
    dispatch(currentUserAuth(res?.user))
  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
    getCurrentUser()
}, [])

// useEffect(()=>{
//   if(currentUser?.role=== "superAdmin") {
//     navigate("/admin")
//   }else if(currentUser?.role=== "mediaAdmin"){
//     navigate("/mediaAdmin")
//   }else if(currentUser?.role=== "Journalist"){
//     navigate("/journalist")
//   }else{
//     navigate("/")
//   }
// },[])

const handleLogout=()=>{
  localStorage.clear();
  dispatch({type:GET_CURRENT_USER, payload:null})
  navigate('/')
}

  return (
    <nav className="navbar navbar-expand-lg navbar-custom gradient" style={{padding:"30px",background: "linear-gradient(to right, #9191a0, #8d9396)"}}>
      <div className="container">
        <Link className="navbar-brand" to="/">
         News
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">
                About
              </Link>
            </li>
            <li className="nav-item">
              <img
                src={profileIcon}
                alt="Profile"
                style={{height:"40px", width:"40px",objectFit:"cover",cursor: "pointer"}}
                onClick={() => setShowDropdown(!showDropdown)}
              />
            </li>
            {showDropdown && (
              <div className="dropdown-menu dropdown-menu-right show" style={{ position: "relative" }}>
              {isEmpty(currentUser)?
              (<button className="dropdown-item" onClick={() => navigate("/login")}>Login</button>):
              ( <><button className="dropdown-item" onClick={() => navigate("/profile")}> My Profile</button>
              <button className="dropdown-item" onClick={handleLogout}>Logout</button>
              </>)}
              </div>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}

export default Navbar