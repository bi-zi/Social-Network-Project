import axios from 'axios';

const instance = axios.create({
  withCredentials: true,
  baseURL: process.env.REACT_APP_CUSTOM_ENV_VAR,
});

instance.interceptors.request.use((config: any) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

export default instance;
