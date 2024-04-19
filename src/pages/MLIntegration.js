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
  const [parkingSlotRatings, setParkingSlotRatings] = useState({});

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
      fetchRatings();
    }
  }, [bookingData]);

  const fetchRatings = async () => {
    try {
      const ratingsCollection = collection(db_user, "ratings");
      const ratingsSnapshot = await getDocs(ratingsCollection);
      const ratingsData = {};
      ratingsSnapshot.forEach((doc) => {
        const data = doc.data();
        const { ParkingSlotName, Rating } = data;
        if (ParkingSlotName in ratingsData) {
          ratingsData[ParkingSlotName].push(Rating);
        } else {
          ratingsData[ParkingSlotName] = [Rating];
        }
      });
      setParkingSlotRatings(ratingsData);
      updateReportCollection(ratingsData);
    } catch (error) {
      console.error("Error fetching ratings: ", error);
    }
  };

  const updateReportCollection = async (ratingsData) => {
    try {
      for (const [parkingSlotName, ratings] of Object.entries(ratingsData)) {
        const reportRef = doc(db_user, "report", parkingSlotName);
        const reportSnapshot = await getDoc(reportRef);

        const ratingsAsString = ratings.join(", "); // Convert ratings array to a string

        const reportData = {
          timestamp: new Date().toISOString(),
          ratings: ratingsAsString,
        };

        if (reportSnapshot.exists()) {
          // If the document already exists, update it
          await updateDoc(reportRef, reportData);
          console.log("Report collection updated successfully!");
        } else {
          // If the document doesn't exist, create it
          await setDoc(reportRef, reportData);
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
