import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import Sidebar from '../../components/Sidebar';
import { useSelector } from 'react-redux';
import fetchData from '../../http/api';
import { useParams } from 'react-router-dom';

const NewsDetail = () => {
const {token}=useSelector((state)=>state.AuthenticationReducer)
const [news,setNews]=useState([])
const {id}=useParams()
const filteredNews= news.find((item)=>item?._id===id)


const getNews = async() =>{
const res= await fetchData('/news','get',{},{Authorization:token})
setNews(res?.news)
  }

useEffect(()=>{
getNews()
},[])

  return (
    <div>
    <Navbar/>
    <div className='d-flex'>
    <Sidebar/>
    <div className='container-fluid'>
      <h3 className="mt-5 mb-4">{filteredNews?.title}</h3>
      <div className="row">
        <div className="col-md-12">
        <div className="card-body">
          <div className="mb-4">
          <p ><strong>Category : </strong>{filteredNews?.category}</p>
          <p><strong>Location : </strong>{filteredNews?.location}</p>
          </div>
          <p className="mb-1">{filteredNews?.content}</p>
          <div className="mt-5">
          <span className="badge bg-secondary p-3 "  >
                    Status: {filteredNews?.newsStatus || 'Pending'}
                  </span>
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

export default NewsDetail