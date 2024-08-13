import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar'
import Sidebar from '../../components/Sidebar'
import Footer from '../../components/Footer'
import fetchData from '../../http/api'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getFirstLine } from '../../common/common'


const Draft = () => {
    const {currentUser}=useSelector((state)=>state.AuthenticationReducer)
    const [draftNews, setDraftNews] = useState([])

    const getDraft = async() =>{
        try {
            const res = await fetchData(`/draftnews/${currentUser?._id}`,'get')
          setDraftNews(res?.drafts)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(()=>{
        getDraft()
    },[])
    

  return (
    <div>
    <Navbar />
    <div className="d-flex">
      <Sidebar />
      <div className="container-fluid">
        <h3 className="mt-5 mb-4"></h3>
        <div className="row">
          <div className="col-md-12">
            <div className="card mb-4">
              <div className="card-header">
                <h5 className="card-title">Drafted News</h5>
              </div>
              <div className="card-body">
                <ul className="list-group">
                  {draftNews?.map((item) => {
                    return (
                      <li className="list-group-item" key={item?._id}>
                        <h6 className="mb-1">{item?.title?'Title :'+item?.title:"" }</h6>
                        <h6 className="mb-1">{item?.location?'Location :'+item?.location:"" }</h6>
                        <h6 className="mb-1">{item?.category?'Category :'+item?.category:"" }</h6>
                        <p className="mb-1">{item.content?'Content:'+getFirstLine(item?.content):""}</p>
                        <img src={item?.images}/>
                        <Link
                          to={`/journalist/${item?._id}`}
                          className="btn btn-primary btn-sm"
                        >
                          View
                        </Link>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
  )
}

export default Draft