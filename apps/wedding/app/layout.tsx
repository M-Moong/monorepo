import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ACTIVE_THEME } from '@/config/theme.config';
import { WEDDING } from '@/data/wedding';

const cormorant = Cormorant_Garamond({
  variable: '--font-serif',
  subsets: ['latin'],
  weight: ['300', '500'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-sans',
  subsets: ['latin'],
  weight: ['300', '400', '500', '700'],
  display: 'swap',
});

// 배포 시 Vercel 환경변수 NEXT_PUBLIC_SITE_URL 에 실제 도메인 입력
// ex) https://minjun-seoyeon.vercel.app
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://example.com';

const OG_TITLE = `${WEDDING.groom.name} ♥ ${WEDDING.bride.name} · 결혼합니다`;
const OG_DESCRIPTION =
  `${WEDDING.dateText} · ${WEDDING.venue.name}\n` +
  `${WEDDING.groom.name}과 ${WEDDING.bride.name}의 결혼식에 초대합니다.`;

// JSON-LD 구조화 데이터 — 구글 검색/이벤트 카드에 활용
const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: `${WEDDING.groom.name} & ${WEDDING.bride.name} 결혼식`,
  startDate: '2026-10-17T14:00:00+09:00',
  endDate: '2026-10-17T17:00:00+09:00',
  eventStatus: 'https://schema.org/EventScheduled',
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: WEDDING.venue.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '소월로 322',
      addressLocality: '용산구',
      addressRegion: '서울특별시',
      postalCode: '04320',
      addressCountry: 'KR',
    },
  },
  description: OG_DESCRIPTION,
  image: `${SITE_URL}/og-image.jpg`,
  organizer: [
    { '@type': 'Person', name: WEDDING.groom.name },
    { '@type': 'Person', name: WEDDING.bride.name },
  ],
  url: SITE_URL,
};

export const metadata: Metadata = {
  // Next.js가 상대 경로 이미지 URL을 절대 경로로 변환할 때 사용하는 기준 URL
  metadataBase: new URL(SITE_URL),

  // ── 기본 SEO ──────────────────────────────────────────────────────────────
  title: {
    default: OG_TITLE,
    // 하위 페이지가 생길 경우 자동으로 "페이지명 · M & S" 형태로 조합됨
    template: `%s · ${WEDDING.groom.en} & ${WEDDING.bride.en}`,
  },
  description: OG_DESCRIPTION,
  keywords: [
    '결혼식',
    '웨딩 청첩장',
    '청첩장',
    WEDDING.groom.name,
    WEDDING.bride.name,
    WEDDING.venue.short,
  ],
  authors: [{ name: `${WEDDING.groom.name} & ${WEDDING.bride.name}` }],
  creator: `${WEDDING.groom.name} & ${WEDDING.bride.name}`,

  // 정식 URL — 중복 색인 방지
  alternates: {
    canonical: '/',
  },

  // 청첩장은 검색 엔진 노출을 막는 게 일반적 (비공개 초대장)
  // 공개 노출을 원한다면 index: true, follow: true 로 변경
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },

  // ── Open Graph (카카오톡 · 페이스북 · 라인 공유 프리뷰) ─────────────────
  openGraph: {
    type: 'website',
    locale: 'ko_KR',
    url: SITE_URL,
    siteName: `${WEDDING.groom.name} ♥ ${WEDDING.bride.name}`,
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [
      {
        // public/og-image.jpg 파일을 1200×630 비율로 준비하세요
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: `${WEDDING.groom.name} & ${WEDDING.bride.name} 결혼식 청첩장`,
        type: 'image/jpeg',
      },
    ],
  },

  // ── Twitter / X Card ──────────────────────────────────────────────────────
  twitter: {
    card: 'summary_large_image',
    title: OG_TITLE,
    description: OG_DESCRIPTION,
    images: [
      {
        url: '/og-image.jpg',
        alt: `${WEDDING.groom.name} & ${WEDDING.bride.name} 결혼식 청첩장`,
      },
    ],
  },

  // ── Apple / iOS 홈화면 저장 ───────────────────────────────────────────────
  appleWebApp: {
    capable: true,
    // black-translucent: 상태바가 투명해져 전체화면처럼 보임
    statusBarStyle: 'black-translucent',
    title: `${WEDDING.groom.en} & ${WEDDING.bride.en}`,
  },

  // ── 아이콘 (파일은 public/ 폴더에 준비) ──────────────────────────────────
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      // iOS 홈화면 저장 시 사용되는 아이콘
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
    ],
    other: [
      // Safari 핀 탭 아이콘 (SVG) — color는 핀 상태의 배경색
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: '#c9a96e' },
    ],
  },

  // ── PWA Manifest ─────────────────────────────────────────────────────────
  // public/site.webmanifest 파일이 있으면 홈화면 추가 시 앱처럼 동작
  manifest: '/site.webmanifest',
};

// ── Viewport (themeColor 포함) ────────────────────────────────────────────
// Next.js 14+에서 themeColor는 viewport export로 분리됨
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  // 브라우저 상단 주소창 색상 — 라이트/다크 모드 각각 지정
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5efe8' },
    { media: '(prefers-color-scheme: dark)', color: '#1a1612' },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-theme={ACTIVE_THEME}>
      <head>
        {/* 구조화 데이터 — 구글이 이벤트 정보를 파악하는 데 사용 */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className={`${cormorant.variable} ${spaceGrotesk.variable}`}>
        {children}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
