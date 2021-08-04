import axios from 'axios';

const axiosInstance = () => {
  const config = axios.create();
  return config;
};

export default axiosInstance;
