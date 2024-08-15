import PublicAxiosInstance from '../publicAxiosInstance';

type TAuthorizeWithKakao = {
  clientId: string;
  code: string;
};

const authorizeWithKakao = async ({ clientId, code }: TAuthorizeWithKakao) => {
  const response = await PublicAxiosInstance.get('/auth/kakao', {
    params: {
      client_id: clientId,
      code,
    },
  });
  return response;
};

export default authorizeWithKakao;
