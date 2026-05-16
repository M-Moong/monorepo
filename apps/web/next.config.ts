import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // /api/* 요청을 백엔드(apps/api)로 프록시
  // 브라우저는 항상 같은 origin(/api/*)으로 요청 → CORS 불필요
  // 로컬: API_URL=http://localhost:3001
  // 배포: Vercel 환경변수에 API_URL=https://your-api.vercel.app 입력
  async rewrites() {
    const apiUrl = process.env.API_URL ?? 'http://localhost:3001';
    return [
      {
        source: '/api/:path*',
        destination: `${apiUrl}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
