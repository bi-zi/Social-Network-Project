import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:4444',
});

console.log(process.env.BACKEND, process.env.REACT_APP_YOURVARIABLE);


instance.interceptors.request.use((config: any) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
