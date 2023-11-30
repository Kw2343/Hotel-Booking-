import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { auth, googleProvider } from '../config/firebase';
import { signInWithEmailAndPassword,signInWithPopup, signOut, sendPasswordResetEmail } from 'firebase/auth';
import './Login.css';
import HomePage from './HomePage';
import FooterInfoBox from './FooterInfoBox';
import googleIcon from '../assets/Google.svg'; 
import emailIcon from '../assets/Email.svg'; 



export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [showResetEmailInput, setShowResetEmailInput] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null); 

  const navigate = useNavigate();

  console.log(auth?.currentUser?.photoURL);

  const signIn = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      localStorage.setItem('userLoggedIn', 'true');
      navigate('/Member');
    } catch (err) {
      console.error(err);
  
      if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found') {
        setErrorMessage("Incorrect admin credentials");
      } else {
        setErrorMessage("Incorrect admin username or password.");
      }
    }
  };

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      navigate('/Member');
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem('userLoggedIn');
    } catch (err) {
      console.error(err);
    }
  };

  const resetPassword = async () => {
    try {
      await sendPasswordResetEmail(auth, resetEmail);
      console.log("Password reset email sent successfully.");
    } catch (err) {
      console.error("Error sending password reset email: ", err);
    }
  };

  const toggleResetEmailInput = () => {
    setShowResetEmailInput(!showResetEmailInput);
  };

  return (
   <div> <HomePage />
    
    <div className="login-container">
      
      <div className="login-form">
        <input placeholder="Email.." onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Password.." type="password" onChange={(e) => setPassword(e.target.value)} />
        <button onClick={signIn} className="button">
  <img src={emailIcon} alt="Email" className="button-icon" /> Sign in with Email</button>
        <button onClick={signInWithGoogle} className="button"><img src={googleIcon} alt="Google" className="button-icon" />Sign in with Google</button>
        {showResetEmailInput ? (
  <div className="reset-password-input">
    <input
      placeholder="Email for Password Reset.."
      onChange={(e) => setResetEmail(e.target.value)}
    />
    <button onClick={resetPassword} className="button1">Send</button>
  </div>
) : (
  <button onClick={toggleResetEmailInput} className="button">Reset Password</button>
)}
      </div>
    
    </div>
    <FooterInfoBox />
    </div>
  );
};
export default Login;
