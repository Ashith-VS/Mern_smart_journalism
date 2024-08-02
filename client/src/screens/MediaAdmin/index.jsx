import React, { useEffect } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import { useSelector } from 'react-redux'
import fetchData from '../../http/api'

const MediaAdmin = () => {
  const {currentUser} = useSelector((state)=> state.AuthenticationReducer)
  console.log('currentUser: ', currentUser);
 
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
                      <th>Date</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {/* {tickets.map((event, index) => ( */}
                      <tr >
                        <td>{"event.name"}</td>
                        <td>{"event.name"}</td>
                        <td>
                          <button 
                            className="btn btn-primary btn-sm" 
                            // onClick={() => handleEdit(event.id)}
                          >
                            Edit
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
        </div>
    )
}

export default MediaAdmin