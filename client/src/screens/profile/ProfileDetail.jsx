import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { GET_CURRENT_USER } from '../../common/constant'

const ProfileDetail = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {currentUser}=useSelector((state)=>state.AuthenticationReducer)

    const handleLogout=()=>{
        localStorage.clear();
        dispatch({type:GET_CURRENT_USER, payload:null})
        navigate('/')
      }

  return (
     <div className="row">
      <div className="col-md-10">
        <div className="card mb-4">
          <div className="card-header">
            <h5 className="card-title">Profile Details</h5>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-md-4">
                <img
                  src={currentUser?.image?currentUser?.image:"https://via.placeholder.com/150"}
                  alt="Profile"
                  className="img-fluid rounded-circle"
                />
              </div>
              <div className="col-md-8">
                <h5 className="card-title">{currentUser?.name}</h5>
                <p className="card-text"><strong>Email :</strong>  {currentUser?.email}</p>
                <p className="card-text"><strong>Phone :</strong>  {currentUser?.mobile}</p>
                <Link to="/profile/edit" className="btn btn-primary">Edit Profile</Link>
                <button  className="btn btn-secondary mx-3" onClick={handleLogout}>Logout</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileDetail