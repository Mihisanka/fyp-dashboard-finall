import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, remove, set } from "firebase/database";
import { getStorage } from "firebase/storage";
import firebase from "firebase/compat/app"; 

const firebaseConfig = {
  apiKey: "AIzaSyDqcbWAghpABuVE7gsCX6Eg0X2VkhfDXzk",
  authDomain: "crud-31c78.firebaseapp.com",
  projectId: "crud-31c78",
  storageBucket: "crud-31c78.appspot.com",
  messagingSenderId: "525592678428",
  appId: "1:525592678428:web:5301395b101a6e3d9c8fd9"
};
// Initialize Firebase app
// Initialize Firebase app
const app = initializeApp(firebaseConfig);

// Get a reference to the Firebase Realtime Database service
export const db = getDatabase();

// Get a reference to the Firebase Storage service
export const storage = getStorage(app);

// Define the 'off' function
export const off = (ref, callback) => {
  // Implement your logic for unsubscribing from realtime updates here
};

// Export database functions
export { ref, onValue, set, remove };