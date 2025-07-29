// src/api/index.js
import axios from 'axios';
import { store } from '../store/store';

const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:83/ecommerceapi/public/api/login',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  }
});

// Request interceptor
api.interceptors.request.use((config) => {
  const token = store.getState().auth.token;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor
/* api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      store.dispatch(logout());
    }
    return Promise.reject(error);
  }
); */

export default api;