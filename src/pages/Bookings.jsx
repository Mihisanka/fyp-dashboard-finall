// import React, { useState, useEffect } from "react";
// import { db_user } from "../firebase.js";
// import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
// import "../styles/tableStyles.css";
// import "../styles/modal.css";

// const Bookings = () => {
//     const [bookingData, setBookingData] = useState([]);
//     const [error, setError] = useState(null);
//     const [filters, setFilters] = useState({
//         Email: "",
//         Name: "",
//         ParkingSlotName: "",
//         TimeSlot: "",
//         VehicleNumber: ""
//     });
//     const [selectedBooking, setSelectedBooking] = useState(null);
//     const [updatedBooking, setUpdatedBooking] = useState({});
//     const [parkingSlotProbabilities, setParkingSlotProbabilities] = useState({});

//////////////

//     useEffect(() => {
//         const fetchBookings = async () => {
//             try {
//                 const bookingCollection = collection(db_user, "booking");
//                 const bookingSnapshot = await getDocs(bookingCollection);
//                 const bookingList = [];
//                 bookingSnapshot.forEach((doc) => {
//                     const data = doc.data();
//                     const bookingDate = data.BookingDate ? data.BookingDate.toDate() : null; // Convert Firestore Timestamp to Date object
//                     bookingList.push({ id: doc.id, ...data, BookingDate: bookingDate }); // Include BookingDate in the object
//                 });
//                 setBookingData(bookingList);
//                 setError(null);
//             } catch (error) {
//                 console.error("Error fetching bookings: ", error);
//                 setError("Error fetching bookings");
//             }
//         };

//         fetchBookings();

//         const interval = setInterval(fetchBookings, 5000);

//         return () => clearInterval(interval);
//     }, []);

//     useEffect(() => {
//         if (bookingData.length > 0) {
//             calculateParkingSlotProbabilities();
//         }
//     }, [bookingData]);

//     const calculateParkingSlotProbabilities = () => {
//         const slotCounts = bookingData.reduce((acc, booking) => {
//             acc[booking.ParkingSlotName] = (acc[booking.ParkingSlotName] || 0) + 1;
//             return acc;
//         }, {});

//         const totalBookings = bookingData.length;

//         const probabilities = Object.keys(slotCounts).reduce((acc, slot) => {
//             acc[slot] = ((slotCounts[slot] / totalBookings) * 100).toFixed(2) + "%";
//             return acc;
//         }, {});

//         setParkingSlotProbabilities(probabilities);
//         console.log("Parking Slot Probabilities:", probabilities);
//     };

//////////////

//     const handleDelete = async (id) => {
//         try {
//             await deleteDoc(doc(db_user, "booking", id));
//             setBookingData((prevData) => prevData.filter((booking) => booking.id !== id));
//             console.log("Document successfully deleted!");
//         } catch (error) {
//             console.error("Error removing document: ", error);
//             setError("Error deleting document");
//         }
//     };

//     const handleEdit = (booking) => {
//         setSelectedBooking(booking);
//         setUpdatedBooking({ ...booking });
//     };

//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setUpdatedBooking({ ...updatedBooking, [name]: value });
//     };

//     const handleCancelEdit = () => {
//         setSelectedBooking(null);
//         setUpdatedBooking({});
//     };

//     const handleUpdate = async () => {
//         try {
//             await updateDoc(doc(db_user, "booking", selectedBooking.id), updatedBooking);
//             const updatedBookingList = bookingData.map((booking) =>
//                 booking.id === selectedBooking.id ? updatedBooking : booking
//             );
//             setBookingData(updatedBookingList);
//             setSelectedBooking(null);
//             console.log("Document successfully updated!");
//         } catch (error) {
//             console.error("Error updating document: ", error);
//             setError("Error updating document");
//         }
//     };

//     const handleFilterChange = (e) => {
//         const { name, value } = e.target;
//         setFilters({ ...filters, [name]: value });
//     };

//     const formatDate = (timestamp) => {
//         if (!timestamp) return ""; // Handle null or undefined timestamp
//         const date = new Date(timestamp);
//         return date.toLocaleDateString();
//     };

//     const formatTime = (timestamp) => {
//         if (!timestamp) return ""; // Handle null or undefined timestamp
//         const date = new Date(timestamp);
//         return date.toLocaleTimeString();
//     };

//     const filteredBookings = bookingData.filter((booking) => {
//         for (let key in filters) {
//             if (booking[key] && booking[key].toLowerCase().includes(filters[key].toLowerCase())) {
//                 continue;
//             } else {
//                 return false;
//             }
//         }
//         return true;
//     });

