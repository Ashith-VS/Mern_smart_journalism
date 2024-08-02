import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import Modal from 'react-modal';
import { useNavigate } from 'react-router-dom';
import fetchData from '../../http/api';
import { useSelector } from 'react-redux';

const Notification = () => {
    const navigate =useNavigate()
    const {token}=useSelector((state)=>state.AuthenticationReducer)
    console.log('token: ', token);
    
    const [ModalOpen, setModalOpen] = useState(false);
    const [newsData, setNewsData] = useState([]);
    console.log('newsData: ', newsData);

    const getNewsData=async()=>{
        const res=await fetchData("/news","get",{},{Authorization:token})
        setNewsData(res)
    }

useEffect(()=>{
    getNewsData()
},[])


    const handleView=()=>{
setModalOpen(true);
    }
    const customStyles = {
        content: {
          top: "50%",
          left: "50%",
          right: "auto",
          bottom: "auto",
          marginRight: "-50%",
          transform: "translate(-50%, -50%)",
        },
      };



  return (
    <div>
    <Navbar />
    <div className='d-flex'>
    <Sidebar />
    <div className='container-fluid'>
      <h3 className="mt-5 mb-4"></h3>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Date</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {/* {tickets.map((event, index) => ( */}
                  <tr >
                    <td>{"event.name"}</td>
                    <td>{"event.name"}</td>
                    <td>{"event.name"}</td>
                    <td>
                      <button 
                        className="btn btn-primary btn-sm" 
                        onClick={() => handleView("event.id")}
                      >
                        view
                      </button>
                    </td>
                  </tr>
                {/* ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
        <Footer />
        {/* <Modal isOpen={ModalOpen} style={customStyles} onRequestClose={() => setModalOpen(false)}>
        <div className="modal-content align-items-center justify-content-center">
          <div className="modal-body text-center">
            <h5 className="modal-title mb-4">Login Required</h5>
            <p>Please log in to book tickets for this event.</p>
            <div className="modal-footer mt-3">
              <button className="btn btn-secondary mx-2" onClick={() => setModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary mx-2" onClick={() => navigate('/login')}>Login</button>
            </div>
          </div>
        </div>
      </Modal> */}
    </div>
  )
}

export default Notification