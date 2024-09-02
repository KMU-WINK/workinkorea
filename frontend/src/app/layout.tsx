import type { Metadata } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import StyledJsxRegistry from './registry';
import KakaoScriptLoader from '@/components/KakaoScriptLoader';

export const metadata: Metadata = {
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
        url: '/images/ogImage.png',
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
        <KakaoScriptLoader />
      </body>
    </html>
  );
}
