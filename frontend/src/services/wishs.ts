import PublicAxiosInstance from '@/services/publicAxiosInstance';
import { WishInfo, WishItem, WishRes } from '@/types/type';
const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzb2NpYWxfaWQiOiIzNzE1NjAxNzA1IiwiZXhwIjoxNzI3NTMxMzEyfQ.MzpWI4xRamNZyFhoHEhM9ebEx0OqMuqr7VoZbrV0OPE';

export const getWishList = async (): Promise<WishRes[]> => {
  console.log('getWishList 실행');
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
    console.log('post response : ', response);
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
    console.log('delete response : ', response);

    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};
