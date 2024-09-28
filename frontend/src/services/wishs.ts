import PublicAxiosInstance from '@/services/publicAxiosInstance';
import { WishInfo, WishItem, WishRes } from '@/types/type';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NpYWxfaWQiOiIzNzE1NjAxNzA1IiwiZXhwIjoxNzI3NTA2NzMyfQ.czqliClUXXmeATWd4IkWBfCcT2wbpYB5dqvTQv1M0kk';

export const getWishList = async (): Promise<WishRes[]> => {
  try {
    const response = await PublicAxiosInstance.get('/wishs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('getWishList response : ', response);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
export const getWishFeed = async (): Promise<WishInfo[]> => {
  try {
    const response = await PublicAxiosInstance.get('/wishs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const postWishItem = async (postData: WishItem) => {
  try {
    const response = await PublicAxiosInstance.post('/wishs', postData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const deleteWishItem = async (deleteData: WishItem) => {
  try {
    const response = await PublicAxiosInstance.delete('/wishs', {
      headers: {
        Authorization: `Bearer ${token}`, // Authorization 헤더에 토큰 추가
      },
      data: deleteData,
    });
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
