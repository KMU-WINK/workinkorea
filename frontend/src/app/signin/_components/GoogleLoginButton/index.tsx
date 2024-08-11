'use client';

import React from 'react';

function GoogleLoginButton() {
  // 구글 로그인을 진행하는 주요 로직
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID; // Google Cloud Console에서 발급받은 고유한 ID
    const redirectUri = `${window.location.protocol}//${window.location.host}/signin/google`; // 인증이 성공적으로 완료된 후, 사용자를 리디렉션할 URI
    const scope = 'email profile'; // email 과 profile 정보 요청
    const responseType = 'code'; //
    const state = 'random_string_for_security';

    const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}&state=${state}`; // 구글 OAuth 2.0 인증 URL

    window.location.href = authUrl; // 사용자를 authUrl로 리디렉션하여 구글 로그인 페이지로 이동
  };

  return (
    <button type="button" onClick={handleLogin}>
      Google 로 시작하기
    </button>
  );
}

export default GoogleLoginButton;
