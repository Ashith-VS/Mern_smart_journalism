import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { useSelector } from 'react-redux'

const Profile = () => {
    const {currentUser}=useSelector((state)=>state.AuthenticationReducer)
    // console.log('currentUser: ', currentUser);
  return (
    <div>
    <Navbar/>
 <div className="container my-5">
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
                  src="https://via.placeholder.com/150"
                  alt="Profile"
                  className="img-fluid rounded-circle"
                />
              </div>
              <div className="col-md-8">
                <h5 className="card-title">{currentUser?.name}</h5>
                <p className="card-text"><strong>Email :</strong>  {currentUser?.email}</p>
                <p className="card-text"><strong>Phone :</strong>  {currentUser?.mobile}</p>
                <Link to="/profile/edit" className="btn btn-primary">Edit Profile</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div className="row">
                    <div className="col-md-10">
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="card-title">Change Password</h5>
                            </div>
                            <div className="card-body">
                                <form >
                                    <div className="mb-3">
                                        <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                        <input
                                            type="password"
                                            id="currentPassword"
                                            name="currentPassword"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newPassword" className="form-label">New Password</label>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            name="newPassword"
                                            className="form-control"
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmNewPassword" className="form-label">Confirm New Password</label>
                                        <input
                                            type="password"
                                            id="confirmNewPassword"
                                            name="confirmNewPassword"
                                            className="form-control"
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary">Change Password</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    </div>
</div>
<Footer/>
</div>
   
  )
}

export default Profile