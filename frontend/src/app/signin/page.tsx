'use client';

import GoogleLoginButton from '@/app/signin/_components/GoogleLoginButton';
import NaverLoginButton from '@/app/signin/_components/NaverLogin';

declare global {
  interface Window {
    Kakao: any;
    naver: any;
  }
}

function SignInPage() {
  const loginWithKaKao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: `${window.location.protocol}//${window.location.host}/signin/kakao`,
    });
  };

  return (
    <div>
      <button type="button" onClick={loginWithKaKao}>
        카카오 로그인
      </button>
      <NaverLoginButton />
      <GoogleLoginButton />
    </div>
  );
}

export default SignInPage;
