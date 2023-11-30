import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as Logo } from '../assets/Logo.svg';
import 'react-datepicker/dist/react-datepicker.css';
import './Home.css';
import DatePicker from 'react-datepicker';
import PhotoSlider from './PhotoSlider';
import FooterInfoBox from './FooterInfoBox';

function Home() {
  const [checkInDate, setCheckInDate] = useState(null);
  const [checkOutDate, setCheckOutDate] = useState(null);
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [numRooms, setNumRooms] = useState(1);
  
  

  const handleSearch = () => {
    // Perform the search action here, e.g., send a request to a server
    console.log('Search button clicked');
  };

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

      <div className="booking-container-home">
        <div className="date-picker">
          <div className="date-input">
            <label>Check-In Date:</label>
            <DatePicker selected={checkInDate} onChange={(date) => setCheckInDate(date)} placeholderText=' dd/mm/yyyy' />
          </div>
          <div className="date-input">
            <label>Check-Out Date:</label>
            <DatePicker selected={checkOutDate} onChange={(date) => setCheckOutDate(date)} placeholderText=' dd/mm/yyyy' />
          </div>
        </div>

        <div className="quantity-input">
          <div className="quantity-fields">
            <div className="quantity-field">
              <label>Adults:</label>
              <input
                type="number"
                value={numAdults}
                onChange={(e) => setNumAdults(parseInt(e.target.value))}
                min="1"
              />
            </div>
            <div className="quantity-field">
              <label>Children:</label>
              <input
                type="number"
                value={numChildren}
                onChange={(e) => setNumChildren(parseInt(e.target.value))}
                min="0"
              />
            </div>
            <div className="quantity-field">
              <label>Rooms:</label>
              <input
                type="number"
                value={numRooms}
                onChange={(e) => setNumRooms(parseInt(e.target.value))}
                min="1"
              />
            </div>
          </div>
        </div>

        <button onClick={handleSearch} className="search-button">Search</button>
      </div>

      <PhotoSlider />
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
            <Link to="/aboutus">About Us</Link>
          </li>
        </ul>
      </nav>
      <FooterInfoBox />
    </div>
  );
}

export default Home;
