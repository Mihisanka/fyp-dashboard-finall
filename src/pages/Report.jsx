import React, { useState, useEffect } from 'react';
import { db_user } from '../firebase.js';
import { collection, getDocs } from 'firebase/firestore';
import MLIntegration from './MLIntegration';
import { PDFViewer } from '@react-pdf/renderer';
import PDFDocument from '../assets/PDFDocument.js';

const ReportData = () => {
  const [reportData, setReportData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const reportCollection = collection(db_user, 'report');
        const reportSnapshot = await getDocs(reportCollection);
        const reportList = [];
        reportSnapshot.forEach((doc) => {
          const data = doc.data();
          reportList.push({ id: doc.id, ...data });
        });
        setReportData(reportList);
        setError(null);
      } catch (error) {
        console.error('Error fetching report data: ', error);
        setError('Error fetching report data');
      }
    };

    fetchReportData();

    // Set interval to fetch report data every 5 seconds
    const interval = setInterval(fetchReportData, 5000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  const handlePDFClick = (report) => {
    setSelectedRow(report);
  };

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
              <th>Ratings</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody className="table-hover">
            {reportData.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.timestamp}</td>
                <td>{report.probability}</td>
                <td>{report.ratings}</td>
                <td>
                  <i className="fa-solid fa-file-pdf" onClick={() => handlePDFClick(report)} style={{ cursor: 'pointer' }}></i>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <MLIntegration db_user={db_user} />
      {selectedRow && (
        <div style={{ width: '100%', height: '100vh' }}>
          <PDFViewer style={{ width: '100%', height: '100%' }}>
            <PDFDocument selectedRow={selectedRow} />
          </PDFViewer>
        </div>
      )}
    </div>
  );
};

export default ReportData;
