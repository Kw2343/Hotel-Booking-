import React, { useEffect, useState } from "react";
import { Auth } from './Auth';
import { db, auth, storage } from "../config/firebase";
import { getDocs, collection, addDoc, deleteDoc, updateDoc, doc } from 'firebase/firestore';
import { ref, uploadBytes } from "firebase/storage";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import "./Admin.css";
import { signOut } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';


function Admin() {
  const [roomList, setRoomList] = useState([]);
  const [spaList, setSpaList] = useState([]);
  const [newSpaId, setNewSpaId] = useState("");

  // New room states
  const [newroomType, setNewRoomType] = useState("");
  const [newPrice, setNewPrice] = useState(0);
  const [newDescription, setDescription] = useState("");
  const [newRoomId, setNewRoomId] = useState("");
  const [newRoomQuantity, setNewRoomQuantity] = useState(0);
  const [updatedRoomType, setUpdatedRoomType] = useState("");

  const roomTypes = ["Single Room", "Standard Room" ,"Double Room", "Suite", "Deluxe Suite","Family Room"];


  
  const [spaType, setSpaType] = useState("");
  const [newSpaType, setNewSpaType] = useState("");
  const [spaPrice, setSpaPrice] = useState(0);
  const [spaDescription, setSpaDescription] = useState("");
  const [spaFileUpload, setSpaFileUpload] = useState(null);


  // File Upload state
  const [fileUpload, setFileUpload] = useState(null);
  const [authenticated, setAuthenticated] = useState(false);
  const [loginHidden, setLoginHidden] = useState(false);

  const roomCollectionRef = collection(db, "Hotel rooms");
  const spaCollectionRef = collection(db, "Spa");
  const diningCollectionRef = collection(db, "Dining");
  const teamCollectionRef = collection(db, "Team");
 

  const [diningList, setDiningList] = useState([]);
  const [newDiningType, setNewDiningType] = useState("");
  const [newDiningPrice, setNewDiningPrice] = useState(0);
  const [newDiningDescription, setNewDiningDescription] = useState("");
  const [diningFileUpload, setDiningFileUpload] = useState(null);
  const [updatedDiningType, setUpdatedDiningType] = useState("");
  const [newDiningId, setNewDiningId] = useState(""); 

  const [teamList, setTeamList] = useState([]);
  const [newTeamMemberName, setNewTeamMemberName] = useState("");
  const [newTeamMemberJobTitle, setNewTeamMemberJobTitle] = useState("");
  const [teamMemberFileUpload, setTeamMemberFileUpload] = useState(null);
  const [updatedTeamMemberJobTitle, setUpdatedTeamMemberJobTitle] = useState("");



  useEffect(() => {
    getRoomList();
    getSpaList();
    // Check if the user is authenticated
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setAuthenticated(true);
        setLoginHidden(true); 
      } else {
        setAuthenticated(false);
      }
    });
    return () => unsubscribe();
  }, []);

  const getRoomList = async () => {
    try {
      const data = await getDocs(roomCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setRoomList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const getSpaList = async () => {
    try {
      const data = await getDocs(spaCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setSpaList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  const getDiningList = async () => {
    try {
      const data = await getDocs(diningCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setDiningList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };
  
  useEffect(() => {
    getDiningList();
  }, []);

  const onSubmitDining = async () => {
    try {
      if (diningFileUpload) {
        const fileRef = ref(storage, `dining/${diningFileUpload.name}`);
        await uploadBytes(fileRef, diningFileUpload);
      }

      if (newDiningId < 0 || newDiningPrice < 0) {
        console.error('Dining ID and Price must not be negative.');
        return;
      }
  
      const diningData = {
        diningType: newDiningType,
        DiningID: newDiningId,
        Price: newDiningPrice,
        Description: newDiningDescription,
        userId: auth?.currentUser?.uid,
        imageLink: diningFileUpload ? `dining/${diningFileUpload.name}` : null,
      };
  
      await addDoc(diningCollectionRef, diningData);
  
      setNewDiningType("");
      setNewDiningId("");
      setNewDiningPrice(0);
      setNewDiningDescription("");
      setDiningFileUpload(null);
      getDiningList();
  
      // Refresh the page
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  
      
  const deleteDining = async (id) => {
  const diningDoc = doc(db, "Dining", id);
  await deleteDoc(diningDoc);
  getDiningList(); 
  };

  const updateDiningType = async (id) => {
    const diningDoc = doc(db, "Dining", id);
    await updateDoc(diningDoc, { diningType: updatedDiningType });
    getDiningList(); 
  };

  const uploadDiningFile = async () => {
    if (!diningFileUpload) return;
    const filesFolderRef = ref(storage, `dining/${diningFileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, diningFileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getRoomList();
  }, []);

  const onSubmitRoom = async () => {
    try {
      if (fileUpload) {
        const fileRef = ref(storage, `hotel-rooms/${fileUpload.name}`);
        await uploadBytes(fileRef, fileUpload);
      }
      if (newRoomId < 0 || newRoomQuantity < 0 || newPrice < 0) {
        console.error('Room ID, Quantity, and Price must not be negative.');
        return;
      }
  
      const roomData = {
        roomType: newroomType,
        Price: newPrice,
        Description: newDescription,
        userId: auth?.currentUser?.uid,
        imageLink: fileUpload ? `hotel-rooms/${fileUpload.name}` : null,
        RoomID: newRoomId, 
        Quantity: newRoomQuantity,
      };
      
      await addDoc(roomCollectionRef, roomData);
  
    
    setNewRoomType("");
    setNewPrice(0);
    setDescription("");
    setFileUpload(null);
    setNewRoomId(""); 
    setNewRoomQuantity(0); 

      // Refresh the room list
      getRoomList();

      // Refresh the page
    window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const onSubmitSpa = async () => {
    try {
      if (spaFileUpload) {
        const fileRef = ref(storage, `spa/${spaFileUpload.name}`);
        await uploadBytes(fileRef, spaFileUpload);
      }

      if (newSpaId < 0 || spaPrice < 0) {
        console.error('Spa ID and Price must not be negative.');
        return;
      }
  
      const spaData = {
        spaType: spaType,
        SpaID: newSpaId,
        Price: spaPrice,
        Description: spaDescription,
        userId: auth?.currentUser?.uid,
        imageLink: spaFileUpload ? `spa/${spaFileUpload.name}` : null,
      };
  
      await addDoc(spaCollectionRef, spaData);
  
      setSpaType("");
      setNewSpaId("");
      setSpaPrice(0);
      setSpaDescription("");
      setSpaFileUpload(null);
  
      getRoomList();
  
      // Refresh the page
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };
  
  const [updatedSpaType, setUpdatedSpaType] = useState("");

  const deleteSpa = async (id) => {
    const spaDoc = doc(db, "Spa", id);
    await deleteDoc(spaDoc);
    getSpaList(); // Refresh the spa list after deletion
  };
  
  const updateSpaType = async (id) => {
    const spaDoc = doc(db, "Spa", id);
    await updateDoc(spaDoc, { spaType: updatedSpaType });
    getSpaList(); // Refresh the spa list after updating
  };

  const deleteRoom = async (id) => {
    const roomDoc = doc(db, "Hotel rooms", id);
    await deleteDoc(roomDoc);
    getRoomList(); // Refresh the room list after deletion
  };

  const updateRoomType = async (id) => {
    const roomDoc = doc(db, "Hotel rooms", id);
    await updateDoc(roomDoc, { roomType: updatedRoomType });
    getRoomList(); // Refresh the room list after updating
  };

  const uploadFile = async () => {
    if (!fileUpload) return;
    const filesFolderRef = ref(storage, `hotel-rooms/${fileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, fileUpload);
    } catch (err) {
      console.error(err);
    }
  };

  const navigate = useNavigate();
  const handleLogout = async () => {
    try {
      await signOut(auth);
      // Redirect to the Auth component after logout
      navigate('/auth');
    } catch (err) {
      console.error(err);
    }
  };

  const getTeamList = async () => {
    try {
      const data = await getDocs(teamCollectionRef);
      const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
      setTeamList(filteredData);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getTeamList();
  }, []);

  const onSubmitTeamMember = async () => {
    try {
      if (teamMemberFileUpload) {
        const fileRef = ref(storage, `team/${teamMemberFileUpload.name}`);
        await uploadBytes(fileRef, teamMemberFileUpload);
      }

      const teamMemberData = {
        name: newTeamMemberName,
        jobTitle: newTeamMemberJobTitle,
        userId: auth?.currentUser?.uid,
        imageLink: teamMemberFileUpload ? `team/${teamMemberFileUpload.name}` : null,
      };

      await addDoc(teamCollectionRef, teamMemberData);

      setNewTeamMemberName("");
      setNewTeamMemberJobTitle("");
      setTeamMemberFileUpload(null);

      getTeamList();

      
      window.location.reload();
    } catch (err) {
      console.error(err);
    }
  };

  const deleteTeamMember = async (id) => {
    const teamMemberDoc = doc(db, "Team", id);
    await deleteDoc(teamMemberDoc);
    getTeamList(); // Refresh the team member list after deletion
  };

  const updateTeamMemberJobTitle = async (id) => {
    const teamMemberDoc = doc(db, "Team", id);
    await updateDoc(teamMemberDoc, { jobTitle: updatedTeamMemberJobTitle });
    getTeamList(); // Refresh the team member list after updating
  };
  const uploadTeamMemberFile = async () => {
    if (!teamMemberFileUpload) return;
    const filesFolderRef = ref(storage, `team/${teamMemberFileUpload.name}`);
    try {
      await uploadBytes(filesFolderRef, teamMemberFileUpload);
    } catch (err) {
      console.error(err);
    }
  };
  

  return (
    <div className="app auth-container">
      {loginHidden ? null : <Auth />}
      <div>
        
      </div>
      <Tabs>
        <TabList>
          <Tab >Rooms</Tab>
          <Tab>Spa</Tab>
          <Tab>Dining</Tab> 
          <Tab>Team Members</Tab>
          <button onClick={handleLogout} className="log-out">Logout</button>
          
        </TabList>
        <TabPanel>
            <div className="Rooms">
              <select className="select-box" onChange={(e) => setNewRoomType(e.target.value)} value={newroomType}>
                <option value="" >Select Room Type</option>
                {roomTypes.map((type, index) => (
                  <option key={index} value={type} className="select-option">
                    {type}
                  </option>
                ))}
              </select>
              <input placeholder="Room ID..." className="admin-input" onChange={(e) => setNewRoomId(e.target.value)} />
              <input placeholder="Quantity..." type="number" className="admin-input" onChange={(e) => setNewRoomQuantity(Number(e.target.value))} />
              <input placeholder="Price..." type="number" className="admin-input" onChange={(e) => setNewPrice(Number(e.target.value))} />
              <input placeholder="Description..." className="admin-input" onChange={(e) => setDescription(e.target.value)} />
              <input type="file" className="admin-browse-button" onChange={(e) => setFileUpload(e.target.files[0])} />
              <button className="admin-browse-button" onClick={onSubmitRoom}>Submit</button>
            </div>
            <div>
              {roomList.map((room) => (
                <div key={room.id}>
                  <h1>{room.roomType}</h1>
                  <p>Room ID: {room.RoomID}</p>
                  <p>Price: {room.Price}</p>
                  <p>Description: {room.Description}</p>
                  <button onClick={() => deleteRoom(room.id)}>Delete Room</button>
                  <select onChange={(e) => setUpdatedRoomType(e.target.value)} value={updatedRoomType}>
                    <option value="">Select Room Type</option>
                    {roomTypes.map((type, index) => (
                      <option key={index} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                  <button onClick={() => updateRoomType(room.id)}>Update Room Type</button>
                </div>
              ))}
            </div>
         
          </TabPanel>
          <TabPanel>
          <div>
    <select className="select-box" onChange={(e) => setSpaType(e.target.value)} value={spaType}>
      <option value="">Select Spa Type</option>
      <option value="Aromatherapy">Aromatherapy</option>
      <option value="30 mins Facial Spa">30 mins Facial Spa</option>
      <option value="Hot stone massage therapy">Hot stone massage therapy</option>
      <option value="60 mins Facial Spa">60 mins Facial Spa</option>
      <option value="Massage Therapy">Massage Therapy</option>
    </select>
    <input placeholder="Spa ID..." className="admin-input" onChange={(e) => setNewSpaId(e.target.value)} />
    <input placeholder="Price..." type="number" className="admin-input" onChange={(e) => setSpaPrice(Number(e.target.value))} />
    <input placeholder="Description..." className="admin-input" onChange={(e) => setSpaDescription(e.target.value)} />
    <input type="file" className="admin-browse-button" onChange={(e) => setSpaFileUpload(e.target.files[0])} />
    <button className="admin-browse-button" onClick={onSubmitSpa}>Submit</button>
  </div>
  <div>
    {spaList.map((spa) => (
      <div key={spa.id}>
        <h1>{spa.spaType}</h1>
        <p>Spa ID: {spa.SpaID}</p>
        <p>Price: {spa.Price}</p>
        <p>Description: {spa.Description}</p>
        <button onClick={() => deleteSpa(spa.id)}>Delete Spa</button>
        <select onChange={(e) => setUpdatedSpaType(e.target.value)} value={updatedSpaType}>
          <option value="">Select Spa Type</option>
          <option value="Aromatherapy">Aromatherapy</option>
          <option value="30 mins Facial Spa">30 mins Facial Spa</option>
          <option value="Hot stone massage therapy">Hot stone massage therapy</option>
          <option value="60 mins Facial Spa">60 mins Facial Spa</option>
          <option value="Massage Therapy">Massage Therapy</option>
        </select>
        <button onClick={() => updateSpaType(spa.id)}>Update Spa Type</button>
      </div>
    ))}
  </div>
 
</TabPanel>


<TabPanel>
  <div>
    <select className="select-box" onChange={(e) => setNewDiningType(e.target.value)} value={newDiningType}>
      <option value="">Select Dining Type</option>
      <option value="Breakfast Buffet">Breakfast Buffet</option>
      <option value="Lunch Buffet">Lunch Buffet</option>
      <option value="Dinner Buffet">Dinner Buffet</option>
    </select>
    <input placeholder="Dining ID..." className="admin-input" onChange={(e) => setNewDiningId(e.target.value)} />
    <input placeholder="Price..." type="number" className="admin-input" onChange={(e) => setNewDiningPrice(Number(e.target.value))} />
    <input placeholder="Description..." className="admin-input" onChange={(e) => setNewDiningDescription(e.target.value)} />
    <input type="file" className="admin-browse-button" onChange={(e) => setDiningFileUpload(e.target.files[0])} />
    <button className="admin-browse-button" onClick={onSubmitDining}>Submit</button>
  </div>
  <div>
    {diningList.map((dining) => (
      <div key={dining.id}>
        <h1>{dining.diningType}</h1>
        <p>Dining ID: {dining.DiningID}</p>
        <p>Price: {dining.Price}</p>
        <p>Description: {dining.Description}</p>
        <button onClick={() => deleteDining(dining.id)}>Delete Dining</button>
        <select onChange={(e) => setUpdatedDiningType(e.target.value)} value={updatedDiningType}>
          <option value="">Select Dining Type</option>
          <option value="Breakfast Buffet">Breakfast Buffet</option>
          <option value="Lunch Buffet">Lunch Buffet</option>
          <option value="Dinner Buffet">Dinner Buffet</option>
        </select>
        <button onClick={() => updateDiningType(dining.id)}>Update Dining Type</button>
      </div>
    ))}
  </div>

</TabPanel>


<TabPanel>
          <div>
            <input
              placeholder="Team Member Name..."
              className="admin-input"
              onChange={(e) => setNewTeamMemberName(e.target.value)}
            />
            <input
              placeholder="Job Title..."
              className="admin-input"
              onChange={(e) => setNewTeamMemberJobTitle(e.target.value)}
            />
          
            <input
              type="file"
              className="admin-browse-button"
              onChange={(e) => setTeamMemberFileUpload(e.target.files[0])}
            />
            <button className="admin-browse-button" onClick={onSubmitTeamMember}>
              Submit
            </button>
          </div>
          <div>
            {teamList.map((teamMember) => (
              <div key={teamMember.id}>
                <h1>{teamMember.name}</h1>
                <p>Job Title: {teamMember.jobTitle}</p>
                <button onClick={() => deleteTeamMember(teamMember.id)}>
                  Delete Team Member
                </button>
                <input
                  placeholder="Update job title..."
                  onChange={(e) => setUpdatedTeamMemberJobTitle(e.target.value)}
                />
                <button onClick={() => updateTeamMemberJobTitle(teamMember.id)}>
                  Update Job Title
                </button>
              </div>
            ))}
          </div>
          
        </TabPanel>
      </Tabs>
    </div>
  );
}

export default Admin;
