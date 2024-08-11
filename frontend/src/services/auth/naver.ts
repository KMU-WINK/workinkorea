import PublicAxiosInstance from '../publicAxiosInstance';

type TAuthorizeWithNaver = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  code: string;
  state: string;
};

const authorizeWithNaver = async ({
  clientId,
  clientSecret,
  redirectUri,
  code,
  state,
}: TAuthorizeWithNaver) => {
  const response = await PublicAxiosInstance.post(
    'https://nid.naver.com/oauth2.0/token',
    null, // POST 요청에서 body가 없는 경우
    {
      params: {
        grant_type: 'authorization_code',
        client_id: clientId,
        client_secret: clientSecret,
        redirect_uri: redirectUri,
        code,
        state,
      },
    },
  );

  return response.data;
};

export default authorizeWithNaver;
