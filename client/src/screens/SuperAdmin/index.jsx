import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { useDispatch, useSelector } from 'react-redux'
import fetchData from '../../http/api'
import { Link, useNavigate } from 'react-router-dom'
import { GetMediaAdmins } from '../../Redux/Action/NewsAction'
import { isEmpty } from 'lodash'


const SuperAdmin = () => {
  const navigate =useNavigate()
  const dispatch=useDispatch()
  const[journalist,setJournalist] = useState(null)

    const {currentUser} = useSelector((state)=>state.AuthenticationReducer)
    const {getmediaAdmin} = useSelector((state)=>state.NewsReducer)
 
    useEffect(() => {
    dispatch(GetMediaAdmins())
    }, [])

    const handleDelete=(id)=>{

    }

    const getJournalists=async(id)=>{
      try {
        const res= await fetchData(`/journalist/${id}`,"get")
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
                          onClick={() => handleDelete(madmin?._id)}
                          // onClick={() => navigate(`/register/${madmin._id}`)}
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

export default SuperAdmin