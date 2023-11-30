import Home from './components/Home';
import Admin from './components/Admin'
import React, { useEffect, useState } from "react";
import { Auth } from './components/Auth';
import {db} from "./config/firebase";
import {getDocs, collection} from 'firebase/firestore';
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Room from './components/Room';
import Login from './components/Login';
import Spa from './components/Spa';
import Dining from './components/Dining';
import AboutUs from './components/Aboutus';
import {Signup}  from './components/Signup';
import Member from './components/Member';
import { UserAuthContextProvider , useUserAuth} from "./context/UserAuthContext";
import BookSpa from './components/BookSpa';
import RoomProduct from './components/RoomProduct';
import SpaProduct from './components/SpaProduct';
import Booking from './components/Booking';
import Finalizedlogin from './components/Finalizedlogin';

const ProtectedRoute = ({ children, authorized }) => {
  const { user } = useUserAuth();

  console.log("Check user in Private: ", user);
  if (!user || !authorized) {
    return <Navigate to="/login" />;
  }
  return children;
};


function App() {
  const [roomList, setRoomList] = useState([]); 
  useEffect(() => {
    const roomCollectionRef = collection(db, "Hotel rooms");

    const fetchRoomData = async () => {
      try {
        const data = await getDocs(roomCollectionRef);
        const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
        setRoomList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    fetchRoomData();
  }, []);

  return (
  <UserAuthContextProvider>
  <div className="App" >
  <BrowserRouter>
  <Routes>
  <Route exact path='/' element={<Home />}/>
  <Route path='/auth' element={<Auth />}/> 
  <Route path='/admin' element={<Admin />}/>
  <Route path="/hotel" element={<Room roomList={roomList} />} />
  <Route path="/room/:roomId" element={<RoomProduct />} />
  <Route path="/spa/:spaId" element={<SpaProduct />} /> 
  <Route path='/login' element={< Login/>}/>
  <Route path='/spa' element={< Spa/>}/>
  <Route path="/book-spa" element={<BookSpa />} />
  <Route path='/dining' element={< Dining/>}/>
  <Route path='/aboutus' element={< AboutUs/>}/>
  <Route path='/signup' element={< Signup/>}/>
  <Route path='/member' element={< Member/>}/>
  <Route path='/booking' element={< Booking/>}/>
  <Route path='/Finalizedlogin' element={< Finalizedlogin/>}/>


 

 


  </Routes>
  </BrowserRouter>
  </div>
  </UserAuthContextProvider>

  );
 }

 export default App;