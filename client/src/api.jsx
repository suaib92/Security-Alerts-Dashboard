import axios from 'axios';

export const fetchAlerts = async () => {
  try {
    const response = await axios.get('https://security-alerts-dashboard.onrender.com/api/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};
