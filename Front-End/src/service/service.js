import axios from 'axios';
 
const apiClient = axios.create({
  baseURL: 'http://localhost:8000/api',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NTYzNGYzNDhkMWQ0YjRlNzAzYjY1YWIiLCJyb2xlIjoiYWRtaW4iLCJpYXQiOjE3MDE3OTAxODUsImV4cCI6MTcwMjM5NDk4NX0.INlGaT0YjtCXzOMupZjQvyCb23c5aPARNnzW_Ehos24`,
  },
});
 
export { apiClient };
 