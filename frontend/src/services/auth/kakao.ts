import PublicAxiosInstance from '../publicAxiosInstance';

type TAuthorizeWithKakao = {
  code: string;
};

export const authorizeWithKakao = async ({ code }: TAuthorizeWithKakao) => {
  const response = await PublicAxiosInstance.post('/auth/kakao', { code });
  return response;
};
