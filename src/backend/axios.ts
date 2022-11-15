import axios from 'axios';


const instance = axios.create({
  baseURL: process.env.REACT_APP_CUSTOM_ENV_VAR,
});

instance.interceptors.request.use((config: any) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

export default instance;
