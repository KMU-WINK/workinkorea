import type { Metadata, Viewport } from 'next';
import './globals.css';
import localFont from 'next/font/local';
import StyledJsxRegistry from './registry';
import KakaoScriptLoader from '@/components/KakaoScriptLoader';
import GoogleAnalytics from '@/lib/GoogleAnalytics';

export const viewport: Viewport = {
  minimumScale: 1,
  initialScale: 1,
  width: 'device-width',
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://workinkorea.vercel.app'),
  title: '워크인코리아',
  description: '원하는 곳에서 머무르며 일하다',
  keywords: ['워크인코리아', '워케이션', '일', '휴가'],
  robots: 'index, follow',
  manifest: '/manifest.json',
  icons: [
    { rel: 'favicon', url: '/favicon.ico' },
    { rel: 'apple-touch-icon', url: '/icons/icon-128x128.png' },
    { rel: 'icon', url: '/icons/icon-128x128.png' },
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
  return (
    <html lang="ko" className="bg-white">
      <body className={myFont.className}>
        <StyledJsxRegistry>{children}</StyledJsxRegistry>
        <GoogleAnalytics />
        <KakaoScriptLoader />
      </body>
    </html>
  );
}
