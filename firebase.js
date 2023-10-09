// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDZljUJTvJn9uQGx41gcV4nPEN2pxe1cxI",
  authDomain: "fir-auth-338ef.firebaseapp.com",
  projectId: "fir-auth-338ef",
  storageBucket: "fir-auth-338ef.appspot.com",
  messagingSenderId: "474364695055",
  appId: "1:474364695055:web:c9cf3c585b59be9137497a"
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);
export const FIREBASE_DB = getFirestore(FIREBASE_APP);