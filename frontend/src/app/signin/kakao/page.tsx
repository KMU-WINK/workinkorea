'use client';

import { authorizeWithKakao } from '@/services/auth/kakao';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef } from 'react';

const KakaoCallbackPage = () => {
  const searchParams = useSearchParams();
  const code = searchParams.get('code');
  /**
   * @description 카카오 액세스 토큰 요청 시, 발생하는 'KOE320 invalid_grant' 에레 방지용
   * / 동일한 인가 코드를 두 번 이상 사용하지 못하도록 useRef를 flag처럼 사용합니다.
   */
  const isGranted = useRef<boolean>(false);

  useEffect(() => {
    if (code && !isGranted.current) {
      const response = authorizeWithKakao({
        clientId: process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY || '',
        redirectUrl: `${window.location.protocol}//${window.location.host}/signin/kakao`,
        code: code,
      });

      // 인가 코드(code)를 통하여 액세스 토큰 요청을 완료하였으므로 isGranted.current를 갱신합니다.
      isGranted.current = true;

      console.log(response);
      // 해당 access token를 이용하여 서비스 서버로 API 요청 후, 회원가입 or 로그인 진행 로직 추가 예정입니다.
    }
  }, []);

  return <>콜백 페이지</>;
};

export default KakaoCallbackPage;
