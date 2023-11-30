// SpaProduct.js
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getDownloadURL, ref } from 'firebase/storage';
import { collection, doc, getDoc } from 'firebase/firestore';
import { db, storage } from '../config/firebase';
import HomePage from './HomePage';
import FooterInfoBox from './FooterInfoBox';
import './SpaProduct.css';

function SpaProduct() {
  const { spaId } = useParams();
  const [spa, setSpa] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);

  useEffect(() => {
    const fetchSpaDetails = async () => {
      try {
        const spaDocRef = doc(db, 'Spa', spaId);
        const spaDocSnapshot = await getDoc(spaDocRef);

        if (spaDocSnapshot.exists()) {
          setSpa({ id: spaDocSnapshot.id, ...spaDocSnapshot.data() });
        } else {
          console.error(`Spa with ID ${spaId} does not exist`);
        }
      } catch (error) {
        console.error('Error fetching spa details:', error);
      }
    };

    const fetchSpaImage = async () => {
      try {
        // Replace 'imageLink' with the actual field in your data that stores the image URL or identifier
        const imageUrl = await getDownloadURL(ref(storage, spa.imageLink));
        setImageUrl(imageUrl);
      } catch (error) {
        console.error(`Error fetching image for spa ${spaId}:`, error);
      }
    };

    if (spaId) {
      fetchSpaDetails();
    }

    if (spa && spa.imageLink) {
      fetchSpaImage();
    }
  }, [spaId, spa]);

  if (!spa) {
    return <div>Loading...</div>;
  }

  return (
    <div className="spa-product-container">
      <HomePage />
      <div className="spa-details">
        <table>
          <tbody>
            <tr>
              <td>
                {imageUrl && <img src={imageUrl} alt={spa.spaType} className="spa-image" />}
              </td>
              <td>
                <h1>{spa.spaType}</h1>
                <p>Price: ${spa.Price}</p>
                <p>Description: {spa.Description}</p>
                <input type="number" className="quantity-input" placeholder="Quantity" />
                <button className='book-button'>Book</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <FooterInfoBox />
    </div>
  );
}

export default SpaProduct;