import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { GET_CURRENT_USER } from '../../common/constant'
import networkRequest from '../../http/api'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import { fileToBase64 } from '../../common/common'

const EditProfile = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {currentUser,token}=useSelector((state)=>state.AuthenticationReducer)
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
    image:'',
    name: '',
    email: '',
    mobile: ''
    });
      
      useEffect(() => {
        if (currentUser) {
          setFormData({
            image:currentUser?.image,
            name: currentUser?.name,
            email: currentUser?.email,
            mobile: currentUser?.mobile
          });
        }
      }, [currentUser]);
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };


      const handleImageChange = async(e) => {
        const file = e.target.files[0];
        if (file) {
            const base64Image = await fileToBase64(file);
            setFormData({ ...formData, image: base64Image });
        }
      };

      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const res = await networkRequest('/auth/updateProfile', 'post', { formData });
          if (res) {
            dispatch({ type: GET_CURRENT_USER, payload: res.user });
            navigate('/profile');
          }
        } catch (error) {
          setError(error.message);
        }
      };

  return (
    <div>
    <Navbar/>
    <div className="container my-5" >
      <div className="row">
        <div className="col-md-10">
          <div className="card mb-4">
            <div className="card-header">
              <h5 className="card-title">Edit Profile</h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
              <div className="mb-3">
                  <label htmlFor="image" className="form-label">Choose an image</label>
                  <input
                    type="file"
                    id="image"
                    className="form-control"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="form-control"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="form-control"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="mobile" className="form-label">Mobile</label>
                  <input
                    type="text"
                    id="mobile"
                    name="mobile"
                    className="form-control"
                    value={formData.mobile}
                    onChange={handleChange}
                  />
                </div>
                {error && <p className="text-danger">{error}</p>}
                <button type="submit" className="btn btn-primary">Save Changes</button>
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

export default EditProfile