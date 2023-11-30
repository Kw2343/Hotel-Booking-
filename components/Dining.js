import React, { useEffect, useState } from "react";
import HomePage from "./HomePage";
import { ref, getDownloadURL } from "firebase/storage";
import { collection, getDocs } from 'firebase/firestore';
import { db, storage } from "../config/firebase";
import "./Home.css";
import "./Dining.css"; 
import FooterInfoBox from './FooterInfoBox';

function Dining() {
  const [diningList, setDiningList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);

  const handleDiningReservation = (dining) => {
    // Add your reservation logic here, e.g., open a reservation form or navigate to a reservation page
    console.log(`Reserving dining: ${dining.diningType}`);
  };

  useEffect(() => {
    const fetchDiningData = async () => {
      const diningCollectionRef = collection(db, "Dining");
      const diningSnapshot = await getDocs(diningCollectionRef);
      const diningItems = diningSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setDiningList(diningItems);
    };

    const fetchImageUrls = async () => {
      const urls = [];
      for (const dining of diningList) {
        if (dining.imageLink) {
          try {
            const url = await getDownloadURL(ref(storage, dining.imageLink));
            urls.push({ diningId: dining.id, imageUrl: url });
          } catch (error) {
            console.error(`Error fetching image for dining ${dining.id}: ${error}`);
          }
        }
      }
      setImageUrls(urls);
    };

    fetchDiningData();
    fetchImageUrls();
  }, [diningList]);

  return (
    <div className="dining-background">
      <HomePage />
      <div className="dining">
        <div className="dining-table-container">
          <table className="dining-table">
            <thead>
              <tr>
                <th>Dining Type</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
              </tr>
            </thead>
            <tbody>
              {diningList.map((dining) => (
                <tr key={dining.id}>
                  <td>
                    {imageUrls.map((image) =>
                      image.diningId === dining.id ? (
                        <img
                          src={image.imageUrl}
                          alt={dining.diningType}
                          key={image.diningId}
                          className="small-image"
                        />
                      ) : null
                    )}
                  </td>
                  <td>{dining.diningType}</td>
                  <td>${dining.Price}</td>
                  <td className="description">{dining.Description}</td>
                  <td>
                    <button onClick={() => handleDiningReservation(dining)} className="Reserve-Button">Reserve</button>
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

export default Dining;

