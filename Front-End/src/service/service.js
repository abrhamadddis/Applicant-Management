import axios from 'axios';


const apiClient = axios.create({
  baseURL: 'http://localhost:8010/api/',
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: `Bearer ${localStorage.getItem('token')}`,
  },
});
 
export { apiClient };
 