
import React, { useState, useEffect } from "react";
import "../styles/AllParkings.css";
import CarItem from "../components/UI/CarItem";
import { db } from "../firebase.js"; // Adjusted import path for firebase.js
import { getDatabase, ref, onValue, remove, update } from "firebase/database"; // Adjusted import for Firebase database functions

// Assuming you're using Firebase v9 modular SDK, which uses `getDatabase` instead of `database`
const database = getDatabase();

// Your component code here


// const [carName, setCarName] = useState("");
// const [category, setcategory] = useState("");
// const [type, settype] = useState("");
// const [groupSize, setgroupSize] = useState("");
// const [rentPrice, setrentPrice] = useState("");
// const [imgUrl, setimgUrl] = useState("");

const Bookings = () => {
  const [InputValues, setInputValues] = useState([]);

  useEffect(() => {
    onValue(ref(db), (snapshot) => {
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
        <div className="booking__car-list" >
          {InputValues?.map((car) => (
            <CarItem item={car} key={car.carName} />
          ))}
        </div>

      </div>
    </div>
  );
};
// {InputValues.map((car) => (
//   <div key={car.id}>
//     <h1>{car.carName}</h1>
//     <Button onClick={() => handleUpdate(car)} variant="primary">Update</Button>
//     <Button onClick={() => handleDelete(car)} variant="danger">Delete</Button>
//   </div>

export default Bookings;