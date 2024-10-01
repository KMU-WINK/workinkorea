import PublicAxiosInstance from '@/services/publicAxiosInstance';

export const getGoogleSentence = async () => {
  try {
    const response = await PublicAxiosInstance.get('/google/sentence');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const getGoogleRecommends = async (region_idx: string, keyword_idx: string) => {
  try {
    const response = await PublicAxiosInstance.get(`/google/list?region_idx=${region_idx}&keyword_idx=${keyword_idx}`);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
}