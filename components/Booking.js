import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../config/firebase'; // Make sure to import your Firebase auth instance
import googleIcon from '../assets/Google.svg'; 
import './Booking.css';
import HomePage from './HomePage';
import FooterInfoBox from './FooterInfoBox';

const Booking = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState(null);

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('userLoggedIn', 'true');
      navigate('/Finalizedlogin');
    } catch (err) {
      console.error(err);

      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setErrorMessage('Incorrect credentials');
      } else {
        setErrorMessage('Incorrect username or password.');
      }
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
      navigate('/Finalizedlogin');
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='background-booking'>
      <HomePage />

      <div className='booking-container-booking'>
        <div className='booking-content'>
          <p>Please log in to continue with your booking:</p>

          <form>
            <label>
              Email:
              <input type='email' onChange={(e) => setEmail(e.target.value)} />
            </label>
            <label>
              Password:
              <input type='password' onChange={(e) => setPassword(e.target.value)} />
            </label>
            <button type='button' onClick={handleLogin}>
              Login
            </button>
          </form>

          {errorMessage && <p className='error-message'>{errorMessage}</p>}

          <hr className='line-separator' />

          <p className='or-divider'>or</p>

         
          <button type='button' onClick={handleGoogleSignIn} className='google-signin-button'><img src={googleIcon} alt="Google" className="button-icon" />
            Sign In with Google
          </button>

          <p>
            <Link to='/finalizeBooking' className='guest-link'>
              Continue as Guest
            </Link>
          </p>
        </div>
      </div>
      <FooterInfoBox />
    </div>
  );
};

export default Booking;
