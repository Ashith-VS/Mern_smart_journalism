import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import Modal from 'react-modal';
import fetchData from '../../http/api';
import { isEmpty } from 'lodash';
import { customStyles } from '../../common/common';

const NewsStatus = () => {

  const token=localStorage.getItem('auth_token');
    // console.log('token: ', token);
    const [selectedNews, setSelectedNews] = useState({});
    const [ModalOpen, setModalOpen] = useState(false);
    const [newsData, setNewsData] = useState([]);
   
    const getNewsData=async()=>{
      if(!isEmpty(token)){
        const res=await fetchData("/allnews","get")
        // console.log('res: ', res);
        setNewsData(res?.news)
      }
    }

useEffect(()=>{
    getNewsData()
},[])

const filteredNewsData = newsData.filter((item)=>item.newsStatus=== "pending")
// console.log('filteredNewsData: ', filteredNewsData);

      
    const handleView=(id)=>{
   const filteredNews=newsData.find((item)=>item?._id === id)
   setSelectedNews(filteredNews)
     setModalOpen(true);
    }

      const handleReject=async(id)=>{
        const res =await fetchData(`/rejected/${id}`,"post",{newsStatus:'rejected'})
        // console.log('res: ', res);
        setModalOpen(false)
        await getNewsData()
      }

      const handleApprove=async(id)=>{
        const res =await fetchData(`/approved/${id}`,"post",{newsStatus:'approved'})
        // console.log('res: ', res);
        setModalOpen(false)
        await getNewsData()
      }


  return (
    <div>
    <Navbar />
    <div className='d-flex'>
    <Sidebar />
    <div className='container-fluid'>
      <h3 className="mt-5 mb-4">News Approval Request</h3>
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
            </table>:<p className='d-flex mt-5' style={{alignItems:'center',justifyContent:"center"}}>No Request for approval</p> }
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
              <button className="btn btn-secondary mx-2" onClick={() => handleReject(selectedNews?._id)}> Reject</button>
              <button className="btn btn-primary mx-2" onClick={() => handleApprove(selectedNews?._id)}> Approve</button>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  )
}

export default NewsStatus