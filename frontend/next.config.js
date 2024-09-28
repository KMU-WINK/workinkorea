const withPWA = require('next-pwa')({
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: true,
  skipWaiting: true,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  // 이미지 도메인 설정 추가
  images: {
    remotePatterns: [
      {
        protocol: 'http', // http도 추가
        hostname: 'tong.visitkorea.or.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'tong.visitkorea.or.kr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'academy.visitkorea.or.kr', // 추가된 도메인
        port: '',
        pathname: '/**',
      },
    ],
  },

  reactStrictMode: false,

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};

module.exports = withPWA(nextConfig);
