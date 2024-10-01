import PublicAxiosInstance from '@/services/publicAxiosInstance';
import { WishItem, WishRes, WishInfo, LocationInfo } from '@/types/type';
import axios from 'axios';

export const getWishFeeds = async (): Promise<LocationInfo[]> => {
  try {
    const response = await PublicAxiosInstance.get('/wishs');
    return response.data;
  } catch (error) {
    return [];
  }
};

export const postWishItem = async (postData: WishItem) => {
  try {
    const response = await PublicAxiosInstance.post('/wishs', postData);
    return response;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        return 'error occurred';
      }
    }
  }
};

export const deleteWishItem = async (deleteData: WishItem) => {
  try {
    const response = await PublicAxiosInstance.delete('/wishs', {
      data: deleteData,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 400) {
        return 'error occurred';
      }
    }
  }
};
