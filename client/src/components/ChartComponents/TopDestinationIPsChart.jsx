import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TopDestinationIPsChart = ({ data }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-2 text-center">Top Destination IPs by Count</h2>
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ip" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="count" fill="#8884d8" />
      </BarChart>
    </ResponsiveContainer>
  </div>
);

export default TopDestinationIPsChart;
