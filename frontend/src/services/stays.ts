import PublicAxiosInstance from './publicAxiosInstance';
import { GetLocationProps } from '@/types/type';
import axios from 'axios';

export const getStays = async (area: string, keyword: string, page: number) => {
  const response = await PublicAxiosInstance.get(
    `/stays?area=${area}&keyword=${keyword}&pageNo=${page}`,
  );
  return response;
};

export const getStayLocations = async ({
  mapX,
  mapY,
  keyword,
  radius,
  numOfRows = 50,
}: GetLocationProps) => {
  try {
    const response = await PublicAxiosInstance.get(
      keyword
        ? `/stays/location?mapX=${mapX}&mapY=${mapY}&keyword=${keyword}&radius=${radius}&numOfRows=${numOfRows}`
        : `/stays/location?mapX=${mapX}&mapY=${mapY}&radius=${radius}&numOfRows=${numOfRows}`,
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
