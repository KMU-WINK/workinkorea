import PublicAxiosInstance from '@/services/publicAxiosInstance';
import { WishItem, WishRes,WishInfo } from '@/types/type';
const cookies = document.cookie.split('; ');
const tokenCookie = cookies.find(cookie => cookie.startsWith('accessToken='));
const token = tokenCookie?.split('=')[1];

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
