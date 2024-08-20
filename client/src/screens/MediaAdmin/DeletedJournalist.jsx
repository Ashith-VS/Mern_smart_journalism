import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import { isEmpty } from 'lodash'
import networkRequest from '../../http/api'
import { urlEndPoint } from '../../http/apiConfig'
import { useDispatch } from 'react-redux'

const DeletedJournalist = () => {
  const dispatch =useDispatch()
  const [deleteJournalist,setDeletedJournalist] =useState([])

    const GetDeletedJournal = async () => {
      const url =urlEndPoint.deletedJournals
        try {
          const res = await networkRequest({url},dispatch);
          setDeletedJournalist(res?.journalist);
        } catch (error) {
          console.error(error);
        }
      };
      
      useEffect(() => {
        GetDeletedJournal();
      }, []);
      
  return (
    <div>
    <Navbar />
    <div className='d-flex'>
    <Sidebar />
    <div className='container-fluid'>
      <h3 className="mt-5 mb-4">Deleted Journalist</h3>
      <div className="row">
        <div className="col-md-12">
          <div className="table-responsive">
          {!isEmpty(deleteJournalist)?
            <table className="table table-striped table-bordered">
              <thead className="table-dark">
                <tr>
                  <th>Journalist Name</th>
                  <th>Email</th>
                  <th>Mobile</th>
                </tr>
              </thead>
              <tbody>
                
                {deleteJournalist?.map((event) => (
                  <tr key={event?._id}>
                    <td>{event?.name}</td>
                    <td>{event?.email}</td>
                    <td>{event?.mobile}</td> 
                  </tr>
                )) }
              </tbody>
            </table>:<p style={{display:'flex',justifyContent:'center',alignItems:'center'}}>No such journalist</p>}
          </div>
        </div>
      </div>
    </div>
  </div>
  <Footer />
  </div>
  )
}

export default DeletedJournalist