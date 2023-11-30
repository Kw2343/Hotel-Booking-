import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import './PhotoSlider.css';
import Image1 from '../assets/1.jpg';
import Image2 from '../assets/2.jpg';
import Image3 from '../assets/3.jpg';
import Image4 from '../assets/4.jpg';
import Image5 from '../assets/5.jpg';

const PhotoSlider = () => {
  return (
    <div className="photo-slider-container"> 
      <Carousel autoPlay infiniteLoop showThumbs={false} interval={3000}>
        <div>
          <img src={Image1} alt="Image 1" />
          <p className="legend">Deluxe Suite</p>
        </div>
        <div>
          <img src={Image2} alt="Image 2" />
          <p className="legend">Standard Room</p>
        </div>
        <div>
          <img src={Image3} alt="Image 3" />
          <p className="legend">Double Room</p>
        </div>
        <div>
          <img src={Image4} alt="Image 4" />
          <p className="legend">Deluxe Suite</p>
        </div>
        <div>
          <img src={Image5} alt="Image 5" />
          <p className="legend">Suite</p>
        </div>
      </Carousel>
    </div>
  );
};

export default PhotoSlider;
