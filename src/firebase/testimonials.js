 import { db } from './config';
import { 
  collection, 
  addDoc, 
  getDocs, 
  query, 
  orderBy, 
  Timestamp 
} from 'firebase/firestore';
// Collection reference
const testimonialsCollection = collection(db, 'testimonials');
// Add a new testimonial
export const addTestimonial = async (testimonialData) => {
  try {
    const docRef = await addDoc(testimonialsCollection, {
      ...testimonialData,
      createdAt: Timestamp.now()
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error("Error adding testimonial: ", error);
    return { success: false, error };
  }
};
// Get all testimonials
export const getTestimonials = async () => {
  try {
    const q = query(testimonialsCollection, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    const testimonials = [];
    querySnapshot.forEach((doc) => {
      testimonials.push({ id: doc.id, ...doc.data() });
    });
    return testimonials;
  } catch (error) {
    console.error("Error getting testimonials: ", error);
    return [];
  }
};