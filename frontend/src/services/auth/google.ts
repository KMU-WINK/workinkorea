import PublicAxiosInstance from '../publicAxiosInstance';

type TAuthorizeWithGoogle = {
  clientId: string;
  clientSecret: string;
  redirectUri: string;
  code: string;
};

const authorizeWithGoogle = async ({
  clientId,
  clientSecret,
  redirectUri,
  code,
}: TAuthorizeWithGoogle) => {
  const response = await PublicAxiosInstance.post(
    'https://oauth2.googleapis.com/token',
    {
      client_id: clientId,
      client_secret: clientSecret,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
      code,
    },
  );

  return response.data;
};

export default authorizeWithGoogle;
