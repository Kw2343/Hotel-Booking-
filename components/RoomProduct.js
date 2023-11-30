import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../config/firebase';
import HomePage from './HomePage';
import FooterInfoBox from './FooterInfoBox';
import './RoomProduct.css'; 
import { Link } from 'react-router-dom';

function RoomProduct() {
  const { roomId } = useParams();
  const [room, setRoom] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchRoomDetails = async () => {
      try {
        const roomDocRef = doc(db, 'Hotel rooms', roomId);
        const roomDocSnapshot = await getDoc(roomDocRef);

        if (roomDocSnapshot.exists()) {
          setRoom({ id: roomDocSnapshot.id, ...roomDocSnapshot.data() });
        } else {
          console.error(`Room with ID ${roomId} does not exist`);
        }
      } catch (error) {
        console.error('Error fetching room details:', error);
      }
    };

    const fetchRoomImage = async () => {
      try {
        // Replace 'imageLink' with the actual field in your data that stores the image URL or identifier
        const imageUrl = await getDownloadURL(ref(storage, room.imageLink));
        setImageUrl(imageUrl);
      } catch (error) {
        console.error(`Error fetching image for room ${roomId}:`, error);
      }
    };

    if (roomId) {
      fetchRoomDetails();
    }

    if (room && room.imageLink) {
      fetchRoomImage();
    }
  }, [roomId, room]);

  if (!room) {
    return <div>Loading...</div>;
  }

  return (
    <div className="room-product-container">
      <HomePage />
      <div className="room-details">
        <table>
          <tbody>
            <tr>
              <td>
                {imageUrl && <img src={imageUrl} alt={room.roomType} className="room-image" />}
              </td>
              <td>
                <h1>{room.roomType}</h1>
                <p>Price: ${room.Price}</p>
                <p>Description: {room.Description}</p>
                <input type="number" className="quantity-input" placeholder="Quantity" />
                <Link to="/booking"><button className="book-button">Book</button></Link>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <FooterInfoBox />
    </div>
  );
}

export default RoomProduct;
