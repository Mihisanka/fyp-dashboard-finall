import React, { useState, useEffect } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc,
  setDoc,
} from "firebase/firestore";
import { db_user } from "../firebase.js";

const MLIntegration = ({ db_user }) => {
  const [bookingData, setBookingData] = useState([]);
  const [parkingSlotProbabilities, setParkingSlotProbabilities] = useState({});

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const bookingCollection = collection(db_user, "booking");
        const bookingSnapshot = await getDocs(bookingCollection);
        const bookingList = [];
        bookingSnapshot.forEach((doc) => {
          const data = doc.data();
          const bookingDate = data.BookingDate
            ? data.BookingDate.toDate()
            : null; // Convert Firestore Timestamp to Date object
          bookingList.push({ id: doc.id, ...data, BookingDate: bookingDate }); // Include BookingDate in the object
        });
        setBookingData(bookingList);
      } catch (error) {
        console.error("Error fetching bookings: ", error);
      }
    };

    fetchBookings();

    const interval = setInterval(fetchBookings, 5000);

    return () => clearInterval(interval);
  }, [db_user]);

  useEffect(() => {
    if (bookingData.length > 0) {
      calculateParkingSlotProbabilities();
    }
  }, [bookingData]);

  const calculateParkingSlotProbabilities = () => {
    const slotCounts = bookingData.reduce((acc, booking) => {
      acc[booking.ParkingSlotName] = (acc[booking.ParkingSlotName] || 0) + 1;
      return acc;
    }, {});

    const totalBookings = bookingData.length;

    const probabilities = Object.keys(slotCounts).reduce((acc, slot) => {
      acc[slot] = ((slotCounts[slot] / totalBookings) * 100).toFixed(2) + "%";
      return acc;
    }, {});

    setParkingSlotProbabilities(probabilities);
    console.log("Parking Slot Probabilities:", probabilities);

    // Update the report collection with the calculated probabilities
    updateReportCollection(Object.entries(probabilities));
  };

  const updateReportCollection = async (parkingSlotProbabilities) => {
    try {
      for (const [parkingSlotName, probability] of parkingSlotProbabilities) {
        const reportRef = doc(db_user, "report", parkingSlotName);
        const reportSnapshot = await getDoc(reportRef);

        if (reportSnapshot.exists()) {
          // If the document already exists, update it
          await updateDoc(reportRef, {
            timestamp: new Date().toISOString(),
            probability: probability,
          });
          console.log("Report collection updated successfully!");
        } else {
          // If the document doesn't exist, create it
          await setDoc(reportRef, {
            timestamp: new Date().toISOString(),
            probability: probability,
          });
          console.log("New report document created successfully!");
        }
      }
    } catch (error) {
      console.error("Error updating report collection: ", error);
    }
  };

  return null; // No need to render anything from this component
};

export default MLIntegration;
