 // Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAQOEXEgxZKKMKVFGJp6xHUBaAJgRnnYmY",
  authDomain: "wintours-feedback.firebaseapp.com",
  projectId: "wintours-feedback",
  storageBucket: "wintours-feedback.appspot.com",
  messagingSenderId: "735234878012",
  appId: "1:735234878012:web:0b2c6a9ba9b9b9b9b9b9b9",
  measurementId: "G-MEASUREMENT_ID"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);
export { db };