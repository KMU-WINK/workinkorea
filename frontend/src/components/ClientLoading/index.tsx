'use client';

import { useEffect, useState } from 'react';

export default function ClientLoading({ children }: any) {
  const [loading, setLoading] = useState(true);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const userAgent =
      typeof window.navigator === 'undefined' ? '' : navigator.userAgent;
    const isMobileDevice = /Mobi|Android/i.test(userAgent);
    setIsMobile(isMobileDevice);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  if (isMobile && loading) return <>스플래시 아트</>;

  return <>{children}</>;
}
