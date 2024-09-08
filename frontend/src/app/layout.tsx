import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import StyledJsxRegistry from './registry';
import KakaoScriptLoader from '@/components/KakaoScriptLoader';
import { useEffect, useState } from 'react';

export const metadata: Metadata = {
  metadataBase: new URL('https://workinkorea.vercel.app'),
  title: '워크인코리아',
  description: '원하는 곳에서 머무르며 일하다',
  keywords: ['워크인코리아', '워케이션', '일', '휴가'],
  viewport:
    'minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no, viewport-fit=cover',
  robots: 'index, follow',
  manifest: '/manifest.json',
  icons: [
    { rel: 'apple-touch-icon', url: 'icons/icon-128x128.png' },
    { rel: 'icon', url: 'icons/icon-128x128.png' },
  ],
  openGraph: {
    locale: 'ko_KR',
    siteName: '워크인코리아',
    title: '워크인코리아',
    description: '원하는 곳에서 머무르며 일하다',

    type: 'website',
    url: 'https://workinkorea.vercel.app',
    images: [
      {
        url: '/images/opengraph-image.png',
        type: 'image/png',
        width: '1200',
        height: '630',
        alt: '워크인코리아 - 원하는 곳에서 머무르며 일하다',
      },
    ],
  },
};

const myFont = localFont({
  src: '../../public/fonts/PretendardVariable.woff2',
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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

  return (
    <html lang="ko" className="bg-white">
      <body className={myFont.className}>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
        <KakaoScriptLoader />
      </body>
    </html>
  );
}
