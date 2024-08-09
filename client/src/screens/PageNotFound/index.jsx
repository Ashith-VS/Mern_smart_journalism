import React from 'react';
import './pagenotfound.css'; 
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="page-not-found">
      <div className="container">
        <h1>404</h1>
        <p>Oops! The page you’re looking for doesn’t exist.</p>
        <Link to="/" className="home-link">Go to Homepage</Link>
      </div>
    </div>
  );
};

export default PageNotFound;
