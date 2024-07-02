import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, remove, set } from "firebase/database";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// First configuration
const firebaseConfig = {
  apiKey: "AIzaSyC2NQe9YIiKk8qipxrCxPlZkfNfogBePKI",
  authDomain: "car-parking-f9338.firebaseapp.com",
  databaseURL:
    "https://car-parking-f9338-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "car-parking-f9338",
  storageBucket: "car-parking-f9338.appspot.com",
  messagingSenderId: "357367526616",
  appId: "1:357367526616:web:461c0dca8edf47f36053ad",
  measurementId: "G-7Y6Q2PVFZG",
  //measurementId: "G-48XWCTC9Z1",
};

// Second configuration
const firebaseConfig2 = {
  apiKey: "AIzaSyDw_pxSr9SgcuCTUL7G09YUP5PwuYZaOxw",
  authDomain: "fyp-user-use.firebaseapp.com",
  projectId: "fyp-user-use",
  storageBucket: "fyp-user-use.appspot.com",
  messagingSenderId: "861234283293",
  appId: "1:861234283293:web:188189f629b001e38e57f4",
  measurementId: "G-XJRZBF70Q7",
  // apiKey: "AIzaSyDrAzuzBn7smq9wmY5LHiJ4GOFiQM99owQ",
  // authDomain: "fyp-user-user.firebaseapp.com",
  // projectId: "fyp-user-user",
  // storageBucket: "fyp-user-user.appspot.com",
  // messagingSenderId: "708508861343",
  // appId: "1:708508861343:web:3a3ee7951d24ef653433aa",
};

// Initialize Firebase apps
const app1 = initializeApp(firebaseConfig); // Default app
const app2 = initializeApp(firebaseConfig2, "app2");

// Get references to the Firebase services
export const db_admin = getDatabase(app1);
export const db_user = getFirestore(app2); // Use Firestore for user database
export const storage_admin = getStorage(app1);
export const storage_user = getStorage(app2);

// Define the 'off' function
export const off = (ref, callback) => {
  // Implement your logic for unsubscribing from realtime updates here
};

// Export database functions for each app
export { ref, onValue, set, remove };
