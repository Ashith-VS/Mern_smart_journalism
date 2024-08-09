import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux'
import fetchData from '../../http/api'
import { isEmpty } from 'lodash'

const MediaAdmin = () => {
  const[user,setUser]=useState([])
  const {currentUser} = useSelector((state)=> state.AuthenticationReducer)
  const token=localStorage.getItem('auth_token');
  
  const getJournalists = async () => {
    if (!isEmpty(token)) {
      try {
        const res = await fetchData('/journalist', 'GET');
        setUser(res?.user);
      } catch (error) {
        console.error('Error fetching journalists:', error);
      }
    }
  };
  useEffect(() => {
    getJournalists()
  },[])

  const handleDeleteJournalist = async (id) => {
    try {
      const res = await fetchData(`/journalist/${id}`, 'delete')
      // console.log('res: ', res);
      await getJournalists()
    } catch (error) {
      console.error(error)
    }
  }
  
    return (
        <div>
        <Navbar />
        <div className='d-flex'>
        <Sidebar />
        <div className='container-fluid'>
          <h3 className="mt-5 mb-4">{currentUser?.name}</h3>
          <div className="row">
            <div className="col-md-12">
              <div className="table-responsive">
                <table className="table table-striped table-bordered">
                  <thead className="table-dark">
                    <tr>
                      <th>Journalist Name</th>
                      <th>Email</th>
                      <th>Mobile</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {user?.map((event) => (
                      <tr key={event?._id}>
                        <td>{event?.name}</td>
                        <td>{event?.email}</td>
                        <td>{event?.mobile}</td> 
                        <td>
                          {/* <button 
                            className="btn btn-primary btn-sm" 
                            // onClick={() =>navigate(`/register/${event?._id}`)}
                          >
                            Edit
                          </button> */}
                          <button 
                            className="mx-2 btn btn-secondary btn-sm" 
                            onClick={() => handleDeleteJournalist(event?._id)}
                          >
                          Delete
                          </button>
                        </td>
                      </tr>
                    ))} 
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
            <Footer />
        </div>
    )
}

export default MediaAdmin