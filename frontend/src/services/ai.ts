import PublicAxiosInstance from '@/services/publicAxiosInstance';

export const getRecommend = async () => {
  try {
    const response = await PublicAxiosInstance.get('/ai');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
