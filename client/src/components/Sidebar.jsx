import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

const Sidebar = () => {
  const {currentUser}=useSelector((state)=>state.AuthenticationReducer)
  console.log('currentUser: ', currentUser);

  return (
    <div className="d-flex flex-column bg-light vh-100 "style={{padding:"30px"}}>
      <h3 className="p-3">{currentUser?.role==="Journalist"?"Journalist Menu":"Dashboard"}</h3>
      <ul className="nav flex-column">
        {currentUser?.role === "superAdmin"&&
        <>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Create MediaAdmins</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin">view All</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/admin/allnews">All News</Link>
        </li>
        </>}

        {currentUser?.role === "mediaAdmin"&&
        <>
        <li className="nav-item">
          <Link className="nav-link" to="/mediaAdmin">View Journalist</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/register">Create Journalist</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/mediaAdmin/status">News Status</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/mediaAdmin/published"> News Publshed</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/mediaAdmin/rejected">News Rejected</Link>
        </li>
        </>}
        {currentUser?.role === "Journalist"&&
        <>
        <li className="nav-item">
          <Link className="nav-link" to="/journalist">Create News</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/journalist/news">News Status</Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/journalist/published">Published News</Link>
        </li>
        </>}
      </ul>

    </div>
  );
};

export default Sidebar;