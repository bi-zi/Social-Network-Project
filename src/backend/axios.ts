import axios from 'axios';

const port: string = 'https://backend-for-wave.herokuapp.com/' || 'http://localhost:4444';

const instance = axios.create({
  baseURL: port,
});

console.log(port)

instance.interceptors.request.use((config: any) => {
  config.headers.Authorization = window.localStorage.getItem('token');
  return config;
});

export default instance;
