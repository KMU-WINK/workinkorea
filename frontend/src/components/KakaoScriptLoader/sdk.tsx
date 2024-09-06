'use client';

import Script from 'next/script';

/**
 * KakaoSDKLoader 컴포넌트는 클라이언트 측에서 카카오 JavaScript SDK를 로드하고 초기화합니다.
 *
 * 이 컴포넌트는 'next/script'의 Script 컴포넌트를 사용하여 외부 스크립트를 비동기적으로 로드합니다.
 * 스크립트가 성공적으로 로드된 후, `onLoad` 이벤트 핸들러를 통해 Kakao SDK를 초기화합니다.
 *
 * 주요 기능:
 * - 카카오 SDK를 로드하여 클라이언트 측 애플리케이션에서 카카오 API를 사용할 수 있게 합니다.
 *
 * 환경 변수 `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY`:
 * - Kakao.init 함수에서 사용되는 공개 JavaScript 키입니다.
 *
 * @returns {Script} 카카오 JavaScript SDK 스크립트를 로드하는 Script 컴포넌트
 */
export default function KakaoSDKLoader(): JSX.Element {
  return (
    <Script
      src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
      integrity="sha384-TiCUE00h649CAMonG018J2ujOgDKW/kVWlChEuu4jK2vxfAAD0eZxzCKakxg55G4"
      crossOrigin="anonymous"
      onLoad={() =>
        window.Kakao.init(process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY || '')
      }
    />
  );
}
