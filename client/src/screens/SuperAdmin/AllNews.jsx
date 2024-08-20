import React, { useEffect, useState } from 'react'
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import Footer from '../../components/Footer';
import networkRequest from '../../http/api';
import { getFirstLine } from '../../common/common';
import { Link, useParams } from 'react-router-dom';
import { isEmpty } from 'lodash';
import { urlEndPoint } from '../../http/apiConfig';
import { useDispatch } from 'react-redux';

const AllNews = () => {
  const dispatch =useDispatch()
const {id}=useParams()
const[news,setNews] =useState([])

const getAllNews=async()=>{
  const url =urlEndPoint.getAllNewsCreate
  try {
    const res= await networkRequest({url},dispatch) 
    setNews(res?.news)
  } catch (error) {
    console.error(error)
  }
}

useEffect(()=>{
  getAllNews()
},[])

const filteredNews = news?.find((item)=>item._id ===id)

  return (
    <div>
    <Navbar/>
    <div className='d-flex'>
    <Sidebar/>
    <div className='container-fluid'>
      <h3 className="mt-5 mb-4"></h3>
      <div className="row">
        <div className="col-md-12">
        <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title">News</h5>
        </div>
        <div className="card-body">
            {isEmpty(id) ?
          <ul className="list-group">
            {news?.map((item)=>{
              return(
                <li className="list-group-item" key={item?._id}>
                <h6 className="mb-1">{item?.title}</h6>
                <p className="mb-1">{getFirstLine(item?.content)}</p>
                <Link to={`/admin/allnews/${item?._id}`} className="btn btn-primary btn-sm">Read More</Link>
              </li>
              )})}
          </ul>
          :
             <div className="row">
        <div className="col-md-12">
        <div className="card-body">
          <div className="mb-4">
          <p ><strong>Category : </strong>{filteredNews?.category}</p>
          <p><strong>Location : </strong>{filteredNews?.location}</p>
          <p><strong>Author ID : </strong>{filteredNews?.author}</p>
<img src={filteredNews?.images[0]?.url} alt="" />
          </div>
          <p className="mb-1">{filteredNews?.content}</p>
          <div className="mt-5">
          <span className="badge bg-secondary p-3 "  >
                    Status: {filteredNews?.newsStatus || 'Pending'}
                  </span>
                </div>
      </div>
      </div>
      </div>}
        </div>
      </div>
      </div>
      </div>
      </div>
      </div>
    <Footer/>
    </div>
  )
}

export default AllNews