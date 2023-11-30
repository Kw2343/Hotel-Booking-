import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from 'firebase/firestore';
import {getStorage} from "firebase/storage";

const firebaseConfig = {
    apiKey: "AIzaSyDyzKz7W8K4EQr_nGzYom1aZVXNWBI0ug0",
    authDomain: "hotel-a84c9.firebaseapp.com",
    projectId: "hotel-a84c9",
    storageBucket: "hotel-a84c9.appspot.com",
    messagingSenderId: "51297349243",
    appId: "1:51297349243:web:4126c259a8bb6d058a3cde",
    measurementId: "G-S5DE2JH48V"
};


const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage =getStorage(app);