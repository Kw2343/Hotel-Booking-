import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import './Member.css';

const Member = () => {
  const [user, setUser] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
 
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      if (!currentUser.displayName) {
      
        fetchDisplayName(currentUser);
      }
    }

    
    const updateTime = () => {
      const now = new Date();
      setCurrentDateTime(now.toLocaleString());
    };
    updateTime();
    const intervalId = setInterval(updateTime, 1000);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  
  const fetchDisplayName = async (currentUser) => {
    try {
      const userDoc = await db.collection('users').doc(currentUser.uid).get();
      if (userDoc.exists) {
        const userData = userDoc.data();
        setUser({
          ...currentUser,
          displayName: userData.displayName,
        });
      }
    } catch (error) {
      console.error('Error fetching display name:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      window.location.href = '/login';
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
      <div className="member-container">
      <div className="member-header">
        <div className="logout-button">
          {user && <button onClick={handleLogout} className="buttonlogout">Logout</button>}
        </div>
        <div className="member-user-info">
          {user && (
            <div className="user-welcome">
              <h1>Welcome, {user.displayName || 'Member'}!</h1>
            </div>
          )}
        </div>
        
        <div className="date-time">
          <p>{currentDateTime}</p>
        </div>
      </div>
      <div className="member-content">
       
        <div className="portal-section">
          <h2>Your Membership Details</h2>
        
        </div>

        <div className="portal-section">
          <h2>Your Bookings</h2>
      
        </div>

        <div className="portal-section">
          <h2>Additional Features</h2>
        
        </div>
      </div>
    </div>
  );
};

export default Member;
