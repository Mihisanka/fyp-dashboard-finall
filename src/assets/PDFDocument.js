// PDFDocument.js
import React, { useState, useEffect } from 'react';
import { Document, Page, Text, View, StyleSheet } from '@react-pdf/renderer';
import { Pie } from 'react-chartjs-2';
import { collection, getDocs } from 'firebase/firestore';
import { db_user } from '../firebase';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 10,
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
  header: {
    marginBottom: 10,
    fontSize: 18,
    fontWeight: 'bold',
  },
  text: {
    marginBottom: 5,
  },
  chartContainer: {
    marginTop: 10,
    width: '100%',
    height: 200,
  },
});

const PDFDocument = ({ selectedRow }) => {
  const [chartData, setChartData] = useState(null);

  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const reportCollection = collection(db_user, 'report');
        const reportSnapshot = await getDocs(reportCollection);
        const labels = [];
        const probabilityData = [];
        reportSnapshot.forEach((doc) => {
          const data = doc.data();
          labels.push(data.id);
          probabilityData.push(parseFloat(data.probability.replace('%', '')));
        });
        setChartData({ labels, probabilityData });
      } catch (error) {
        console.error('Error fetching chart data: ', error);
      }
    };

    fetchChartData();
  }, []);

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text style={styles.header}>Parking Slot: {selectedRow.id}</Text>
          <Text style={styles.text}>Timestamp: {selectedRow.timestamp}</Text>
          <Text style={styles.text}>Probability: {selectedRow.probability}</Text>
          <Text style={styles.text}>Ratings: {selectedRow.ratings}</Text>
          <View style={styles.chartContainer}>
            {chartData && (
              <>
                <Text style={styles.header}>Probability Distribution</Text>
                <View style={{ width: '100%', height: 200 }}>
                  <Pie
                    data={{
                      labels: chartData.labels,
                      datasets: [
                        {
                          label: 'Probability',
                          data: chartData.probabilityData,
                          backgroundColor: [
                            'rgba(255, 99, 132, 0.6)',
                            'rgba(54, 162, 235, 0.6)',
                            'rgba(255, 206, 86, 0.6)',
                            'rgba(75, 192, 192, 0.6)',
                            'rgba(153, 102, 255, 0.6)',
                            'rgba(255, 159, 64, 0.6)',
                          ],
                        },
                      ],
                    }}
                  />
                </View>
              </>
            )}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default PDFDocument;
