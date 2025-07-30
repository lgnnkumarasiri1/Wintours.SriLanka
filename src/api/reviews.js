// src/api/reviews.js

import { db } from '../firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore'; // Import getDocs

// Function to add a review to Firestore
export const addReview = async (reviewData) => {
  try {
    // Use the collection and addDoc functions
    const docRef = await addDoc(collection(db, "reviews"), reviewData);
    console.log('Review added with ID: ', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error adding review: ', error);
    return { success: false, error };
  }
};

export const getReviews = async () => {
  try {
    const reviewsCollection = collection(db, "reviews");
    const reviewSnapshot = await getDocs(reviewsCollection);
    const reviewList = reviewSnapshot.docs.map(doc => ({
      id: doc.id, // Include the document ID if needed
      ...doc.data()
    }));
    return { success: true, data: reviewList };
  } catch (error) {
    console.error("Error fetching reviews: ", error);
    return { success: false, error };
  }
}