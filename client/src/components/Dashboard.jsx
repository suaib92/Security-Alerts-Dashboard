import React, { useState, useEffect } from 'react';
import { fetchAlerts } from '../api';
import TopSourceIPsChart from './ChartComponents/TopSourceIPsChart';
import TopDestinationIPsChart from './ChartComponents/TopDestinationIPsChart';
import AlertsOverTimeChart from './ChartComponents/AlertsOverTimeChart';
import AlertsBySeverityChart from './ChartComponents/AlertsBySeverityChart';
import AlertsByCategoryChart from './ChartComponents/AlertsByCategoryChart';

const Dashboard = () => {
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAlerts();
        setAlerts(data);
        setLoading(false);
      } catch (error) {
        setError(`Error fetching data: ${error.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateTopSourceIPs = () => {
    const sourceIPCounts = {};
    alerts.forEach((alert) => {
      const { src_ip } = alert;
      sourceIPCounts[src_ip] = (sourceIPCounts[src_ip] || 0) + 1;
    });

    return Object.keys(sourceIPCounts)
      .map((ip) => ({ ip, count: sourceIPCounts[ip] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const calculateTopDestinationIPs = () => {
    const destIPCounts = {};
    alerts.forEach((alert) => {
      const { dest_ip } = alert;
      destIPCounts[dest_ip] = (destIPCounts[dest_ip] || 0) + 1;
    });

    return Object.keys(destIPCounts)
      .map((ip) => ({ ip, count: destIPCounts[ip] }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  };

  const calculateAlertsOverTime = () => {
    const alertsByTime = {};
    alerts.forEach((alert) => {
      const timestamp = new Date(alert.timestamp);
      const hour = timestamp.getHours();
      alertsByTime[hour] = (alertsByTime[hour] || 0) + 1;
    });

    return Object.keys(alertsByTime)
      .map((hour) => ({ hour: `${hour}:00`, count: alertsByTime[hour] }))
      .sort((a, b) => parseInt(a.hour) - parseInt(b.hour));
  };

  const calculateAlertsBySeverity = () => {
    const severityCounts = {
      1: 0,
      2: 0,
      3: 0,
      4: 0,
      5: 0
    };
    alerts.forEach((alert) => {
      if (alert && alert.alert && alert.alert.severity) {
        const { severity } = alert.alert;
        severityCounts[severity]++;
      }
    });

    return Object.keys(severityCounts).map((severity) => ({ name: `Severity ${severity}`, value: severityCounts[severity] }));
  };

  const calculateAlertsByCategory = () => {
    const categoryCounts = {};
    alerts.forEach((alert) => {
      if (alert && alert.alert && alert.alert.category) {
        const { category } = alert.alert;
        categoryCounts[category] = (categoryCounts[category] || 0) + 1;
      }
    });

    return Object.keys(categoryCounts).map((category) => ({ name: category, value: categoryCounts[category] }));
  };

  if (loading) {
    return <div className="bg-gray-900 text-white p-6">Loading...</div>;
  }

  if (error) {
    return <div className="bg-gray-900 text-white p-6">{error}</div>;
  }

  return (
    <div className="bg-gray-900 text-white p-6 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Security Alerts Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <TopSourceIPsChart data={calculateTopSourceIPs()} />
        <TopDestinationIPsChart data={calculateTopDestinationIPs()} />
        <AlertsOverTimeChart data={calculateAlertsOverTime()} />
        <AlertsBySeverityChart data={calculateAlertsBySeverity()} />
      </div>
      <div className="flex justify-center mt-6">
      <div className="w-full md:w-1/2">
          <AlertsByCategoryChart data={calculateAlertsByCategory()} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
