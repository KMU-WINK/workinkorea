import PublicAxiosInstance from '@/services/publicAxiosInstance';
import { WishItem, WishRes, WishInfo, LocationInfo } from '@/types/type';

export const getWishFeeds = async (): Promise<LocationInfo[]> => {
  try {
    const response = await PublicAxiosInstance.get('/wishs');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const postWishItem = async (postData: WishItem) => {
  try {
    const response = await PublicAxiosInstance.post('/wishs', postData);
    return response;
  } catch (error) {
    console.error('Error:', error);
    return {};
  }
};

export const deleteWishItem = async (deleteData: WishItem) => {
  try {
    const response = await PublicAxiosInstance.delete('/wishs', {
      data: deleteData,
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
