import React, { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../config/firebase';
import HomePage from './HomePage';
import FooterInfoBox from './FooterInfoBox';
import './BookSpa.css';

function BookSpa() {
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    spaTreatment: '', 
  });

  const handleInputChange = (e) => {
    setBookingData({
      ...bookingData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    try {
      const bookingCollectionRef = collection(db, 'Bookingsspa');
      await addDoc(bookingCollectionRef, bookingData);

      console.log('Booking submitted successfully:', bookingData);

      // Reload the page after successful submission
      window.location.reload();
    } catch (error) {
      console.error('Error submitting booking:', error);
    }
  };

  return (
    <div className="spa-background">
      <HomePage />
      <div className="book-spa-container">
        <form>
          <h2 className="title">Book Spa</h2>
          <label>Name:</label>
          <input type="text" name="name" value={bookingData.name} onChange={handleInputChange} />

          <label>Email:</label>
          <input type="email" name="email" value={bookingData.email} onChange={handleInputChange} />

          <label>Phone:</label>
          <input type="tel" name="phone" value={bookingData.phone} onChange={handleInputChange} />

          <label>Spa Treatment:</label>
          <select
            name="spaTreatment"
            value={bookingData.spaTreatment}
            onChange={handleInputChange}
          >
            <option value="">Select a spa treatment</option>
            <option value="Aromatherapy">Aromatherapy</option>
            <option value="30 mins Facial Spa">30 mins Facial Spa</option>
            <option value="Hot stone massage therapy">Hot stone massage therapy</option>
            <option value="60 mins Facial Spa">60 mins Facial Spa</option>
            <option value="Massage Therapy">Massage Therapy</option>
          </select>

          <button type="button" onClick={handleSubmit} className="Book-Button">
            Book Spa
          </button>
        </form>
      </div>
      <FooterInfoBox />
    </div>
  );
}

export default BookSpa;
