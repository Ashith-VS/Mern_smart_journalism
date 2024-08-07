import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import { isEmpty } from 'lodash'
import { useSelector } from 'react-redux'
import fetchData from '../../http/api'


const Journalist = () => {

    const {currentUser}=useSelector((state)=>state.AuthenticationReducer)
    const[error,setError] =useState({})
    const [formData, setFormData] = useState({
        category: '',
        location: '',
        title: '',
        images: [],
        video:"",
        content: ''
    });

      const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({...formData,[name]: value});
        setError({...error,[name]:""})
      };

      const handleUpload=async(e)=>{
      const {name,files} = e.target
        setFormData({...formData,[name]: Array.from(files)});
        setError({...error,[name]:""})
        // if(files && files.length > 0){
        //   const form = new FormData();
        //   Array.from(files).forEach(file => {
        //     form.append("photos", file);
        //   });
        //     try {
        //         await fetchData("/multipleimg","post", form,{ 'Content-Type': 'multipart/form-data' })
        //     } catch (error) {
        //         console.error(error.message)
        //     }
        // }
       
      }

      const handleValidation = () => {
        let error = {};
        if (formData.category === '') error.category = 'Category is required';
        if (formData.location === '') error.location = 'Location is required';
        if (formData.title === '') error.title = 'Title is required';
        if (formData.content === '') error.content = 'Content is required';
        return error;
      }

      const handleSubmit = async(e) => {
          e.preventDefault();
          const valid =handleValidation()
        if(!isEmpty(valid)){
            setError(valid);
        }else{
            try {
              let imageUrls = [];
              if (formData.images && formData.images.length > 0) {
                const form = new FormData();
                formData.images.forEach(file => {
                    form.append("photos", file);
                });
               // Upload images and get the response with image URLs
               const response =    await fetchData("/multipleimg", "post", form, { 'Content-Type': 'multipart/form-data' });
              imageUrls = response?.newImages
            }
            const submitData={
              ...formData,
              author:currentUser?._id,
              images:imageUrls,
              parent:currentUser?.mediaAdmin
          }
          // console.log('submitData: ', submitData);
            // Submit form data
            await fetchData("/news", "post", submitData);
                // Reset form data
            setFormData({
              category: '',
              location: '',
              title: '',
              images: [],
              content: ''
          });
            } catch (error) {
              console.error(error.message);
            }
        }
      };


  return (
    <div>
        <Navbar/>
        <div className='d-flex'>
        <Sidebar />
        <div className='container-fluid'>
          <h3 className="mt-5 mb-4">Add News</h3>
          <div className="row">
            <div className="col-md-12">
              <div className="card" >
                <div className="card-body mt-2">
                  <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">Category</label>
                      <input 
                        type="text" 
                        className="form-control" 
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        placeholder="Enter article category"
                      />
                      <span style={{color:"red",fontSize:'14px'}}>{error?.category}</span>
                    </div>
                   
                    <div className="mb-3">
                    <label htmlFor="location" className="form-label">Location</label>
                      <input
                        type="text"
                        className="form-control"
                        id="location"
                        name="location"
                        value={formData.location}
                        onChange={handleChange}
                        placeholder="Enter location"
                      />
                       <span style={{color:"red",fontSize:'14px'}}>{error?.location}</span>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="title" className="form-label">Article Title</label>
                      <input
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                        value={formData.title}
                        onChange={handleChange}
                        placeholder="Enter article title"
                      />
                       <span style={{color:"red",fontSize:'14px'}}>{error?.title}</span>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="images" className="form-label">Images</label>
                      <input
                        type="file"
                        className="form-control"
                        id="images"
                        name="images"
                        multiple
                        accept='image/*'
                        onChange={handleUpload}
                      />
                    </div>
                    <div className="mb-3">
                    <label htmlFor="video" className="form-label">Video URL</label>
                      <input
                        type="text"
                        className="form-control"
                        id="video"
                        name="video"
                        onChange={handleChange}
                      />
                       <span style={{color:"red",fontSize:'14px'}}>{error?.media}</span>
                    </div>
                    <div className="mb-3">
                    <label htmlFor="content" className="form-label">Article Content</label>
                      <textarea
                        className="form-control"
                        id="content"
                        name="content"
                        rows="5"
                        value={formData.content}
                        onChange={handleChange}
                        placeholder="Write your news here"
                      ></textarea>
                       <span style={{color:"red",fontSize:'14px'}}>{error?.content}</span>
                    </div>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <Footer/>
    </div>
  )
}

export default Journalist