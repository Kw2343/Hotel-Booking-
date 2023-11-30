import React from 'react';
import './FooterInfoBox.css';
import FacebookIcon from '../assets/Facebook.svg';
import InstagramIcon from '../assets/Instagram.svg';
import LinkedInIcon from '../assets/Linkedin.svg';

function FooterInfoBox() {
  return (
    <div className="footer-info-box">
      <div className="column">
        <h2>How Can We Help?</h2>
        <ul>
          <li><button>Request a Call</button></li>
          <li><a href="/customer-support">Customer Support</a></li>
        </ul>
      </div>
      <div className="column">
        <h2>KW Hotel & Spa resort </h2>
        <p>123 Main Street City, State ZIP Code</p>
       
        <div className="social-icons">
        <a href="https://www.facebook.com"><img src={FacebookIcon} alt="Facebook" /></a>
          <a href="https://www.instagram.com"><img src={InstagramIcon} alt="Instagram" /></a>
          <a href="https://www.linkedin.com"><img src={LinkedInIcon} alt="LinkedIn" /></a>
        </div>
      </div>
      <div className="column">
        <h2>About Us</h2>
        <ul>
          <li><a href="/about-us">About Us</a></li>
          <li><a href="/career">Career</a></li>
          <li><a href="/terms-conditions">Terms & Conditions</a></li>
          
        </ul>
      </div>
    </div>
  );
}

export default FooterInfoBox;