//     return (
//         <div className="settings">
//             <div className="settings__wrapper">
//                 {error && <div>Error: {error}</div>}
//                 <div className="filters">
//                     <input type="text" className="form-control" name="Email" value={filters.Email} onChange={handleFilterChange} placeholder="Filter by Email" />
//                     <input type="text" className="form-control" name="Name" value={filters.Name} onChange={handleFilterChange} placeholder="Filter by Name" />
//                     <input type="text" className="form-control" name="ParkingSlotName" value={filters.ParkingSlotName} onChange={handleFilterChange} placeholder="Filter by Parking Slot" />
//                     <input type="text" className="form-control" name="TimeSlot" value={filters.TimeSlot} onChange={handleFilterChange} placeholder="Filter by Time Slot" />
//                     <input type="text" className="form-control" name="VehicleNumber" value={filters.VehicleNumber} onChange={handleFilterChange} placeholder="Filter by Vehicle Number" />
//                 </div>
//                 <table className="table table-striped table-bordered table-hover">
//                     <thead>
//                         <tr>
//                             <th>Username</th>
//                             <th>Email</th>
//                             <th>Parking Slot</th>
//                             <th>Time Slot</th>
//                             <th>Vehicle Number</th>
//                             <th>Booking Date</th>
//                             <th>Booking Time</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody className="table-hover">
//                         {filteredBookings.map((booking) => (
//                             <tr key={booking.id}>
//                                 <td>{booking.Name}</td>
//                                 <td>{booking.Email}</td>
//                                 <td>{booking.ParkingSlotName}</td>
//                                 <td>{booking.TimeSlot}</td>
//                                 <td>{booking.VehicleNumber}</td>
//                                 <td>{formatDate(booking.BookingDate)}</td>
//                                 <td>{formatTime(booking.BookingDate)}</td>
//                                 <td>
//                                     <i className="delete-icon fas fa-trash-alt" onClick={() => handleDelete(booking.id)}></i>
//                                     <i className="edit-icon fas fa-edit" onClick={() => handleEdit(booking)}></i>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//                 {selectedBooking && (
//                     <div className="modal">
//                         <div className="modal-content">
//                             <span className="close" onClick={handleCancelEdit}>&times;</span>
//                             <h2>Edit Booking</h2>
//                             <div>
//                                 <label>Email:</label>
//                                 <input type="text" name="Email" value={updatedBooking.Email} onChange={handleInputChange} />
//                             </div>
//                             <div>
//                                 <label>Name:</label>
//                                 <input type="text" name="Name" value={updatedBooking.Name} onChange={handleInputChange} />
//                             </div>
//                             <div>
//                                 <label>Parking Slot:</label>
//                                 <input type="text" name="ParkingSlotName" value={updatedBooking.ParkingSlotName} onChange={handleInputChange} />
//                             </div>
//                             <div>
//                                 <label>Time Slot:</label>
//                                 <input type="text" name="TimeSlot" value={updatedBooking.TimeSlot} onChange={handleInputChange} />
//                             </div>
//                             <div>
//                                 <label>Vehicle Number:</label>
//                                 <input type="text" name="VehicleNumber" value={updatedBooking.VehicleNumber} onChange={handleInputChange} />
//                             </div>
//                             <button onClick={handleCancelEdit}>Cancel</button>
//                             <button onClick={handleUpdate}>Update</button>
//                         </div>
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Bookings;

import React, { useState, useEffect } from "react";
import { db_user } from "../firebase.js";
import { collection, getDocs, deleteDoc, doc, updateDoc } from "firebase/firestore";
import "../styles/tableStyles.css";
import "../styles/modal.css";
import MLIntegration from "./MLIntegration";

