import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import { useDispatch, useSelector } from 'react-redux'
import networkRequest from '../../http/api'
import { isEmpty } from 'lodash'
import Modals from '../../components/Modals'
import { urlEndPoint } from '../../http/apiConfig'

const MediaAdmin = () => {
  const dispatch = useDispatch();
  const[user,setUser]=useState([])
  const {currentUser} = useSelector((state)=> state.AuthenticationReducer)
  const [modalOpen,setModalOpen] = useState(false)
  const [selected,setSelected]=useState(null)
  const token=localStorage.getItem('auth_token');
  
  const getJournalists = async () => {
    if (!isEmpty(token)) {
      const url =urlEndPoint.getJournals
      try {
        const res = await networkRequest({url},dispatch);
        // console.log('res: ', res);
        setUser(res?.users);
      } catch (error) {
        console.error('Error fetching journalists:', error);
      }
    }
  };
  
  useEffect(() => {
    getJournalists()
  },[])

  
  const handleBlockAndUnblock= async (id) => {
    const url = urlEndPoint.blockJournals(id)
    try {
      await networkRequest({url,method:'patch'},dispatch);
      setModalOpen(false)
      await getJournalists()
    } catch (error) {
      console.error(error)
    }
  }

  const handleOpenModal = async (id) => {
    setModalOpen(true)
    setSelected(id)
  }

  const handleDeleteJournalist = async () => {
    if(selected){
      const url =urlEndPoint.deleteJournalistData(selected)
    try {
     await networkRequest({url,method:'patch'},dispatch)
      await getJournalists()
      setModalOpen(false)
    } catch (error) {
      console.error(error)
    }
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
                          
                          <button 
                            className="mx-2 btn btn-danger btn-sm" 
                            onClick={()=> handleBlockAndUnblock(event?._id)}
                          >
                            {event?.blocked === true ? "InActive" : "Active"}
                          </button>
                          <button 
                            className="mx-2 btn btn-primary btn-sm" 
                            onClick={() => handleOpenModal(event?._id)}
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
      <Modals modalOpen={modalOpen} setModalOpen={setModalOpen} handleDeleteJournalist={handleDeleteJournalist}/>
      </div>
    )
}

export default MediaAdmin