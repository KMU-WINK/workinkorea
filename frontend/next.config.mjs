/** @type {import('next').NextConfig} */
const nextConfig = {
  // 이미지 도메인 설정 추가
  images: {
    domains: ['tong.visitkorea.or.kr'],
  },

  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  }
};

export default nextConfig;
