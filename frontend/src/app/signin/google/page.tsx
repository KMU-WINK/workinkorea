'use client';

import authorizeWithGoogle from '@/services/auth/google';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

function GoogleCallbackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const isGranted = useRef<boolean>(false);

  useEffect(() => {
    if (code && !isGranted.current) {
      const response = authorizeWithGoogle({
        clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || '',
        clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET || '',
        redirectUri: `${window.location.protocol}//${window.location.host}/signin/google`,
        code,
      });

      isGranted.current = true;

      console.log(response);
      // 해당 access token를 이용하여 서비스 서버로 API 요청 후, 회원가입 or 로그인 진행 로직 추가 예정입니다.
    }
  }, []);

  return <>콜백 페이지</>;
}

export default GoogleCallbackPage;
