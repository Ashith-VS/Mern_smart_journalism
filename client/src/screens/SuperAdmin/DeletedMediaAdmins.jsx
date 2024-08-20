import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'
import networkRequest from '../../http/api'
import { isEmpty } from 'lodash'
import { urlEndPoint } from '../../http/apiConfig'
import { useDispatch } from 'react-redux'

const DeletedMediaAdmins = () => {
  const dispatch = useDispatch()
  const [deletedMediaAdmins, setDeletedMediaAdmins] = useState([])
  const[journalist,setJournalist] = useState(null)

  const getDeletedMediaAdmins = async() =>{
    const url =urlEndPoint.getMediaAdminDelete
    try {
      const res = await networkRequest({url},dispatch)
      setDeletedMediaAdmins(res?.mediaAdmins)
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    getDeletedMediaAdmins()
  }, [])

  const getJournalists=async(id)=>{
    const url =urlEndPoint.getDeletedJournalsList(id)
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

  return (
    <div>
  <Navbar/>
  <div className='d-flex'>
        <Sidebar />
        <div className='container-fluid'>
          <h3 className="mt-5 mb-4">Deleted Media Admins</h3>
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th>Media</th>
                      <th>email</th>
                      <th>Mobile</th>
                    </tr>
                  </thead>
                  <tbody>
                    {deletedMediaAdmins?.map((madmin, index) =>{ 
                    
                      return(
                    <tr key={index} onClick={()=>handleShow(madmin?._id)} >
                      <td>{madmin.name}</td>
                      <td>{madmin.email}</td>
                      <td>{madmin.mobile}</td>
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
                       
                      </tr>
                    </thead>
                    <tbody>
                      {journalist?.map((item)=>{
                      
                        return(
                      <tr key={item?._id}>
                        <td>{item?.name}</td>
                        <td>{item?.email}</td>
                        <td>{item?.mobile}</td>
                       
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
</div>
  )
}

export default DeletedMediaAdmins