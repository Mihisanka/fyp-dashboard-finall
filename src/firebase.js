import { initializeApp } from "firebase/app";
import { getDatabase, ref, onValue, remove, set } from "firebase/database";
import { getStorage } from "firebase/storage";
// import firebase from "E:/4 year/FYP_SLTC/Codes/Dashboard/fyp-Dashborad-fainall/src/firebase.js";

const firebaseConfig = {
  apiKey: "AIzaSyCOZVGBBTUmQC-M9sroX2y5QKJ_sQK_NDQ",
  authDomain: "dashboard-fyp-cf016.firebaseapp.com",
  projectId: "dashboard-fyp-cf016",
  storageBucket: "dashboard-fyp-cf016.appspot.com",
  messagingSenderId: "268600986524",
  appId: "1:268600986524:web:731f83a7d8a3a7026a9659",
  measurementId: "G-4LPEW81K1L"
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
