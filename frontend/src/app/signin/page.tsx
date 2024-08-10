'use client';

declare global {
  interface Window {
    Kakao: any;
    naver: any;
  }
}

const SignInPage = () => {
  const loginWithKaKao = () => {
    window.Kakao.Auth.authorize({
      redirectUri: `${window.location.protocol}//${window.location.host}/signin/kakao`,
    });
  };

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
