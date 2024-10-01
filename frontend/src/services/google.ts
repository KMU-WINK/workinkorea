import PublicAxiosInstance from '@/services/publicAxiosInstance';

export const getGoogleSentence = async () => {
  try {
    const response = await PublicAxiosInstance.get('/google/sentence');
    console.log('response', response.data.sentence);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
