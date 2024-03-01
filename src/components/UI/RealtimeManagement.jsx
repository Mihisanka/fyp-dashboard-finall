import React, { useState, useEffect } from "react";
import { db, ref, onValue, remove, set } from "../../firebase.js"; // Adjusted path for firebase.js
import "../../styles/tableStyles.css";// Adjusted path for tableStyles.css
import "@fortawesome/fontawesome-free/css/all.css";
import "../../styles/modal.css";

const RealtimeManagement = () => {
    const [carparkData, setCarparkData] = useState([]);
    const [error, setError] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editedCarpark, setEditedCarpark] = useState(null);
    const [updatedCarparkData, setUpdatedCarparkData] = useState({
        // Add latitude and longitude fields to the initial state
        latitude: '',
        longitude: '',
    });

    useEffect(() => {
        const fetchData = () => {
            const carparkRef = ref(db);
            onValue(carparkRef, (snapshot) => {
                try {
                    const data = snapshot.val();
                    console.log("Fetched Data:", data);
                    if (data) {
                        const carparkArray = Object.keys(data).map((key) => ({
                            id: key,
                            ...data[key],
                            availability: data[key].availability === 'available' ? 'available' : 'unavailable',
                        }));
                        setCarparkData(carparkArray);
                        setError(null);
                    } else {
                        setCarparkData([]);
                        setError("No data available");
                    }
                } catch (error) {
                    setError(error.message);
                }
            }, (error) => {
                setError(error.message);
            });
        };


        fetchData();

        const interval = setInterval(fetchData, 5000);

        return () => {
            const carparkRef = ref(db);
            onValue(carparkRef, null);
            clearInterval(interval);
        };
    }, []);

    const handleEdit = (carpark) => {
        setEditedCarpark(carpark);
        setEditModalVisible(true);
        setUpdatedCarparkData(carpark);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedCarparkData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };

    const handleDelete = (id) => {
        console.log("Deleting ID:", id);
        remove(ref(db, id))
            .then(() => {
                console.log("Document successfully deleted!");
                setCarparkData(prevData => prevData.filter(carpark => carpark.id !== id));
            })
            .catch((error) => {
                console.error("Error removing document: ", error);
                setError("Error deleting document");
            });
    };

    const handleSaveChanges = (id, e) => {
        e.stopPropagation();
        if (editedCarpark && Object.keys(updatedCarparkData).length > 0) {
            console.log("Updated Carpark Data:", updatedCarparkData);
            const carparkRef = ref(db, id);
            set(carparkRef, updatedCarparkData) // Use set instead of update for partial updates
                .then(() => {
                    console.log("Document successfully updated!");
                    setCarparkData(prevData =>
                        prevData.map(carpark =>
                            carpark.id === editedCarpark.id ? { ...carpark, ...updatedCarparkData } : carpark
                        )
                    );
                    setEditedCarpark(null);
                    setUpdatedCarparkData({});
                    setEditModalVisible(false); // Close the modal after successful update
                })
                .catch((error) => {
                    console.error("Error updating document: ", error);
                    setError("Error updating document");
                });
        }
    };
    
    return (
        <div className="park_item">
            {error && <div>Error: {error}</div>}
            <link
                rel="stylesheet"
                href="https://maxcdn.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css"
                integrity="sha384-GJzZqFGwb1QTTN6wy59ffF1BuGJpLSa9DkKMp0DgiMDm4iYMj70gZWKYbI706tWS"
                crossOrigin="anonymous"
            />
            <table className="table table-striped table-bordered table-hover">
                <thead>
                    <tr>
                        <th>Car Park Name</th>
                        <th>Address</th>
                        <th>Capacity</th>
                        <th>Price</th>
                        <th>Availability</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody className="table-hover">
                    {carparkData.map((carpark) => (
                        <tr key={carpark.id}>
                            <td>{carpark.carparkName}</td>
                            <td>{carpark.address}</td>
                            <td>{carpark.capacity}</td>
                            <td>{carpark.price}</td>
                            <td className={carpark.availability === 'available' ? 'available' : 'unavailable'}>
                                {carpark.availability}
                            </td>
                            <td>
                                <i className="icon fas fa-edit" onClick={() => handleEdit(carpark)}></i>
                                <i className="delete-icon fas fa-trash-alt" onClick={() => handleDelete(carpark.id)}></i>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editModalVisible && (
                <div className="modal1">
                    <div className="modal1-content">
                        <span className="close1" onClick={() => setEditModalVisible(false)}>&times;</span>
                        <h2>Edit Carpark</h2>
                        <div className="form-group">
                            <label htmlFor="carparkName">Carpark Name:</label>
                            <input
                                type="text"
                                id="carparkName"
                                name="carparkName"
                                className="form-control"
                                value={updatedCarparkData.carparkName || editedCarpark.carparkName}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="address">Address:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                className="form-control"
                                value={updatedCarparkData.address || editedCarpark.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="capacity">Capacity:</label>
                            <input
                                type="number"
                                id="capacity"
                                name="capacity"
                                className="form-control"
                                value={updatedCarparkData.capacity || editedCarpark.capacity}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="price">Price:</label>
                            <input
                                type="text"
                                id="price"
                                name="price"
                                className="form-control"
                                value={updatedCarparkData.price || editedCarpark.price}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="availability">Availability:</label>
                            <select
                                id="availability"
                                name="availability"
                                className="form-control"
                                value={updatedCarparkData.availability || editedCarpark.availability}
                                onChange={handleInputChange}
                            >
                                <option value="available">Available</option>
                                <option value="unavailable">Unavailable</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="latitude">Latitude:</label>
                            <input
                                type="text"
                                id="latitude"
                                name="latitude"
                                className="form-control"
                                value={updatedCarparkData.latitude || editedCarpark.latitude}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="longitude">Longitude:</label>
                            <input
                                type="text"
                                id="longitude"
                                name="longitude"
                                className="form-control"
                                value={updatedCarparkData.longitude || editedCarpark.longitude}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button className="btn btn-primary" onClick={(e) => handleSaveChanges(editedCarpark.id, e)}>Save Changes</button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RealtimeManagement;
