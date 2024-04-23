import React, { useState, useEffect, useRef } from "react";
import ApexCharts from 'apexcharts'
import { collection, getDocs } from "firebase/firestore";
import { db_user } from "../firebase.js";

const MileChart = () => {
  const [reportData, setReportData] = useState([]);
  const [error, setError] = useState(null);
  const chartRef = useRef(null); // Ref to store chart instance

  useEffect(() => {
    const fetchReportData = async () => {
      try {
        const reportCollection = collection(db_user, "report");
        const reportSnapshot = await getDocs(reportCollection);
        const reportList = [];
        reportSnapshot.forEach((doc) => {
          const data = doc.data();
          reportList.push({
            id: doc.id,
            probability: data.probability,
            ...data,
          });
          console.log("mile chart pro :", data.probability);
        });
        setReportData(reportList);
        setError(null);
      } catch (error) {
        console.error("Error fetching report data: ", error);
        setError("Error fetching report data");
      }
    };

    // Fetch report data initially and then set interval to fetch report data every 5 seconds
    fetchReportData();
    const interval = setInterval(fetchReportData, 5000);

    // Clear interval on component unmount
    return () => clearInterval(interval);
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  useEffect(() => {
    if (reportData.length > 0 && chartRef.current) {
      // Update chart data
      chartRef.current.updateSeries([{
        data: reportData.map(report => report.probability),
      }]);
    }
  }, [reportData]);

  useEffect(() => {
    if (!chartRef.current) {
      // Initialize ApexCharts if not already initialized
      const options = {
        series: [{
          name: 'Probability',
          data: reportData.map(report => report.probability),
        }],
        chart: {
          height: 350,
          type: 'bar',
        },
        plotOptions: {
          bar: {
            borderRadius: 10,
            dataLabels: {
              position: 'top',
            },
          }
        },
        dataLabels: {
          enabled: true,
          formatter: function (val) {
            return val + "%";
          },
          offsetY: -20,
          style: {
            fontSize: '12px',
            colors: ["#304758"]
          }
        },
        xaxis: {
          categories: reportData.map(report => report.id),
          position: 'top',
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false
          },
          crosshairs: {
            fill: {
              type: 'gradient',
              gradient: {
                colorFrom: '#D8E3F0',
                colorTo: '#BED1E6',
                stops: [0, 100],
                opacityFrom: 0.4,
                opacityTo: 0.5,
              }
            }
          },
          tooltip: {
            enabled: true,
          }
        },
        
        yaxis: {
          axisBorder: {
            show: false
          },
          axisTicks: {
            show: false,
          },
          labels: {
            show: false,
            formatter: function (val) {
              return val + "%";
            }
          }
        },
        title: {
          text: 'Probability Chart',
          floating: true,
          offsetY: 330,
          align: 'center',
          style: {
            color: '#444'
          }
        }
      };
      chartRef.current = new ApexCharts(document.querySelector("#chart"), options);
      chartRef.current.render();
    }
  }, [reportData]);

  return (
    <div id="chart" />
  );
};

export default MileChart;
