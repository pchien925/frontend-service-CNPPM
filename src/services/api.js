// src/services/api.js
import axios from 'axios';
import {
  getCacheAccessToken,
  removeCacheToken,
} from './userService';
import { jwtDecode } from 'jwt-decode';

const BASE_URL = 'https://backend-service-cnppm.onrender.com';

/**
 * Axios chính cho app
 */
const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

/* ============================
   REQUEST INTERCEPTOR
============================ */
api.interceptors.request.use(
  (config) => {
    const accessToken = getCacheAccessToken();

    if (accessToken) {
      try {
        const decoded = jwtDecode(accessToken);
        const now = Math.floor(Date.now() / 1000);

        //  KHÔNG xoá token ở đây
        if (decoded?.exp >= now) {
          config.headers.Authorization = `Bearer ${accessToken}`;
        }
      } catch {
        // token lỗi format
        removeCacheToken();
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

/* ============================
   RESPONSE INTERCEPTOR
============================ */
api.interceptors.response.use(
  (response) => response.data,
  async (error) => {
    // Nếu lỗi 401 hoặc không có token, redirect về login
    if (error.response?.status === 401) {
      removeCacheToken();
      window.location.href = '/login';
      return Promise.reject(error);
    }

    return Promise.reject(error);
  }
);
export default api;

