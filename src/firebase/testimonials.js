import { db } from './config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp,
  serverTimestamp 
} from 'firebase/firestore';
// Collection reference
const testimonialsCollection = collection(db, 'testimonials');
// Add a new testimonial
export const addTestimonial = async (testimonialData) => {
  try {
    // Add a server timestamp to ensure proper ordering
    const docRef = await addDoc(testimonialsCollection, {
      ...testimonialData,
      createdAt: serverTimestamp()
    });
    // Return the data with the ID to immediately use in the UI
    return { 
      success: true, 
      id: docRef.id,
      // Return the testimonial data with the new ID for immediate use
      testimonial: {
        ...testimonialData,
        id: docRef.id
      }
    };
  } catch (error) {
    console.error("Error adding testimonial: ", error);
    return { success: false, error };
  }
};
// Get all testimonials
export const getTestimonials = async () => {
  try {
    console.log("Fetching testimonials from Firestore...");
    // Create a query against the collection ordered by timestamp
    const q = query(testimonialsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    // Log the number of documents found
    console.log(`Found ${querySnapshot.size} testimonials in Firestore`);
    const testimonials = [];
    querySnapshot.forEach((doc) => {
      // For each document, get the data and add the ID
      const data = doc.data();
      // Convert Firestore Timestamp to regular date if it exists
      const processedData = {
        ...data,
        id: doc.id,
        // Ensure the timestamp is in the expected format if it exists
        ...(data.createdAt && { 
          timestamp: data.createdAt.toDate().toISOString() 
        })
      };
      testimonials.push(processedData);
    });
    console.log("Processed testimonials:", testimonials);
    return testimonials;
  } catch (error) {
    console.error("Error getting testimonials from Firestore:", error);
    return [];
  }
};