import axios, { InternalAxiosRequestConfig } from 'axios';

const PrivateAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URI,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

PrivateAxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.withCredentials = true;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default PrivateAxiosInstance;
