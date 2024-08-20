import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import { isEmpty } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import networkRequest from '../../http/api'
import { useParams } from 'react-router-dom'
import Modal from 'react-modal';
import { customStyles } from '../../common/common'
import { urlEndPoint } from '../../http/apiConfig'

const Journalist = () => {
const dispatch =useDispatch()
const {id}=useParams()

const [loginModalOpen, setLoginModalOpen] = useState(false);
    const {currentUser}=useSelector((state)=>state.AuthenticationReducer)
    const [modalcontent,setModalContent]=useState({})
    const [news,setNews]=useState([])
    const[error,setError] =useState({})
    const [formData, setFormData] = useState({
        category: '',
        location: '',
        title: '',
        images: [],
        video:"",
        content: '',
        newsStatus:"pending"
    });
    const getNews = async () => {
      try {
         // Fetch published news
        const url =urlEndPoint.getnewsbyJournalist
        const publishedNewsResponse =  await networkRequest({url},dispatch);
        const publishedNews = publishedNewsResponse?.news || [];
           // Fetch draft news
        const urls=urlEndPoint.getdraftNewss(currentUser?._id)
        const draftsResponse=await networkRequest({url:urls},dispatch);
        const drafts = draftsResponse?.drafts || [];
          // Combine published and draft news
    const combinedNews = [...publishedNews, ...drafts];
    setNews(combinedNews);
      } catch (error) {
        console.error(error);
      }
    };

const filteredNewsId = news?.find(data=>data?._id ===id)


    useEffect(()=>{
      if (id){
        getNews()
      }
    },[id])
    useEffect(() => {
      setFormData({
        category: filteredNewsId?.category || '',
        location: filteredNewsId?.location || '',
        title: filteredNewsId?.title || '',
        images: filteredNewsId?.images || [],
        video: filteredNewsId?.video || '',
        content: filteredNewsId?.content || '',
        newsStatus: filteredNewsId?.newsStatus ||""
      })
    }, [news,id])

      const handleChange = (e) => {
        const { name, value} = e.target;
        setFormData({...formData,[name]: value});
        setError({...error,[name]:""})
      };

      const handleUpload=async(e)=>{
      const {name,files} = e.target
        setFormData({...formData,[name]: Array.from(files)});
        setError({...error,[name]:""})
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
               const url=urlEndPoint.imageUpload
               const response = await networkRequest({url, method:"post", data:form, headers:{ 'Content-Type': 'multipart/form-data' }},dispatch);
              imageUrls = response?.newImages
            }
            const submitData={
              ...formData,
              author:currentUser?._id,
              images:imageUrls,
          }
          const url =urlEndPoint.getnewsbyJournalist
            await networkRequest({url, method:"post", data:submitData},dispatch);
              
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

      const handleUpdate=async(e)=>{
        e.preventDefault();
        const valid = handleValidation();
        if (!isEmpty(valid)) {
            setError(valid);
        } else {
            try {
                let imageUrls = [];
                // If images are selected, handle image upload
                if (formData.images && formData.images.length > 0) {
                    const form = new FormData();
                    formData.images.forEach(file => {
                        form.append("photos", file);
                    });
                    // Upload images and get the response with image URLs
                    const url=urlEndPoint.imageUpload
                    const response = await networkRequest({url, method:"post", data:form, headers:{ 'Content-Type': 'multipart/form-data' }},dispatch);
                    imageUrls = response?.newImages;
                }
    
                const submitData = {
                  ...formData,
                  author: currentUser?._id,
                  images: imageUrls,
                  newsStatus: "pending"
                };
                // Update news data
                const url =urlEndPoint.updateNews(id)
                await networkRequest({url, method:"put", data:submitData},dispatch);
                setLoginModalOpen(true);
                // Reset form data after successful update
                setFormData({
                    category: '',
                    location: '',
                    title: '',
                    images: [],
                    content: '',
                    newsStatus: ""
                });
    
                // Optionally, redirect or show a success message
            } catch (error) {
                console.error(error.message);
            }
        }
      }
     
      
      const handleDraftNews = async(e)=>{
        e.preventDefault();
        if (
          !formData.title.trim() &&
          !formData.content.trim() &&
          !formData.category.trim() &&
          !formData.location.trim() &&
          (formData.images.length === 0 || !formData.images) &&
          !formData.video.trim()
      ) {
        setLoginModalOpen(true)
        setModalContent('At least one field must be filled for the draft.')
          return;
      }
        try {
          const submitDatas={...formData,draftedby:currentUser?._id}
          const url =urlEndPoint.addDraftNews
          const res=await networkRequest({url,method:"post",data:{submitDatas}},dispatch)
         if(res.status){
           setLoginModalOpen(true)
           setModalContent(res?.message)
           setFormData({
             category: '',
             location: '',
             title: '',
             images: [],
             video: '',
             content: '',
           })
         }
        } catch (error) {
          console.error(error)
        }
      }


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
                  <form onSubmit={id ? handleUpdate:handleSubmit}>
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
                    <button type="button" className="btn btn-secondary mx-3" onClick={handleDraftNews}>Draft</button>
                    <button type="submit" className="btn btn-primary">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
        <Footer/>
        <Modal isOpen={loginModalOpen} style={customStyles} onRequestClose={() => setLoginModalOpen(false)}>
        <div className="modal-content align-items-center justify-content-center p-5">
          <div className="modal-body text-center">
            <h5 className="modal-title mb-4"></h5>
            <p>{modalcontent?modalcontent:'News updated Successfully'}</p>
            <div className="modal-footer mt-5 p-2">
              <button className="btn btn-secondary mx-2" onClick={() => setLoginModalOpen(false)}>Cancel</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default Journalist