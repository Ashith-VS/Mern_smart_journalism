import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-secondary text-white py-3 ">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <h5 className="mb-2">About Us</h5>
            <p>
              We are committed to delivering the best services and solutions.
              Our team of experts is dedicated to exceeding your expectations.
            </p>
          </div>
          <div className="col-md-6">
            <h5 className="mb-2">Contact Us</h5>
            <ul className="list-unstyled">
              <li>Email: <a href="mailto:info@example.com" className="text-white">info@example.com</a></li>
              <li>Phone: <a href="tel:+1234567890" className="text-white">+1 234 567 890</a></li>
              <li>Address: 123 Main Street, Anytown, USA</li>
            </ul>
          </div>
        </div>
        <div className="text-center mt-3">
          <p className="mb-0">&copy; {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
