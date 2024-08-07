import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import { isEmpty } from 'lodash'
import fetchData from '../../http/api'
import { useSelector } from 'react-redux'
import Modal from 'react-modal'
import { customStyles } from '../../common/common'

const NewsRejected = () => {
    const {token}=useSelector((state)=>state.AuthenticationReducer)
    const [newsData, setNewsData] = useState([]);
    const [selectedNews, setSelectedNews] = useState({});
    const [ModalOpen, setModalOpen] = useState(false);

    const getNewsData=async()=>{
        if(!isEmpty(token)){
          const res=await fetchData("/allnews","get",null,{Authorization:token})
          setNewsData(res?.news)
        }
      }
  
  useEffect(()=>{
      getNewsData()
  },[])

  
  
  const filteredNewsData = newsData.filter((item)=>item.newsStatus=== "rejected")


const handleView=(id)=>{
    const filteredNews=newsData.find((item)=>item?._id === id)
    setSelectedNews(filteredNews)
      setModalOpen(true);
     }
    
      const handleApprove=async(id)=>{
        const res =await fetchData(`/approved/${id}`,"post",{newsStatus:'approved'})
      
        setModalOpen(false)
        await getNewsData()
      }

  return (
    <div>
    <Navbar />
    <div className='d-flex'>
    <Sidebar />
    <div className='container-fluid'>
      <h3 className="mt-5 mb-4">News Rejected</h3>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            {!isEmpty(filteredNewsData)?
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Title</th>
                  <th>Category</th>
                  <th>Author ID</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredNewsData.map((event) => {
                  
                return(
                  <tr key={event?._id}>
                    <td>{event?.title}</td>
                    <td>{event?.category}</td>
                    <td>{event?.author}</td>
                    <td>
                      <button 
                        className="btn btn-primary btn-sm" 
                        onClick={() => handleView(event?._id)}
                      >
                        view
                      </button>
                    </td>
                  </tr>
                )})} 
              </tbody>
            </table>:
            <p className='d-flex mt-5' style={{alignItems:'center',justifyContent:"center"}}>No News is Rejected</p> }
          </div>
        </div>
      </div>
    </div>
  </div>
        <Footer />
        <Modal isOpen={ModalOpen} style={customStyles} onRequestClose={() => setModalOpen(false)}>
        <div className="modal-content align-items-center justify-content-center">
          <div className="modal-body text-center">
            <h5 className="modal-title mb-4">{selectedNews?.title}</h5>
            <div className="modal-details  d-flex mb-4 p-4" style={{flexDirection:'column', alignItems:"flex-start"}}>
        <p><strong>Category:</strong> {selectedNews?.category}</p>
        <p><strong>Location:</strong> {selectedNews?.location}</p>
     
      </div>
      
            <p>{selectedNews?.content}</p>
            <div className="modal-footer mt-5">
             
              <button className="btn btn-primary mx-2" onClick={() => handleApprove(selectedNews?._id)}> Approve</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default NewsRejected