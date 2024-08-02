import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import { useSelector } from 'react-redux'
import fetchData from '../../http/api'


const SuperAdmin = () => {
    const {currentUser} = useSelector((state)=>state.AuthenticationReducer)
    console.log('currentUser: ', currentUser);
const[user,setUser]=useState([])
    const getMediaAdmins=async()=>{
      const res=await fetchData('/mediaAdmins',"get")
      console.log('res: ', res);
      setUser(res?.mediaAdmins)
    }
    useEffect(() => {
    getMediaAdmins()
    }, [])
    
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
                    {user.map((madmin, index) => (
                    
                    <tr >
                      <td>{madmin.name}</td>
                      <td>{madmin.email}</td>
                      <td>{madmin.mobile}</td>
                      <td>
                        <button 
                          className="btn btn-primary btn-sm" 
                          onClick={() => handleEdit("event.id")}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>))}
                  </tbody>
                </table>
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