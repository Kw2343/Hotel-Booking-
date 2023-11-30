import React, { useEffect, useState } from "react";
import HomePage from "./HomePage";
import { ref, getDownloadURL } from "firebase/storage";
import { collection, getDocs, query } from 'firebase/firestore';
import { db, storage } from "../config/firebase";
import "./Home.css";
import "./Spa.css"; 
import FooterInfoBox from './FooterInfoBox';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';


function Spa(props) {
  const [spaList, setSpaList] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const navigate = useNavigate(); 

  const handleSpaBooking = (spa) => {
  console.log(`Booking spa: ${spa.spaType}`); 
  navigate('/book-spa', { state: { spa } }); 
  };

  useEffect(() => {
    const fetchSpaData = async () => {
      const spaCollectionRef = collection(db, "Spa"); // Update to the Spa collection
      const spaQuery = query(spaCollectionRef);
      const spaSnapshot = await getDocs(spaQuery);
      const spas = spaSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSpaList(spas);
    };

    const fetchImageUrls = async () => {
      const urls = [];
      for (const spa of spaList) {
        if (spa.imageLink) {
          try {
            const url = await getDownloadURL(ref(storage, spa.imageLink));
            urls.push({ spaId: spa.id, imageUrl: url });
          } catch (error) {
            console.error(`Error fetching image for spa ${spa.id}: ${error}`);
          }
        }
      }
      setImageUrls(urls);
    };

    fetchSpaData();
    fetchImageUrls();
  }, [spaList]);

  return (
    <div className="spa-background">
      <HomePage />
      <div className="spa">
        <div className="spa-table-container">
          <table className="spa-table">
            <thead>
              <tr>
                <th>Spa Type</th>
                <th>Price</th>
                <th>Description</th>
                <th>Image</th>
                
              </tr>
            </thead>
            <tbody>
              {spaList.map((spa) => (
                <tr key={spa.id}>
                  <td>
                    <Link to={`/spa/${spa.id}`} className="image-link">
                      {imageUrls.map((image) =>
                        image.spaId === spa.id ? (
                          <img
                            src={image.imageUrl}
                            alt={spa.spaType}
                            key={image.spaId}
                            className="small-image1"
                          />
                        ) : null
                      )}
                    </Link>
                  </td>
                  <td>{spa.spaType}</td>
                  <td>${spa.Price}</td>
                  <td className="description">{spa.Description}</td>
                  <td>
                    
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

export default Spa;