import axios from 'axios';
import { getCacheAccessToken, removeCacheToken } from './userService';

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:8888',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
    Pragma: 'no-cache',
    Expires: '0',
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const token = getCacheAccessToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

axiosInstance.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      removeCacheToken();
      window.location.reload();
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
