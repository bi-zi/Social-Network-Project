import axios from 'axios';

const port = 'http://localhost:4444' || 'https://backend-for-wave.onrender.com/';

const instance = axios.create({
  baseURL: port,
});

instance.interceptors.request.use((config: any) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

export default instance;
