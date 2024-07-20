import axios from 'axios';

const PrivateAxiosInstance = axios.create({
  baseURL: process.env.NEXT_BULIC_API_BASE_URI,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

PrivateAxiosInstance.interceptors.request
  .use
  // config => {
  //     // request 시 토큰 붙여주는 로직 추가 예정
  // }
  ();

export default PrivateAxiosInstance;
