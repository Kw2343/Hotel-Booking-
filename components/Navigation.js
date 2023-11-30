import React from 'react';
import { Link } from 'react-router-dom';
import '../components/Header.css';


function Navigation() {
  return (
    <nav className="navbar">
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
            <Link to="/about">About Us</Link>
        </li>
       
      </ul>
    </nav>
  );
}

export default Navigation;