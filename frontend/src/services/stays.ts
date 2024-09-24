import PublicAxiosInstance from './publicAxiosInstance';

export const getStays = async (area: string, keyword: string, page: number) => {
  const response = await PublicAxiosInstance.get(
    `/stays?area=${area}&keyword=${keyword}&pageNo=${page}`,
  );
  return response;
};
