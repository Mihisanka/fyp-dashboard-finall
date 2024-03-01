import React from "react";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, Legend } from "recharts";

const MileChart = ({ availableCount, unavailableCount }) => {
  const data = [
    { name: "Day 1", available: availableCount, unavailable: unavailableCount },
    { name: "Day 2", available: availableCount, unavailable: unavailableCount },
    { name: "Day 3", available: availableCount, unavailable: unavailableCount },
    { name: "Day 4", available: availableCount, unavailable: unavailableCount },
    { name: "Day 5", available: availableCount, unavailable: unavailableCount },
  ];

  return (
    <div className="mile-chart-wrapper"> {/* Add a wrapper div with a specific class */}
      <ResponsiveContainer width='100%' height={280}>
        <LineChart data={data}>
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="available" stroke="#8884d8" name="Available" />
          <Line type="monotone" dataKey="unavailable" stroke="#82ca9d" name="Unavailable" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MileChart;
