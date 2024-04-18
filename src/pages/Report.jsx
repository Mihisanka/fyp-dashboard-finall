import React, { useState, useEffect } from "react";
import { db_user } from "../firebase.js";
import { collection, getDocs } from "firebase/firestore";
import MLIntegration from "./MLIntegration";

const ReportData = () => {
    const [reportData, setReportData] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchReportData = async () => {
            try {
                const reportCollection = collection(db_user, "report");
                const reportSnapshot = await getDocs(reportCollection);
                const reportList = [];
                reportSnapshot.forEach((doc) => {
                    const data = doc.data();
                    reportList.push({ id: doc.id, ...data });
                });
                setReportData(reportList);
                setError(null);
            } catch (error) {
                console.error("Error fetching report data: ", error);
                setError("Error fetching report data");
            }
        };

        fetchReportData();

        // Set interval to fetch report data every 5 seconds
        const interval = setInterval(fetchReportData, 5000);

        // Clear interval on component unmount
        return () => clearInterval(interval);
    }, []); // Empty dependency array ensures this effect runs only once on component mount

    return (
        <div className="settings">
            <div className="settings__wrapper">
                {error && <div>Error: {error}</div>}
                <table className="table table-striped table-bordered table-hover">
                    <thead>
                        <tr>
                            <th>Parking Slot</th>
                            <th>Timestamp</th>
                            <th>Probability</th>
                        </tr>
                    </thead>
                    <tbody className="table-hover">
                        {reportData.map((report) => (
                            <tr key={report.id}>
                                <td>{report.id}</td>
                                <td>{report.timestamp}</td>
                                <td>{report.probability}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <MLIntegration db_user={db_user} />
        </div>
    );
};

export default ReportData;
