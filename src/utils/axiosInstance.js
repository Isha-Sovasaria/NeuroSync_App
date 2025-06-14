import axios from 'axios';
import store from '../store/store.js'; // Adjust path if needed

// Create custom Axios instance
const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000', // Your backend URL
});

// Add request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // const token = store.getState()?.auth?.accessToken;
    // console.log("🚀 Interceptor Token:", token);

    // if (token) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;