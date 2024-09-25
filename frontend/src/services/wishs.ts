import PublicAxiosInstance from '@/services/publicAxiosInstance';
import { WishItem, WishRes } from '@/types/type';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NpYWxfaWQiOiIzNzE1NjAxNzA1IiwiZXhwIjoxNzI3MjY5NDMwfQ.J83bMTc4uHTCO-oQHRNrDS4Vr_337qqyYfokg998_zU';

export const getWishList = async (): Promise<WishRes[]> => {
  try {
    const response = await PublicAxiosInstance.get('/wishs', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('getWishList response.data : ', response.data);
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
    console.log('postWishItem response.data : ', response.data);
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
    console.log('deleteWishItem response.data : ', response.data);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
