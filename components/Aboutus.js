import React, { useEffect, useState } from "react";
import HomePage from "./HomePage";
import { collection, getDocs } from "firebase/firestore";
import { db, storage } from "../config/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import FooterInfoBox from "./FooterInfoBox";
import "./Aboutus.css";

function AboutUs() {
  const [teamList, setTeamList] = useState([]);

  useEffect(() => {
    const fetchTeamData = async () => {
      try {
        const teamCollectionRef = collection(db, "Team"); // Use the correct collection name
        const teamSnapshot = await getDocs(teamCollectionRef);
        const teamMembers = teamSnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));

        // Fetch image URLs for each team member
        const teamMembersWithImages = await Promise.all(
          teamMembers.map(async (teamMember) => {
            if (teamMember.imageLink) {
              try {
                const imageUrl = await getDownloadURL(ref(storage, teamMember.imageLink));
                return { ...teamMember, imageUrl };
              } catch (error) {
                console.error(`Error fetching image for ${teamMember.name}: ${error}`);
                return teamMember;
              }
            } else {
              return teamMember;
            }
          })
        );

        setTeamList(teamMembersWithImages);
      } catch (error) {
        console.error(`Error fetching team data: ${error}`);
      }
    };

    fetchTeamData();
  }, []);

  return (
    <div>
    <div className="about-us">
      <HomePage />
      <h1>About Our Company</h1>
      <p>
        Welcome to KW Hotel and Spa Resort! We are a passionate team dedicated to providing high-quality products/services to our customers.
      </p>

      <h2>Our Mission</h2>
      <p>
        Our mission is to enhance the well-being of our customers by delivering innovative and sustainable solutions. We strive to make a positive impact on the world through our products and services.
      </p>

      <h2>Our Team</h2>
      <p>
        Meet our team of experts who work diligently to make our vision a reality. We have a diverse and talented group of individuals.
      </p>
      <div className="team-grid">
        {teamList.map((teamMember) => (
          <div key={teamMember.id} className="team-member">
            {teamMember.imageUrl && (
              <img src={teamMember.imageUrl} alt={teamMember.name} className="team-member-image" />
            )}
            <h3>{teamMember.name}</h3>
            <p>{teamMember.jobTitle}</p>
          </div>
        ))}
      </div>
      <h2>Company History</h2>
      <p className="history">
        Our company was founded in 2022 by Kelvin. The journey began with a passion for travel and a dream to create a serene and inspiring space where people from around the world could rejuvenate and unwind. While traveling, Kelvin explored various corners of the globe and discovered the untapped beauty of nature and the demand for relaxation and wellness.
      </p>
      <h2>Contact Us</h2>
      <p>
        If you have any questions or would like to get in touch with us, please feel free to contact us at <a href="mailto:contact@kw.com" className="email">contact@kw.com</a>
      </p>
      </div>
      <FooterInfoBox />
     
      
    </div>
    

  );
}

export default AboutUs;
