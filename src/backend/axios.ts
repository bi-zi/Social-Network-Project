import axios from 'axios';


console.log(process.env.REACT_APP_DATA_BASE_LINK);
const instance = axios.create({
  baseURL: process.env.REACT_APP_DATA_BASE_LINK,
});

instance.interceptors.request.use((config: any) => {
  config.headers.Authorization = window.localStorage.getItem('token');

  return config;
});

export default instance;
