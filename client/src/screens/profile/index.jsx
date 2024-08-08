import React, { useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import { useDispatch, useSelector } from 'react-redux'
import { GET_CURRENT_USER } from '../../common/constant'
import { isEmpty } from 'lodash'
import fetchData from '../../http/api'
import Modal from 'react-modal';
import { customStyles } from '../../common/common'
import ProfileDetail from './ProfileDetail'

const Profile = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [apiError, setApiError] = useState('')
  const [error,setError]=useState({})
    const {token}=useSelector((state)=>state.AuthenticationReducer)
    // console.log('token: ', token);
    const [formData,setFormData] = useState({
      currentPassword:'',
      newPassword:'',
      confirmNewPassword:''
    })

    const handleValidation=()=>{
      let error ={}
      const maxLength = 6;

      if(!formData.currentPassword){
        error.currentPassword = 'Current Password is required'
      }

      if(!formData.newPassword){
        error.newPassword = 'New Password is required'
      }else if (formData.newPassword.length < maxLength) {
      error.newPassword = `New Password cannot exceed ${maxLength} characters`;
    }
      if(!formData.confirmNewPassword){
        error.confirmNewPassword = 'Confirm New Password is required'
      } else if (formData.confirmNewPassword.length < maxLength) {
        error.confirmNewPassword = `Confirm Password cannot exceed ${maxLength} characters`;
      }
      
      if(formData.newPassword!==formData.confirmNewPassword){
        error.confirmNewPassword = 'Confirm Password does not match'
      }
      return error
      
    }

    const handleSubmit=async(e)=>{
      e.preventDefault();
      const valid =handleValidation();
      if(!isEmpty(valid)){
        setError(valid)
      }else{
        // console.log('formData: ', formData);
        try {
          const res =await fetchData('/changePassword','post',{formData},{Authorization:token})
          // console.log('res: ', res);
          if(res){
            localStorage.clear();
            dispatch({type:GET_CURRENT_USER, payload:null})
            navigate('/login')
          }

        } catch (error) {
          // console.error(error.message)
          setApiError(error.message);
        }
      }
    }

    

  return (
<div>
<Navbar/>
 <div className="container my-5">
  <ProfileDetail/>
    <div className="row">
                    <div className="col-md-10">
                        <div className="card mb-4">
                            <div className="card-header">
                                <h5 className="card-title">Change Password</h5>
                            </div>
                            <div className="card-body">
                                <form  onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="currentPassword" className="form-label">Current Password</label>
                                        <input
                                            type="password"
                                            id="currentPassword"
                                            name="currentPassword"
                                            className="form-control"
                                            value={formData?.currentPassword}
                                            onChange={(e)=>{
                                            setFormData({...formData,currentPassword:e.target.value})
                                            setError({...error,currentPassword:''})
                                            setApiError('')
                                          }}
                                        />
                                        {error?.currentPassword && <p className="text-danger">{error?.currentPassword}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="newPassword" className="form-label">New Password</label>
                                        <input
                                            type="password"
                                            id="newPassword"
                                            name="newPassword"
                                            className="form-control"
                                            value={formData?.newPassword}
                                             onChange={(e)=>{setFormData({...formData,newPassword:e.target.value})
                                             setError({...error,newPassword:''})
                                             setApiError('')}}
                                        />
                                         {error?.newPassword && <p className="text-danger">{error?.newPassword}</p>}
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="confirmNewPassword" className="form-label">Confirm Password</label>
                                        <input
                                            type="password"
                                            id="confirmNewPassword"
                                            name="confirmNewPassword"
                                            className="form-control"
                                            value={formData?.confirmNewPassword}
                                            onChange={(e)=>{setFormData({...formData,confirmNewPassword:e.target.value})
                                            setError({...error,confirmNewPassword:''})
                                            setApiError('')}}
                                        />
                                        {error?.confirmNewPassword && <p className="text-danger">{error?.confirmNewPassword}</p>}
                                    </div>
                                    {apiError && <p className="text-danger">{apiError}</p>}
                                    <button type="submit" className="btn btn-primary">Change Password</button>
                                </form>
                            </div>
                        </div>
                    </div>
                    </div>
</div>
<Footer/>
<Modal isOpen={loginModalOpen} style={customStyles} onRequestClose={() => setLoginModalOpen(false)}>
        <div className="modal-content align-items-center justify-content-center p-5">
          <div className="modal-body text-center">
            <h5 className="modal-title mb-4">Login Required</h5>
            <p>Please login to save News.</p>
            <div className="modal-footer mt-5 p-2">
              <button className="btn btn-secondary mx-2" onClick={() => setLoginModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary mx-2" onClick={() => navigate('/login')}>Login</button>
            </div>
          </div>
        </div>
      </Modal>
</div>
   
  )
}

export default Profile