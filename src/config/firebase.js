// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDpsA-Ro9rn45cwky4vtbdnyy7L8nUDGgA",
    authDomain: "fir-tutorial-57371.firebaseapp.com",
    projectId: "fir-tutorial-57371",
    storageBucket: "fir-tutorial-57371.appspot.com",
    messagingSenderId: "544444666772",
    appId: "1:544444666772:web:984b66525cb28421fbb581",
    measurementId: "G-RSWY7TMH1K"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
export const storage = getStorage(app);