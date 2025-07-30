// src/firebase.js

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; // Import getFirestore
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAGcAERT8N9LqFqJK9YBqiiLKRu7HlGSCI",
  authDomain: "wintours-767d3.firebaseapp.com",
  projectId: "wintours-767d3",
  storageBucket: "wintours-767d3.firebasestorage.app",
  messagingSenderId: "3942084079",
  appId: "1:3942084079:web:9fcf4429c5cb3e08d6da1a",
  measurementId: "G-819CY2J9Z8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get a reference to the Firestore database
export const db = getFirestore(app); // Use getFirestore to get the database instance

// Get Analytics (optional, depending on if you need it)
const analytics = getAnalytics(app);
