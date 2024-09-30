import PublicAxiosInstance from './publicAxiosInstance';
import { GetLocationProps } from '@/types/type';
import axios from 'axios';

export const getSpots = async (area: string, keyword: string, page: number) => {
  const response = await PublicAxiosInstance.get(
    `/spots?area=${area}&keyword=${keyword}&pageNo=${page}`,
  );
  return response;
};

export const getSpotDetail = async (
  contentId: number,
  contentTypeId: number,
) => {
  const response = await PublicAxiosInstance.get(
    `/spots/detail?contentId=${contentId}&contentTypeId=${contentTypeId}`,
  );
  return response;
};

export const getSpotLocations = async ({
  mapX,
  mapY,
  keyword,
  radius,
  numOfRows = 50,
}: GetLocationProps) => {
  try {
    // keyword가 있을 경우 radius 20000으로 고정
    const response = await PublicAxiosInstance.get(
      keyword
        ? `/spots/location?mapX=${mapX}&mapY=${mapY}&keyword=${keyword}&radius=20000&numOfRows=${numOfRows}`
        : `/spots/location?mapX=${mapX}&mapY=${mapY}&radius=${radius}&numOfRows=${numOfRows}`,
    );
    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e)) {
      if (e.response?.status === 400) {
        return 'no data';
      }
    }
  }
};
