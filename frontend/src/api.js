import axios from 'axios';

// In production, set VITE_API_URL to your deployed backend (e.g. https://your-app.onrender.com/api)
// In development, falls back to '/api' which Vite proxies to localhost:5000
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || '/api',
});

export const setAuthToken = (token) => {
  api.defaults.headers.common['Authorization'] = token ? `Bearer ${token}` : '';
};

export default api;
