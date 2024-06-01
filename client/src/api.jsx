import axios from 'axios';

export const fetchAlerts = async () => {
  try {
    const response = await axios.get('http://localhost:5000/api/data');
    return response.data;
  } catch (error) {
    console.error('Error fetching data: ', error);
    throw error;
  }
};
