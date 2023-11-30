import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { auth, db } from '../config/firebase';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import './Signup.css';
import HomePage from './HomePage';
import FooterInfoBox from './FooterInfoBox';
import { useUserAuth } from "../context/UserAuthContext";

export const Signup = () => {
  const [name, setName] = useState("");
  const [role, setRole] = useState("user"); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signUp = async () => {
    try {
     
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

   
      const userCollectionRef = collection(db, 'users');
      await addDoc(userCollectionRef, {
        uid: user.uid,
        name: name,
        role: role,
        email: email,
      });
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className='background'>
      <HomePage />
      <div className="signup-container">
        <div className="signup-form">
          <h2 className='title'>Create a new account</h2>
          <input placeholder="Name.." onChange={(e) => setName(e.target.value)} />
          <input placeholder="Email.." onChange={(e) => setEmail(e.target.value)} />
          <input placeholder="Password.." type="password" onChange={(e) => setPassword(e.target.value)} />
          <select onChange={(e) => setRole(e.target.value)} value={role}>
            <option value="user">User</option>
            <option value="guest">Guest</option>
            <option value="admin">Admin</option>
          </select>
          <button onClick={signUp} className="button">Sign Up</button>
        </div>
      </div>
      <FooterInfoBox />
    </div>
  );
};

export default Signup;
