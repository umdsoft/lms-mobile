import axios from 'axios';

import { useAuthStore } from '../store/useAuthStore';

const api = axios.create({
  baseURL: 'https://api.example.com'
});

api.interceptors.request.use(
  async (config) => {
    const token = useAuthStore.getState().token;
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`
      };
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
