import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AlertsOverTimeChart = ({ data }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-2 text-center">Alerts Over Time</h2>
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="hour" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="count" stroke="#82ca9d" />
      </LineChart>
    </ResponsiveContainer>
  </div>
);

export default AlertsOverTimeChart;
