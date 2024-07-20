'use client';

import { authorizeWithKakao } from '@/services/auth/kakao';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const KakaoCallbackPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');

  useEffect(() => {
    if (code) {
      const response = authorizeWithKakao({ code: code });
    }
  }, [code]);

  return <>콜백 페이지</>;
};

export default KakaoCallbackPage;
