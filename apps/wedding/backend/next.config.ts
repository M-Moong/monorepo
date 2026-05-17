import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // CORS — web 앱(프론트엔드)의 요청만 허용
  // 배포 후 NEXT_PUBLIC_SITE_URL 을 실제 프론트엔드 도메인으로 변경
  async headers() {
    const origin = process.env.WEB_URL ?? 'http://localhost:3000';
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Origin', value: origin },
          { key: 'Access-Control-Allow-Methods', value: 'GET,POST,OPTIONS' },
          { key: 'Access-Control-Allow-Headers', value: 'Content-Type' },
        ],
      },
    ];
  },
};

export default nextConfig;
