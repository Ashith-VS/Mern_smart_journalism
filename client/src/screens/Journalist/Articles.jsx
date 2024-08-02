import React from 'react'
import { Link } from 'react-router-dom'
import Footer from '../../components/Footer'
import Sidebar from '../../components/Sidebar'
import Navbar from '../../components/Navbar'

const Articles = () => {
  return (
    <div>
    <Navbar/>
    <div className='d-flex'>
    <Sidebar/>
    <div className='container-fluid'>
      <h3 className="mt-5 mb-4">Media Admins</h3>
      <div className="row">
        <div className="col-md-12">
        <div className="card mb-4">
        <div className="card-header">
          <h5 className="card-title">Recent Articles</h5>
        </div>
        <div className="card-body">
          <ul className="list-group">
            <li className="list-group-item">
              <h6 className="mb-1">Article Title 1</h6>
              <p className="mb-1">Brief description of the article...</p>
              <Link to="/journalist/article/1" className="btn btn-primary btn-sm">Read More</Link>
            </li>
            <li className="list-group-item">
              <h6 className="mb-1">Article Title 2</h6>
              <p className="mb-1">Brief description of the article...</p>
              <Link to="/journalist/article/2" className="btn btn-primary btn-sm">Read More</Link>
            </li>
          </ul>
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

export default Articles