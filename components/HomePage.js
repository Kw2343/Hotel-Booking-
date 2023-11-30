import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/Logo.svg';
import 'react-datepicker/dist/react-datepicker.css';
import './HomePage.css';



function Home() {


  return (
    <div className="background-gradient">
      <div className="logo">
        <Logo />
      </div>
      <div className="login-signup-buttons">
        <Link to="/login">Login</Link>
        <Link to="/signup">Sign Up</Link>
      </div>

      <div className="admin-login">
        <Link to="/auth">Admin Login</Link>
      </div>
   

     
      <nav className={`navbar`}>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/hotel">Hotel</Link>
          </li>
          <li>
            <Link to="/spa">Spa</Link>
          </li>
          <li>
            <Link to="/dining">Dining</Link>
          </li>
          <li>
            <Link to="/aboutus">About Us</Link>
          </li>
        </ul>
      </nav>
      
    </div>
  );
}

export default Home;
