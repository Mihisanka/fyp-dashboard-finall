import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "../pages/Dashboard";
import AllParkings from "../pages/AllParkings";
import Summry from "../pages/Summry";
import Settings from "../pages/Settings";
import AddCarPark from "../pages/AddCarPark";
import Mapcomponent from "../pages/Mapcomponent";
import Bookings from "../pages/Bookings";
import Report from "../pages/Report"
import Login from "../pages/Login";

//import User from "./users/User";

function Router() {
  return (
    <div>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/dashboard" element={<Dashboard />} />}
        />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/AllParkings" element={<AllParkings />} />
        <Route path="/Summry" element={<Summry />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/AddCarPark" element={<AddCarPark />} />
        <Route path="/Mapcomponent" element={<Mapcomponent />} />
        <Route path="/Bookings" element={<Bookings />} />
        <Route path="/Report" element={<Report />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </div>
  );
}

export default Router;
