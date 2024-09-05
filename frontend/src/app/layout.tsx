import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import StyledJsxRegistry from './registry';
import KakaoMapLoader from '@/components/KakaoScriptLoader/map';
import KakaoSDKLoader from '@/components/KakaoScriptLoader/sdk';

export const metadata: Metadata = {
  metadataBase: new URL('https://workinkorea.vercel.app'),
  title: '워크인코리아',
  description: '원하는 곳에서 머무르며 일하다',
  keywords: ['워크인코리아', '워케이션', '일', '휴가'],
  viewport: 'width=device-width, initial-scale=1.0',
  robots: 'index, follow',
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
  return (
    <html lang="ko" className="bg-white">
      <body className={myFont.className}>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
        <KakaoSDKLoader />
        <KakaoMapLoader />
      </body>
    </html>
  );
}
