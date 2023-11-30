import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import HomePage from './HomePage';
import FooterInfoBox from './FooterInfoBox';
import './Finalizedlogin.css'; 
import { ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from "../config/firebase";

const Finalizedlogin = () => {
  const [bookingDetails, setBookingDetails] = useState({
    fullName: '',
    email: '',
    phoneNumber: '',
    checkInDate: '',
    checkOutDate: '',
    roomType: '', 
  });

  const location = useLocation();
  const { spa } = location.state || {};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prevDetails) => ({ ...prevDetails, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bookingsCollectionRef = collection(db, 'login-bookings');

      const bookingData = {
        fullName: bookingDetails.fullName,
        email: bookingDetails.email,
        phoneNumber: bookingDetails.phoneNumber,
        checkInDate: bookingDetails.checkInDate,
        checkOutDate: bookingDetails.checkOutDate,
        roomType: bookingDetails.roomType, 
       
      };

      await addDoc(bookingsCollectionRef, bookingData);

     
      window.location.reload();
    } catch (error) {
      console.error('Error submitting booking details:', error);
    }
  };

  return (
    <div>
      <HomePage />
      <div className="finalized-form-container">
        <h1>Finalize Your Booking</h1>
        {spa && <p>Booking for: {spa.spaType}</p>}
        <form onSubmit={handleSubmit}>
          <label>
            Full Name:
            <input
              type="text"
              name="fullName"
              value={bookingDetails.fullName}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={bookingDetails.email}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Phone Number:
            <input
              type="tel"
              name="phoneNumber"
              value={bookingDetails.phoneNumber}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Check-In Date:
            <input
              type="date"
              name="checkInDate"
              value={bookingDetails.checkInDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Check-Out Date:
            <input
              type="date"
              name="checkOutDate"
              value={bookingDetails.checkOutDate}
              onChange={handleInputChange}
              required
            />
          </label>
          <label>
            Room Type:
            <select
              name="roomType"
              value={bookingDetails.roomType}
              onChange={handleInputChange}
              required
            >
              <option value="">Select Room Type</option>
              <option value="Single Room">Single Room</option>
              <option value="Standard Room">Standard Room</option>
              <option value="Double Room">Double Room</option>
              <option value="Suite">Suite</option>
              <option value="Deluxe Suite">Deluxe Suite</option>
              <option value="Family Room">Family Room</option>
            </select>
          </label>
          <button type="submit">Confirm Booking</button>
        </form>
      </div>
      <FooterInfoBox />
    </div>
  );
};

export default Finalizedlogin;
