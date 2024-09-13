'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Home() {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const isMobileDevice = /Mobi|Android/i.test(userAgent);

    // 모바일 환경이 아닌 경우에는 곧바로 메인 화면으로 이동
    if (!isMobileDevice) router.replace('/main');

    setIsMobile(isMobileDevice);

    const timer = setTimeout(() => {
      setLoading(false);
      router.replace('/main');
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isMobile && loading) return <SplashScreen />;

  return <></>;
}

const SplashScreen = () => {
  return (
    <div className="w-screen h-screen flex flex-col justify-center items-center">
      <div className="mt-56 flex flex-col items-center">
        <h3 className="text-xl font-light">원하는 곳에서 머물며 일해요</h3>
        <h2 className="text-[45px] font-semibold mb-8">워크인코리아</h2>
        <Image
          src="/images/splash-image.svg"
          width={154}
          height={48}
          alt="워크인코리아"
        />
      </div>
      <div className="flex-1" />
      <p className="text-lg font-light mb-24">@WINK</p>
    </div>
  );
};
