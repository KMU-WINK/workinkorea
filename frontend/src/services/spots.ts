import PublicAxiosInstance from './publicAxiosInstance';

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
