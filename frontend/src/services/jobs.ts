import PublicAxiosInstance from '@/services/publicAxiosInstance';

export const getJobs = async (area: string, keyword: string, page: number) => {
  const response = await PublicAxiosInstance.get(
    `/jobs?area=${area}&keyword=${keyword}&pageNo=${page}`,
  );
  return response;
};

export const getJobDetail = async (
  contentId: string,
  contentTypeId: string,
) => {
  const response = await PublicAxiosInstance.get(
    `/jobs/detail?contentId=${contentId}&contentTypeId=${contentTypeId}`,
  );
  return response;
};
