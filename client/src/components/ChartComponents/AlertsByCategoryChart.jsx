import React from 'react';
import { PieChart, Pie, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const AlertsByCategoryChart = ({ data }) => (
  <div className="bg-gray-800 p-4 rounded-lg shadow-lg">
    <h2 className="text-xl font-semibold mb-2 text-center">Alerts by Category</h2>
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie dataKey="value" data={data} cx="50%" cy="50%" outerRadius={80} fill="#82ca9d" label />
        <Tooltip />
        <Legend align="center" />
      </PieChart>
    </ResponsiveContainer>
  </div>
);

export default AlertsByCategoryChart;
