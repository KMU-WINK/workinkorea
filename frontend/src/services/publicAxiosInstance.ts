import axios, { InternalAxiosRequestConfig } from 'axios';
import PrivateAxiosInstance from '@/services/privateAxiosInstance';

const PublicAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URI,
  // timeout: 2000,
  headers: { 'Content-Type': 'application/json' },
  withCredentials: true,
});

PublicAxiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    config.withCredentials = true;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

export default PublicAxiosInstance;
