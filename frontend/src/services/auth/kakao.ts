import PublicAxiosInstance from '../publicAxiosInstance';

type TAuthorizeWithKakao = {
  clientId: string;
  redirectUrl: string;
  code: string;
};

export const authorizeWithKakao = async ({
  clientId,
  redirectUrl,
  code,
}: TAuthorizeWithKakao) => {
  const response = await PublicAxiosInstance.get('/auth/kakao', {
    params: {
      client_id: clientId,
      redirect_url: redirectUrl,
      code: code,
    },
  });
  return response;
};
