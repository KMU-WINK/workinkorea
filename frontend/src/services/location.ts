import PublicAxiosInstance from '@/services/publicAxiosInstance';

interface GetSpotListsProps {
  mapX: string;
  mapY: string;
  keyword: string | null;
  radius?: number;
  numOfRows?: number;
}
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
    console.log(e);
  }
};

export { getSpotLists };
