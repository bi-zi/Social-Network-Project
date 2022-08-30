import axios from 'axios';

const port = 'https://backend-for-wave.onrender.com/' || 'http://localhost:4444';

const instance = axios.create({
  baseURL: 'http://localhost:4444',
});

instance.interceptors.request.use((config: any) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

export default instance;
