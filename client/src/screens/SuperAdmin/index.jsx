import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import networkRequest from '../../http/api'
import { GetMediaAdmins } from '../../Redux/Action/NewsAction'
import { isEmpty } from 'lodash'
import Modal from "react-modal";
import { customStyles } from '../../common/common'
import { urlEndPoint } from '../../http/apiConfig'

const SuperAdmin = () => {

  const dispatch=useDispatch()
  const[journalist,setJournalist] = useState(null)
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(null);
  const {getmediaAdmin} = useSelector((state)=>state.NewsReducer)
 
    useEffect(() => {
    dispatch(GetMediaAdmins())
    }, [])

    const getJournalists=async(id)=>{
      const url =urlEndPoint.getJournalbySuperAdmin(id)
      try {
        const res= await networkRequest({url},dispatch)
        setJournalist(res?.user)
      } catch (error) {
        console.error(error)
      }
    }

    const handleShow=(id)=>{
      getJournalists(id)
    }

    const handleBlock=async(id)=>{
      const url =urlEndPoint.getMediaAdminbySuperAdmin(id)
      try {
        await networkRequest({url,method:'patch'},dispatch)
        getJournalists(id)
        dispatch(GetMediaAdmins())
      } catch (error) {
        console.error(error)
      }
    }

    const  handleShowModal=(id)=>{
      setSelectedId(id)
     setLoginModalOpen(true)
   }

   const handleDelete=async()=>{
    if(selectedId){
      const url =urlEndPoint.deletesMediaAdmin(selectedId)
      try{
       await networkRequest({url,method:'patch'},dispatch)
        await dispatch(GetMediaAdmins())
        getJournalists(selectedId)
        setLoginModalOpen(false)
        setSelectedId(null)
      }catch(error){
        console.error(error)
      }
    }
   }

  return (
    <div>
  <Navbar/>
  <div className='d-flex'>
        <Sidebar />
        <div className='container-fluid'>
          <h3 className="mt-5 mb-4">Media Admins</h3>
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th>Media</th>
                      <th>email</th>
                      <th>Mobile</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getmediaAdmin?.map((madmin, index) =>{ 
                      return(
                    <tr key={index} onClick={()=>handleShow(madmin?._id)} >
                      <td>{madmin.name}</td>
                      <td>{madmin.email}</td>
                      <td>{madmin.mobile}</td>
                      <td>
                        <button 
                          className="btn btn-secondary btn-sm" 
                         onClick={()=>handleBlock(madmin?._id)}
                        >
                         {madmin?.blocked === true ? "InActive" : "Active"}
                        </button>
                        <button 
                          className="btn btn-secondary btn-sm mx-3" 
                          onClick={()=>handleShowModal(madmin?._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>)})}
                  </tbody>
                </table>

                {!isEmpty(journalist) ? (
                <div className="mt-4">
                  <h4>Journalist Details</h4>
                  <table className="table table-striped table-bordered">
                    <thead className="table-dark">
                      <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Mobile</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {journalist?.map((item)=>{
                      
                        return(
                      <tr key={item?._id}>
                        <td>{item?.name}</td>
                        <td>{item?.email}</td>
                        <td>{item?.mobile}</td>
                        <td>
                        <button 
                          className="btn btn-secondary btn-sm" 
                        >
                         {item?.blocked === true ? "InActive" : "Active"}
                        </button>
                      
                      </td>
                      </tr>)})}
                    </tbody>
                  </table>
                </div>
              ):journalist !== null && (
                <p className="mt-5" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  No Journalist found
                </p>
              )}
              </div>
            </div>
          </div>
        </div>
      </div>
  <Footer/>
  <Modal
        isOpen={loginModalOpen}
        style={customStyles}
        onRequestClose={() => setLoginModalOpen(false)}
      >
        <div className="modal-content align-items-center justify-content-center p-5">
          <div className="modal-body text-center">
            {/* <h5 className="modal-title mb-4">Login Required</h5> */}
            <p>Are You sure  to Delete</p>
            <div className="modal-footer mt-5 p-2">
              <button
                className="btn btn-secondary mx-2"
                onClick={() => setLoginModalOpen(false)}
              >
                Cancel
              </button>
              <button
                className="btn btn-primary mx-2"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </Modal>
</div>

  )
}

export default SuperAdmin