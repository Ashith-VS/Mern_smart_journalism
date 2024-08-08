import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from "react-router-dom";
import fetchData from '../http/api';
import { useDispatch, useSelector } from 'react-redux';
import { currentUserAuth } from '../Redux/Action/AuthenticationAction';
import profileIcon from "../assets/images/profile.png";
import { isEmpty } from 'lodash';
import {GET_CURRENT_USER } from '../common/constant';

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch=useDispatch()
 const token=localStorage.getItem('auth_token');
  const [showDropdown, setShowDropdown] = useState(false);
  const {currentUser}=useSelector((state)=>state.AuthenticationReducer)

const getCurrentUser=async()=>{
  // const tok='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YjMzZjRmNmZjOGEzNWM3OTE2MGQyOSIsImlhdCI6MTcyMzE0MTg2MiwiZXhwIjoxNzIzMTQ1NDYyfQ.uL6kG0_37cvq4OJXAnNfrMtgQbct53qrex1hA2a79Tg'	
  // localStorage.setItem('auth_token',tok)
  try {
    if(token){
      // console.log('token: ', token);
    const res = await fetchData('/currentuser','get')
    // console.log('res: ', res);
    dispatch(currentUserAuth(res?.user))
  }
  } catch (error) {
    console.error(error)
  }
}

useEffect(() => {
    getCurrentUser()
}, [])


const handleLogout=async()=>{
  try {
    const res = await fetchData("/logout","get")
    console.log('res: ', res);
    // localStorage.clear();
    localStorage.removeItem('auth_token');
    dispatch({type:GET_CURRENT_USER, payload:null})
   navigate('/')
  } catch (error) {
    console.error(error)
  }
}

  return (
    <nav className="navbar navbar-expand-lg navbar-custom gradient" style={{padding:"30px",background:"#96C9F4"}}>
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
            {currentUser?.role === 'user' &&
            <li className="nav-item">
              <Link className="nav-link" to="/saved">
                Saved News
              </Link>
            </li>}
            <li className="nav-item">
              <img
                src={currentUser?.image?currentUser?.image:profileIcon}
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