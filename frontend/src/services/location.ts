import PublicAxiosInstance from '@/services/publicAxiosInstance';
import { GetSpotListsProps } from '@/types/type';
import axios from 'axios';

const getSpotLists = async ({
  mapX,
  mapY,
  keyword,
  radius,
  numOfRows = 50,
}: GetSpotListsProps) => {
  try {
    const response = await PublicAxiosInstance.get(
      keyword
        ? `/spots/location?mapX=${mapX}&mapY=${mapY}&keyword=${keyword}&radius=${radius}&numOfRows=${numOfRows}`
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

export { getSpotLists };
