import React, { useEffect, useState } from "react";
import { useUserAuth } from "../context/UserAuthContext";
import { ref, getDownloadURL } from "firebase/storage";
import { collection, getDocs, query } from 'firebase/firestore';
import { db, storage } from "../config/firebase";
import "./Home.css";
import "./Room.css";
import FooterInfoBox from './FooterInfoBox';
import { Timestamp } from 'firebase/firestore';
import HomePage from './HomePage';
import { Link } from 'react-router-dom';


function Room(props) {
  const { isAuthorized, bookedRooms, setBookedRooms, user } = useUserAuth();
  const [roomList, setRoomList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleRoomBooking = async (room) => {
    if (isAuthorized) {
      try {
        // Proceed with booking logic
        const bookingData = {
          roomType: room.roomType,
          price: room.Price,
          description: room.Description,
          userId: 'user_id_here', 
          timestamp: Timestamp.fromDate(new Date()), 
        };

        // Update booked rooms
        setBookedRooms((prevBookedRooms) => [...prevBookedRooms, room]);

        console.log('Booking successful! Booking Data: ', bookingData);
      } catch (error) {
        console.error('Error booking room:', error);
      }
    } else {
      // Redirect or show a message indicating the user needs to log in
      console.log('User is not logged in. Redirect or show a message.');
    }
  };

  useEffect(() => {
    const fetchRoomData = async () => {
      const roomCollectionRef = collection(db, "Hotel rooms");
      const roomQuery = query(roomCollectionRef);
      const roomSnapshot = await getDocs(roomQuery);
      const rooms = roomSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setRoomList(rooms);
    };

    const fetchImageUrls = async () => {
      const urls = [];
      for (const room of roomList) {
        if (room.imageLink) {
          try {
            const url = await getDownloadURL(ref(storage, room.imageLink));
            urls.push({ roomId: room.id, imageUrl: url });
          } catch (error) {
            console.error(`Error fetching image for room ${room.id}: ${error}`);
          }
        }
      }
      setImageUrls(urls);
    };

    fetchRoomData();
    fetchImageUrls();
  }, [roomList]);

  return (
    <div className="room-background">
      <HomePage />
      <div className="room">
        <div className="room-table-container">
          <table className="room-table">
            <thead>
              <tr>
                <th>Room Type</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
                {isAuthorized && <th>Action</th>}
              </tr>
            </thead>
            <tbody>
            {roomList.map((room) => (
  <tr key={room.id}>
    <td>
      <Link to={`/room/${room.id}`} className="image-link">
        {imageUrls.map((image) =>
          image.roomId === room.id ? (
            <img
              src={image.imageUrl}
              alt={room.roomType}
              key={image.roomId}
              className="small-image"
            />
          ) : null
        )}
      </Link>
    </td>
    <td>{room.roomType}</td>
    <td>${room.Price}</td>
    <td className="description">{room.Description}</td>
    <td>
      {isAuthorized && (
        <button onClick={() => handleRoomBooking(room)} className="Book-Button">
          Book
        </button>
      )}
    </td>
  </tr>
))}
            </tbody>
          </table>
        </div>
      </div>
      <FooterInfoBox />
    </div>
  );
}

export default Room;