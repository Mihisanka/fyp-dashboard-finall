import React, { useState, useEffect } from "react";
import "../styles/AllParkings.css";
import CarItem from "../components/UI/CarItem";
import { db_admin } from "../firebase.js"; // Adjusted import path for firebase.js
import { getDatabase, ref, onValue, remove, update } from "firebase/database"; // Adjusted import for Firebase database functions

// Assuming you're using Firebase v9 modular SDK, which uses `getDatabase` instead of `database`
const database = getDatabase();

const Bookings = () => {
  const [InputValues, setInputValues] = useState([]);

  useEffect(() => {
    onValue(ref(db_admin), (snapshot) => {
      setInputValues([]);
      const data = snapshot.val();
      if (data !== null) {
        Object.values(data).map((carName) => {
          setInputValues((oldArray) => [...oldArray, carName]);
        });
      }
    });
  }, []);
  return (
    <div className="AllParkings">
      <div className="AllParkings__wrapper">
        <h2 className="AllParkings__title">All Parkings</h2>
        <div className="AllParkings__list" >
          {InputValues?.map((car) => (
            <CarItem item={car} key={car.carName} />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Bookings;