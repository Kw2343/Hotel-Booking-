import React, { useEffect, useState } from 'react';
import { auth, db } from '../config/firebase';
import './Member.css';

const Member = () => {
  const [user, setUser] = useState(null);
  const [currentDateTime, setCurrentDateTime] = useState('');

  useEffect(() => {
    // Get the current user
    const currentUser = auth.currentUser;
    if (currentUser) {
      setUser(currentUser);
      if (!currentUser.displayName) {
        // If the user's display name is not set, fetch it from Firebase
        fetchDisplayName(currentUser);
      }
    }

    // Update the current date and time every second
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

  // Function to fetch the user's display name from Firebase
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
        {/* Add more content and features specific to your member portal here */}
        <div className="portal-section">
          <h2>Your Membership Details</h2>
          {/* Include fields for user-specific information, e.g., membership level, points, etc. */}
          {/* Example:
          <p>Membership Level: Premium</p>
          <p>Points Earned: 500</p>
          */}
        </div>

        <div className="portal-section">
          <h2>Your Bookings</h2>
          {/* Display a list of user's bookings with details like date, room type, etc. */}
          {/* Example:
          <ul>
            <li>
              <strong>Booking ID:</strong> 12345
              <p><strong>Date:</strong> July 15, 2023</p>
              <p><strong>Room Type:</strong> Single Room</p>
            </li>
            <!-- Add more booking items as needed -->
          </ul>
          */}
        </div>

        <div className="portal-section">
          <h2>Additional Features</h2>
          {/* Include any additional features or actions that users can perform */}
          {/* Example:
          <button className="custom-button">Upgrade Membership</button>
          */}
        </div>
      </div>
    </div>
  );
};

export default Member;
