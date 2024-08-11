'use client';

import React from 'react';

function NaverLoginButton() {
  const handleLogin = () => {
    const clientId = process.env.NEXT_PUBLIC_NAVER_CLIENT_ID;
    const redirectUri = `${window.location.protocol}//${window.location.host}/signin/naver`;
    const state = 'random_string_for_security';
    const authUrl = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&state=${state}`;

    window.location.href = authUrl;
  };

  return (
    <button type="button" onClick={handleLogin}>
      Naver로 시작하기
    </button>
  );
}

export default NaverLoginButton;
