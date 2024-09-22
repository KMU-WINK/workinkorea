import Script from 'next/script';

/**
 * KakaoMapLoader 컴포넌트는 클라이언트 측에서 카카오 지도 JavaScript SDK를 로드합니다.
 *
 * 이 컴포넌트는 'next/script'의 Script 컴포넌트를 사용하여 외부 스크립트를 비동기적으로 로드합니다.
 * strategy 속성은 'beforeInteractive'로 설정되어, 페이지 상호작용 전에 스크립트가 로드됩니다.
 *
 * 주요 기능:
 * - 카카오 지도 SDK를 로드하여 클라이언트 측 애플리케이션에서 카카오 지도 API를 사용할 수 있게 합니다.
 *
 * 환경 변수 `NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY`:
 * - 카카오 지도 SDK를 로드할 때 사용되는 공개 JavaScript 키입니다.
 *
 * @returns {JSX.Element} 카카오 지도 JavaScript SDK 스크립트를 로드하는 Script 컴포넌트
 */
export default function KakaoMapLoader(): JSX.Element {
  return (
    <Script
      type="text/javascript"
      src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_PUBLIC_KAKAO_JAVASCRIPT_KEY}&autoload=false`}
      strategy="beforeInteractive"
    />
  );
}
