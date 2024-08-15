'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';
import authorizeWithNaver from '@/services/auth/naver';

function NaverCallbackPage() {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  const state = searchParams.get('state');
  const isGranted = useRef<boolean>(false);

  useEffect(() => {
    if (code && !isGranted.current) {
      const response = authorizeWithNaver({
        clientId: process.env.NEXT_PUBLIC_NAVER_CLIENT_ID || '',
        clientSecret: process.env.NEXT_PUBLIC_NAVER_CLIENT_SECRET || '',
        redirectUri: `${process.env.NEXT_PUBLIC_API_BASE_URI}/auth/naver`,
        code,
        state: state || '',
      });

      isGranted.current = true;

      console.log(response);
      // 해당 access token를 이용하여 서비스 서버로 API 요청 후, 회원가입 or 로그인 진행 로직 추가 예정입니다.
    }
  }, []);

  return <>콜백 페이지</>;
}

export default NaverCallbackPage;
