import PublicAxiosInstance from '@/services/publicAxiosInstance';
import { WishItem, WishRes, WishInfo, LocationInfo } from '@/types/type';

export const getWishList = async (): Promise<WishRes[]> => {
  try {
    const response = await PublicAxiosInstance.get('/wishs');
    console.log('getWishList response : ', response);
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const getWishFeed = async (): Promise<WishInfo[]> => {
  try {
    const response = await PublicAxiosInstance.get('/wishs');
    return response.data;
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

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
    const processedResponse = {
      강릉: {
        items: response.data['강릉'],
        length: response.data['강릉'].length,
      },
      경주: {
        items: response.data['경주'],
        length: response.data['경주'].length,
      },
      부산: {
        items: response.data['부산'],
        length: response.data['부산'].length,
      },
      여수: {
        items: response.data['여수'],
        length: response.data['여수'].length,
      },
      전주: {
        items: response.data['전주'],
        length: response.data['전주'].length,
      },
      제주: {
        items: response.data['제주'],
        length: response.data['제주'].length,
      },
      춘천: {
        items: response.data['춘천'],
        length: response.data['춘천'].length,
      },
    };

    return processedResponse;
  } catch (error) {
    console.error('Error:', error);
    return {
      강릉: { items: [], length: 0 },
      경주: { items: [], length: 0 },
      부산: { items: [], length: 0 },
      여수: { items: [], length: 0 },
      전주: { items: [], length: 0 },
      제주: { items: [], length: 0 },
      춘천: { items: [], length: 0 },
    };
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
