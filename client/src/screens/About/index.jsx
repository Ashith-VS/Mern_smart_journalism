import React from 'react';
import './About.css'; 
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';

const About = () => {
  return (
    <div>
        <Navbar/>
    <div className="about-container">
      <header className="about-header">
        <h1>About Us</h1>
      </header>
      <section className="about-content">
        <div className="section mission">
          <h2>Our Mission</h2>
          <p>
            Our mission is to provide top-notch services and solutions to our clients. We aim to exceed expectations through innovation, dedication, and integrity.
          </p>
        </div>
        <div className="section vision">
          <h2>Our Vision</h2>
          <p>
            We envision a future where our company is recognized as a leader in the industry, known for delivering exceptional results and fostering strong, long-term relationships with our clients.
          </p>
        </div>
        <div className="section team">
          <h2>Meet the Team</h2>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h3>John Doe</h3>
            <p>CEO & Founder</p>
          </div>
          <div className="team-member">
            <img src="https://via.placeholder.com/150" alt="Team Member" />
            <h3>Jane Smith</h3>
            <p>CTO</p>
          </div>
        </div>
      </section>
    </div>
    <Footer/>
    </div>
  );
};

export default About;
