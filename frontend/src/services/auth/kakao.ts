import PublicAxiosInstance from '../publicAxiosInstance';

type TAuthorizeWithKakao = {
  clientId: string;
  redirectUrl: string;
  code: string;
};

const authorizeWithKakao =
  () =>
  async ({ clientId, redirectUrl, code }: TAuthorizeWithKakao) => {
    const response = await PublicAxiosInstance.get('/auth/kakao', {
      params: {
        client_id: clientId,
        redirect_url: redirectUrl,
        code,
      },
    });
    return response;
  };

export default authorizeWithKakao;
