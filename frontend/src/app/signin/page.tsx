'use client';

import { useEffect } from 'react';

declare global {
  interface Window {
    Kakao: any;
    naver: any;
  }
}

const SignInPage = () => {
  const loginWithKaKao = () => {
    if (window.Kakao) {
      window.Kakao.Auth.authorize({
        redirectUri: `${window.location.protocol}//${window.location.host}/signin/kakao`,
      });
    }
  };

  const handleKakaoLoad = () => {
    if (window.Kakao) {
      window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY);
    }
  };

  useEffect(() => {
    // 회원가입 및 로그인 페이지에 진입할 때 Kakao SDK를 추가
    const kakaoScript = document.createElement('script');
    kakaoScript.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    kakaoScript.async = true;
    kakaoScript.onload = handleKakaoLoad;
    document.body.appendChild(kakaoScript);

    return () => {
      // 회원가입 및 로그인 페이지에서 이탈할 때 Kakao SDK를 제거
      document.body.removeChild(kakaoScript);
    };
  }, []);

  return (
    <div>
      <button onClick={loginWithKaKao}>카카오 로그인</button>
      <div id="naverIdLogin">
        <button>네이버 로그인</button>
      </div>
      <button>구글 로그인</button>
    </div>
  );
};

export default SignInPage;
