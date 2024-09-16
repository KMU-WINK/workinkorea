import axios from 'axios';

const PublicAxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URI,
  timeout: 2000,
  headers: { 'Content-Type': 'application/json' },
});

export default PublicAxiosInstance;
