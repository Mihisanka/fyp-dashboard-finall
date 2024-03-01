import "../styles/dashboard.css";
import SingleCard from "../components/reuseable/SingleCard";
import MileChart from "../charts/MileChart";
import CarStatsChart from "../charts/CarStatsChart";
import RecommendCarCard from "../components/UI/RecommendCarCard";
import recommendCarsData from "../assets/dummy-data/recommendCars";
import React, { useState, useEffect } from "react";
import { db, ref, onValue } from "../firebase.js";
// import CarItem from "../components/UI/CarItem";


const carObj = {
  title: "Total Parkings",
  totalNumber: 0, // Initialize with 0
  icon: "ri-police-car-line",
};

const availableObj = {
  title: "Available Parkings",
  totalNumber: 0, // Initialize with 0
  icon: "ri-steering-2-line",
};

const unavailableObj = {
  title: "Unavailable Parkings", // Changed the title to reflect unavailable parkings
  totalNumber: 0, // Initialize with 0
  icon: "ri-user-line", // Updated the icon to match
};

const distanceObj = {
  title: "Total Slots",
  totalNumber: 1000,
  icon: "ri-timer-flash-line",
};

const Dashboard = () => {
  const [error, setError] = useState(null);
  const [updatedCarObj, setUpdatedCarObj] = useState(carObj); // State to hold updated car object
  const [availableCount, setAvailableCount] = useState(0); // State to hold the count of available data
  const [unavailableCount, setUnavailableCount] = useState(0); // State to hold the count of unavailable data

  useEffect(() => {
    const fetchData = () => {
      const carparkRef = ref(db);
      onValue(carparkRef, (snapshot) => {
        try {
          const data = snapshot.val();
          console.log("Fetched Data:", data); // Log the retrieved data
          if (data) {
            let totalCapacity = 0; // Initialize total capacity
            let availableDataCount = 0; // Initialize available data count
            let unavailableDataCount = 0; // Initialize unavailable data count

            // Loop through each UUID
            Object.values(data).forEach((carpark) => {
              // Convert capacity to integer
              const capacity = parseInt(carpark.capacity) || 0; // If capacity is null or not a number, set it to 0
              totalCapacity += capacity; // Add capacity to total

              // Check if the data is available
              if (carpark.availability === "available") {
                availableDataCount++; // Increment available data count
              } else {
                unavailableDataCount++; // Increment unavailable data count
              }
            });

            // Update carObj with total capacity
            const updatedCarObj = {
              ...carObj,
              totalNumber: totalCapacity,
            };
            setUpdatedCarObj(updatedCarObj);

            // Update available count
            setAvailableCount(availableDataCount);

            // Update unavailable count
            setUnavailableCount(unavailableDataCount);

          } else {
            setError("No data available"); // Set error if no data is found
          }
        } catch (error) {
          setError(error.message); // Set error if there's an exception
        }
      }, (error) => {
        setError(error.message); // Set error if there's an error with onValue listener
      });

    };
             
    fetchData();

    // Fetch data every 5 seconds
    const interval = setInterval(fetchData, 5000);

    return () => {
        // Unsubscribe from Firebase listener when component unmounts
        const carparkRef = ref(db);
        onValue(carparkRef, null);
        clearInterval(interval); // Clear interval to stop fetching data
    };
  }, []);


///available parking shoe in the dashboard 

// const [InputValues, setInputValues] = useState([]);

// useEffect(() => {
//   onValue(ref(db), (snapshot) => {
//     setInputValues([]);
//     const data = snapshot.val();
//     if (data !== null) {
//       Object.values(data).map((carName) => {
//         setInputValues((oldArray) => [...oldArray, carName]);
//       });
//     }
//   });
// }, [setInputValues]);
 

  return (
    <div className="dashboard">
      <div className="dashboard__wrapper">
        <div className="dashboard__cards">
          <SingleCard item={updatedCarObj} /> {/* Render the updated carObj */}
          <SingleCard item={{ ...availableObj, totalNumber: availableCount }} /> {/* Render the availableObj with updated count */}
          <SingleCard item={{ ...unavailableObj, totalNumber: unavailableCount }} /> {/* Render the unavailableObj with updated count */}
          <SingleCard item={distanceObj} />
        </div>

        <div className="statics">
          <div className="stats">
            <h3 className="stats__title">User Statistics</h3>
            <MileChart />
          </div>

          <div className="stats">
            <h3 className="stats__title">Parking Statistics</h3>
            <CarStatsChart />
          </div>
        </div>

        <div className="recommend__cars-wrapper">
          {recommendCarsData.map((item) => (
            <RecommendCarCard item={item} key={item.id} />
          ))}
          
           {/* {InputValues?.map((car) => (
            <CarItem item={car} key={car.carName} />
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