const Bookings = () => {
    const [bookingData, setBookingData] = useState([]);
    const [error, setError] = useState(null);
    const [filters, setFilters] = useState({
        Email: "",
        Name: "",
        ParkingSlotName: "",
        TimeSlot: "",
        VehicleNumber: ""
    });
    const [selectedBooking, setSelectedBooking] = useState(null);
    const [updatedBooking, setUpdatedBooking] = useState({});

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const bookingCollection = collection(db_user, "booking");
                const bookingSnapshot = await getDocs(bookingCollection);
                const bookingList = [];
                bookingSnapshot.forEach((doc) => {
                    const data = doc.data();
                    const bookingDate = data.BookingDate ? data.BookingDate.toDate() : null; // Convert Firestore Timestamp to Date object
                    bookingList.push({ id: doc.id, ...data, BookingDate: bookingDate }); // Include BookingDate in the object
                });
                setBookingData(bookingList);
                setError(null);
            } catch (error) {
                console.error("Error fetching bookings: ", error);
                setError("Error fetching bookings");
            }
        };

        fetchBookings();

        const interval = setInterval(fetchBookings, 5000);

        return () => clearInterval(interval);
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteDoc(doc(db_user, "booking", id));
            setBookingData((prevData) => prevData.filter((booking) => booking.id !== id));
            console.log("Document successfully deleted!");
        } catch (error) {
            console.error("Error removing document: ", error);
            setError("Error deleting document");
        }
    };

    const handleEdit = (booking) => {
        setSelectedBooking(booking);
        setUpdatedBooking({ ...booking });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedBooking({ ...updatedBooking, [name]: value });
    };

    const handleCancelEdit = () => {
        setSelectedBooking(null);
        setUpdatedBooking({});
    };

    const handleUpdate = async () => {
        try {
            await updateDoc(doc(db_user, "booking", selectedBooking.id), updatedBooking);
            const updatedBookingList = bookingData.map((booking) =>
                booking.id === selectedBooking.id ? updatedBooking : booking
            );
            setBookingData(updatedBookingList);
            setSelectedBooking(null);
            console.log("Document successfully updated!");
        } catch (error) {
            console.error("Error updating document: ", error);
            setError("Error updating document");
        }
    };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters({ ...filters, [name]: value });
    };

    const formatDate = (timestamp) => {
        if (!timestamp) return ""; // Handle null or undefined timestamp
        const date = new Date(timestamp);
        return date.toLocaleDateString();
    };

    const formatTime = (timestamp) => {
        if (!timestamp) return ""; // Handle null or undefined timestamp
        const date = new Date(timestamp);
        return date.toLocaleTimeString();
    };

    const filteredBookings = bookingData.filter((booking) => {
        for (let key in filters) {
            if (booking[key] && booking[key].toLowerCase().includes(filters[key].toLowerCase())) {
                continue;
            } else {
                return false;
            }
        }
        return true;
    });

    return (
        <div className="settings">
            <div className="settings__wrapper">
                {error && <div>Error: {error}</div>}
                <div className="filters">
                    <input type="text" className="form-control" name="Email" value={filters.Email} onChange={handleFilterChange} placeholder="Filter by Email" />
                    <input type="text" className="form-control" name="Name" value={filters.Name} onChange={handleFilterChange} placeholder="Filter by Name" />
                    <input type="text" className="form-control" name="ParkingSlotName" value={filters.ParkingSlotName} onChange={handleFilterChange} placeholder="Filter by Parking Slot" />
                    <input type="text" className="form-control" name="TimeSlot" value={filters.TimeSlot} onChange={handleFilterChange} placeholder="Filter by Time Slot" />
                    <input type="text" className="form-control" name="VehicleNumber" value={filters.VehicleNumber} onChange={handleFilterChange} placeholder="Filter by Vehicle Number" />
                </div>
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Parking Slot</th>
                            <th>Time Slot</th>
                            <th>Vehicle Number</th>
                            <th>Booking Date</th>
                            <th>Booking Time</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">
                        {filteredBookings.map((booking) => (
                            <tr key={booking.id}>
                                <td>{booking.Name}</td>
                                <td>{booking.Email}</td>
                                <td>{booking.ParkingSlotName}</td>
                                <td>{booking.TimeSlot}</td>
                                <td>{booking.VehicleNumber}</td>
                                <td>{formatDate(booking.BookingDate)}</td>
                                <td>{formatTime(booking.BookingDate)}</td>
                                <td>
                                    <i className="delete-icon fas fa-trash-alt" onClick={() => handleDelete(booking.id)}></i>
                                    <i className="edit-icon fas fa-edit" onClick={() => handleEdit(booking)}></i>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                {selectedBooking && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={handleCancelEdit}>&times;</span>
                            <h2>Edit Booking</h2>
                            <div>
                                <label>Email:</label>
                                <input type="text" name="Email" value={updatedBooking.Email} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Name:</label>
                                <input type="text" name="Name" value={updatedBooking.Name} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Parking Slot:</label>
                                <input type="text" name="ParkingSlotName" value={updatedBooking.ParkingSlotName} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Time Slot:</label>
                                <input type="text" name="TimeSlot" value={updatedBooking.TimeSlot} onChange={handleInputChange} />
                            </div>
                            <div>
                                <label>Vehicle Number:</label>
                                <input type="text" name="VehicleNumber" value={updatedBooking.VehicleNumber} onChange={handleInputChange} />
                            </div>
                            <button onClick={handleCancelEdit}>Cancel</button>
                            <button onClick={handleUpdate}>Update</button>
                        </div>
                    </div>
                )}
            </div>

            <MLIntegration db_user={db_user} />

        </div>
    );
};

export default Bookings;
