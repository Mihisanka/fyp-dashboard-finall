import "../styles/settings.css";
import { db } from "../firebase";
import React, { useState, useEffect } from "react";
import { set, ref, onValue } from "firebase/database";
import RealtimeManagement from "../components/UI/RealtimeManagement"; // Import RealtimeManagement component

const AddCarPark = () => {
    const [carparkData, setCarparkData] = useState([]);
    const [carparkName, setCarparkName] = useState('');
    const [address, setAddress] = useState('');
    const [capacity, setCapacity] = useState('');
    const [availablility, setAvailablility] = useState('');
    const [price, setPrice] = useState('');
    const [longitude, setLongitude] = useState('');
    const [latitude, setLatitude] = useState('');
    const [count, setCount] = useState(0);
    const [activeButton, setActiveButton] = useState("AddCarPark"); // Set "MyDetails" as default active button
    const [showRealtimeManagement, setShowRealtimeManagement] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const carparkRef = ref(db);
            onValue(carparkRef, (snapshot) => {
                const data = snapshot.val();
                if (data) {
                    const carparkArray = Object.keys(data).map((key) => ({
                        id: key,
                        ...data[key],
                    }));
                    setCarparkData(carparkArray);
                }
            });
        };
        fetchData();
    }, []);

    const incrementCount = () => {
        setCount(count + 1);
    };

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName);
        setShowRealtimeManagement(buttonName === "RealtimeManagement");
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        let numericValue = value.replace(/\D/g, '');

        switch (name) {
            case 'Car Park Name':
                setCarparkName(value);
                break;
            case 'Address':
                setAddress(value);
                break;
            case 'Capacity':
                setCapacity(numericValue);
                break;
            case 'Price':
                setPrice(value);
                break;
            case 'Longitude':
                setLongitude(value);
                break;
            case 'Latitude':
                setLatitude(value);
                break;
            default:
                break;
        }
    };

    const fetchCoordinates = async () => {
        // You need to implement the logic to fetch coordinates based on the address.
        // For example, you can use a geocoding API like Google Maps Geocoding API.
        // This function should set the longitude and latitude states.
    };

    const writeToDatabase = async (e) => {
        e.preventDefault();

        if (!carparkName || !address || !capacity || !price || !longitude || !latitude) {
            alert("Please fill in all fields");
            return;
        }

        await set(ref(db, `/${count}`), {
            carparkName,
            address,
            capacity,
            price,
            longitude,
            latitude,
            uuid: count,
            availability: "available",
        });

        // Show success message
        setSuccessMessage('Car park added successfully.');

        // Reset the input fields after writing to the database
        setCarparkName("");
        setAddress("");
        setCapacity("");
        setPrice("");
        setLongitude("");
        setLatitude("");
        incrementCount();
    };

    return (
        <div className="settings">
            <div className="settings__wrapper">
                <h2 className="AllParkings__title">{activeButton}</h2>
                <div className="manage-parkings_ul-container">
                    <div className="settings__top">
                        <ul className="settings__top">
                            <li className={`nav__link carpark-management ${activeButton === "AddCarPark" ? "nav__active" : ""}`}
                                onClick={() => handleButtonClick("AddCarPark")}>Add Car Park</li>
                            <li className={`nav__link carpark-management ${activeButton === "RealtimeManagement" ? "nav__active" : ""}`}
                                onClick={() => handleButtonClick("RealtimeManagement")}>Realtime Management</li>
                        </ul>
                    </div>
                </div>

                {showRealtimeManagement ? (
                    <RealtimeManagement carparkData={carparkData} /> // Pass carparkData as prop to RealtimeManagement
                ) : (
                    <div className="details__form">
                        <form onSubmit={writeToDatabase}>
                            <div className="form__group">
                                <div>
                                    <label>Car Park Name</label>
                                    <input type="text" name="Car Park Name" placeholder="Nawaloka" onChange={handleChange} value={carparkName} />
                                </div>
                                <div>
                                    <label>Car Park Address</label>
                                    <input type="text" name="Address" placeholder="Nawaloka Car park, Colombo10" onChange={handleChange} value={address} />
                                </div>
                            </div>
                            <div className="form__group">
                                <div>
                                    <label>Capacity</label>
                                    <input type="text" name="Capacity" placeholder="10" onChange={handleChange} value={capacity} />
                                </div>
                                <div>
                                    <label>Price</label>
                                    <div className="formatted-price">Rs.{price}.00</div>
                                    <input type="number" name="Price" placeholder="100" onChange={handleChange} value={price} />
                                </div>
                            </div>
                            <div className="form__group">
                                <div>
                                    <label>Longitude</label>
                                    <input type="text" name="Longitude" placeholder="Longitude" onChange={handleChange} value={longitude} />
                                </div>
                                <div>
                                    <label>Latitude</label>
                                    <input type="text" name="Latitude" placeholder="Latitude" onChange={handleChange} value={latitude} />
                                </div>
                            </div>
                            <div className="form__group">
                                <div className="profile__img-btns">
                                    <button className="primary-button" type="submit" onClick={writeToDatabase}>Add</button>
                                </div>
                            </div>
                        </form>
                        {successMessage && <div className="success-message">{successMessage}</div>}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AddCarPark;
