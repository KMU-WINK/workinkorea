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
      redirectUri: `${process.env.NEXT_PUBLIC_API_BASE_URI}/auth/kakao`,
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
