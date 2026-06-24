import type { Metadata, Viewport } from 'next';
import {
  Cormorant_Garamond,
  Noto_Sans_KR,
  Playfair_Display,
  Space_Grotesk,
} from 'next/font/google';
import Script from 'next/script';
import { Toaster } from '@repo/ui/components/sonner';
import { Providers } from './providers';
import './globals.css';
import { ACTIVE_THEME } from '@/config/theme.config';
import { WEDDING } from '@/data/wedding';

// ─────────────────────────────────────────────────────────────────────────────
// 폰트
// ─────────────────────────────────────────────────────────────────────────────

const cormorant = Cormorant_Garamond({
  variable: '--font-cormorant',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  display: 'swap',
});

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  style: ['normal', 'italic'],
  display: 'swap',
});

const notoSans = Noto_Sans_KR({
  variable: '--font-noto-sans-kr',
  subsets: ['latin'],
  display: 'swap',
});

// ─────────────────────────────────────────────────────────────────────────────
// 공통 상수
// .env (로컬) / Vercel 환경변수에 NEXT_PUBLIC_SITE_URL 입력 필수
// ex) https://minjun-seoyeon.vercel.app
// ─────────────────────────────────────────────────────────────────────────────

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://sm-se.com';

// 브랜드 컬러 — 아이콘/타일 배경색 등에 사용 (wedding.ts 테마와 맞춰 수정)
const BRAND_COLOR = '#c9a96e';

const OG_TITLE = `${WEDDING.groom.name} ♥ ${WEDDING.bride.name}`;

const OG_IMAGE_PATH = '/photos/02-og-source.png';

// const OG_DESCRIPTION = '🌸 소중한 마음으로 축복해 주시면 감사하겠습니다. 🌸';
// const OG_DESCRIPTION = '🌸 소중한 걸음으로 함께해 주세요. 🌸';
// const OG_DESCRIPTION = '🌸 오셔서 축복해 주시면 감사하겠습니다 🌸';
const OG_DESCRIPTION = '🌸 함께 축복해 주시면 감사하겠습니다 🌸';
// const OG_DESCRIPTION = '오셔서 축하해 주시면 더없이 기쁠 거예요. 오래도록 사이좋게 잘 살겠습니다.';
// const OG_DESCRIPTION = '함께 축하해 주시면 정말 기쁠 거예요. 오래도록 웃으며 잘 살겠습니다.';

// ─────────────────────────────────────────────────────────────────────────────
// JSON-LD 구조화 데이터
// 구글이 검색 결과에 이벤트 정보를 표시할 때 사용
// https://developers.google.com/search/docs/appearance/structured-data/event
// ─────────────────────────────────────────────────────────────────────────────

const jsonLdEvent = {
  '@context': 'https://schema.org',
  '@type': 'Event',
  name: `${WEDDING.groom.name} & ${WEDDING.bride.name} 결혼식`,
  startDate: WEDDING.isoStart,
  endDate: WEDDING.isoEnd,
  // EventScheduled | EventCancelled | EventPostponed | EventRescheduled
  eventStatus: 'https://schema.org/EventScheduled',
  // OfflineEventAttendanceMode | OnlineEventAttendanceMode | MixedEventAttendanceMode
  eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
  location: {
    '@type': 'Place',
    name: WEDDING.venue.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: WEDDING.venue.address,
      addressLocality: '분당구',
      addressRegion: '경기도',
      postalCode: '13496',
      addressCountry: 'KR',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 37.3995,
      longitude: 127.1272,
    },
  },
  description: OG_DESCRIPTION,
  image: [`${SITE_URL}${OG_IMAGE_PATH}`],
  organizer: [
    { '@type': 'Person', name: WEDDING.groom.name, url: SITE_URL },
    { '@type': 'Person', name: WEDDING.bride.name, url: SITE_URL },
  ],
  url: SITE_URL,
  // 참석 인원수 알 경우 입력 (선택)
  // maximumAttendeeCapacity: 300,
};

// WebSite 스키마 — 구글 사이트링크 검색박스, 사이트 인식에 활용
const jsonLdWebsite = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  name: OG_TITLE,
  url: SITE_URL,
  description: OG_DESCRIPTION,
  inLanguage: 'ko-KR',
  author: [
    { '@type': 'Person', name: WEDDING.groom.name },
    { '@type': 'Person', name: WEDDING.bride.name },
  ],
};

// ─────────────────────────────────────────────────────────────────────────────
// Metadata
// Next.js App Router 공식 메타데이터 API (Next.js 13.2+)
// https://nextjs.org/docs/app/api-reference/functions/generate-metadata
// ─────────────────────────────────────────────────────────────────────────────

export const metadata: Metadata = {
  // 모든 상대 경로 URL을 절대 URL로 변환할 때 사용하는 기준
  // 반드시 NEXT_PUBLIC_SITE_URL 환경변수를 실제 도메인으로 설정할 것
  metadataBase: new URL(SITE_URL),

  // ── 기본 SEO ───────────────────────────────────────────────────────────────
  // 브라우저 탭, 즐겨찾기, 검색 결과 제목으로 사용됨

  title: {
    // 기본 타이틀 (루트 페이지)
    default: OG_TITLE,
    // 하위 페이지 추가 시 자동으로 "페이지명 · Minjun & Seoyeon" 형태로 조합
    template: `%s · ${WEDDING.groom.en} & ${WEDDING.bride.en}`,
  },

  // 검색 결과 스니펫에 표시 (최대 160자)
  description: OG_DESCRIPTION,

  // 검색엔진 키워드 힌트 (현재 구글은 무시하지만 다른 엔진에서 참고)
  keywords: [
    '결혼식',
    '웨딩 청첩장',
    '청첩장',
    '모바일 청첩장',
    WEDDING.groom.name,
    WEDDING.bride.name,
    WEDDING.venue.short,
    WEDDING.venue.address,
  ],

  // 콘텐츠 작성자
  authors: [{ name: WEDDING.groom.name }, { name: WEDDING.bride.name }],

  // 콘텐츠 제작자 (개인)
  creator: `${WEDDING.groom.name} & ${WEDDING.bride.name}`,

  // 콘텐츠 발행자 (단체/브랜드)
  publisher: `${WEDDING.groom.name} & ${WEDDING.bride.name}`,

  // 사이트를 만든 도구 — 크롤러 통계에 활용
  generator: 'Next.js',

  // 홈화면 저장 시 앱 이름 (manifest의 name보다 우선)
  applicationName: `${WEDDING.groom.en} & ${WEDDING.bride.en} Wedding`,

  // Referrer 정책 — 다른 사이트로 링크 클릭 시 어디까지 정보 전달할지
  // origin-when-cross-origin: 같은 도메인은 전체 URL, 외부는 도메인만 전달
  referrer: 'origin-when-cross-origin',

  // 콘텐츠 카테고리 분류 (일부 크롤러 참고)
  category: 'wedding',

  // ── 정식(Canonical) URL ────────────────────────────────────────────────────
  // 동일 콘텐츠가 여러 URL에 있을 경우 대표 URL을 지정해 중복 색인 방지

  alternates: {
    // 이 페이지의 정식 URL
    canonical: '/',
    // 다국어 버전이 있을 경우 추가 (현재 한국어만 제공)
    languages: {
      'ko-KR': '/',
      // 'en-US': '/en',
    },
  },

  // ── 검색엔진 크롤링 제어 ──────────────────────────────────────────────────
  // 웨딩 청첩장은 일반적으로 검색 노출 차단 (비공개 초대장)
  // 공개 노출 원하면 index: true, follow: true 로 변경

  robots: {
    index: false, // 검색 결과에 이 페이지 노출 여부
    follow: false, // 페이지 내 링크를 크롤러가 따라갈지 여부
    nocache: true, // 구글 캐시 저장 금지
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true, // 이미지 색인 금지
      'max-video-preview': -1, // 영상 미리보기 길이 제한 없음
      'max-image-preview': 'large',
      'max-snippet': -1, // 스니펫 길이 제한 없음
    },
  },

  // ── 검색엔진 소유권 인증 ──────────────────────────────────────────────────
  // 각 서비스에서 인증 코드를 발급받아 환경변수에 입력

  verification: {
    // 구글 서치콘솔 → 설정 → 소유권 인증 → HTML 태그 방식
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ?? '',
    // 빙 웹마스터 도구 (선택)
    // bing: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION ?? '',
    // 야후 / 기타 (선택)
    // yandex: '',
    other: {
      // 네이버 서치어드바이저 → 사이트 등록 → HTML 태그 방식
      // 한국 사용자 대상 사이트라면 등록 권장
      'naver-site-verification': process.env.NEXT_PUBLIC_NAVER_SITE_VERIFICATION ?? '',
      // 카카오 채널 인증 (선택)
      // 'kakao-site-verification': '',
    },
  },

  // ── Open Graph (카카오톡 · 페이스북 · 라인 · 슬랙 공유 프리뷰) ───────────
  // https://ogp.me/ 공식 스펙

  openGraph: {
    // website | article | book | profile | music.* | video.* (결혼식은 website)
    type: 'website',

    // 페이지 URL (metadataBase 기준으로 절대 URL 자동 변환)
    url: SITE_URL,

    // 공유 시 표시되는 사이트 이름 (페이스북 등에서 하단에 표시)
    siteName: `${WEDDING.groom.name} ♥ ${WEDDING.bride.name}`,

    // 공유 카드 제목
    title: OG_TITLE,

    // 공유 카드 설명 (최대 200자 권장)
    description: OG_DESCRIPTION,

    // 사이트 언어 — ko_KR 형식 (언더스코어 사용)
    locale: 'ko_KR',
    // 다국어 버전이 있을 경우 추가
    // alternateLocale: ['en_US'],

    images: [
      {
        // 현재 보유 중인 대표 사진 사용
        url: `${SITE_URL}${OG_IMAGE_PATH}`,
        // HTTPS URL을 명시적으로 지정 (일부 구버전 파서가 secureUrl 우선 사용)
        secureUrl: `${SITE_URL}${OG_IMAGE_PATH}`,
        width: 1200,
        height: 630,
        alt: `${WEDDING.groom.name} & ${WEDDING.bride.name} 결혼식 청첩장`,
        type: 'image/png',
      },
    ],
  },

  // ── Apple / iOS ───────────────────────────────────────────────────────────
  // Safari에서 "홈 화면에 추가" 시 동작 방식 제어

  appleWebApp: {
    // true: 홈화면에서 실행 시 Safari UI(주소창·탭바) 없이 전체화면으로 열림
    capable: true,

    // default: 흰 상태바 / black: 검은 상태바 / black-translucent: 투명(콘텐츠 영역 확장)
    statusBarStyle: 'black-translucent',

    // 홈화면 아이콘 아래 표시되는 앱 이름
    title: `${WEDDING.groom.en} & ${WEDDING.bride.en}`,

    // iOS 스플래시 스크린 (홈화면에서 앱 실행 시 잠깐 표시)
    // ⚠️ public/splash/ 폴더에 각 해상도별 이미지 준비 필요
    // 이미지 크기 = 디바이스 해상도(논리적 크기 × 배율)
    startupImage: [
      // ── iPhone ──────────────────────────────────────────────────────────
      // iPhone SE 1세대 (320×568 @2x) → 640×1136
      {
        url: '/splash/640x1136.png',
        media:
          '(device-width: 320px) and (device-height: 568px) and (-webkit-device-pixel-ratio: 2)',
      },
      // iPhone 6/7/8/SE 2세대 (375×667 @2x) → 750×1334
      {
        url: '/splash/750x1334.png',
        media:
          '(device-width: 375px) and (device-height: 667px) and (-webkit-device-pixel-ratio: 2)',
      },
      // iPhone 6+/7+/8+ (414×736 @3x) → 1242×2208
      {
        url: '/splash/1242x2208.png',
        media:
          '(device-width: 414px) and (device-height: 736px) and (-webkit-device-pixel-ratio: 3)',
      },
      // iPhone X/XS/11 Pro (375×812 @3x) → 1125×2436
      {
        url: '/splash/1125x2436.png',
        media:
          '(device-width: 375px) and (device-height: 812px) and (-webkit-device-pixel-ratio: 3)',
      },
      // iPhone XR/11 (414×896 @2x) → 828×1792
      {
        url: '/splash/828x1792.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 2)',
      },
      // iPhone XS Max/11 Pro Max (414×896 @3x) → 1242×2688
      {
        url: '/splash/1242x2688.png',
        media:
          '(device-width: 414px) and (device-height: 896px) and (-webkit-device-pixel-ratio: 3)',
      },
      // iPhone 12/13/14 (390×844 @3x) → 1170×2532
      {
        url: '/splash/1170x2532.png',
        media:
          '(device-width: 390px) and (device-height: 844px) and (-webkit-device-pixel-ratio: 3)',
      },
      // iPhone 12/13 Pro Max / 14 Plus (428×926 @3x) → 1284×2778
      {
        url: '/splash/1284x2778.png',
        media:
          '(device-width: 428px) and (device-height: 926px) and (-webkit-device-pixel-ratio: 3)',
      },
      // iPhone 14 Pro (393×852 @3x) → 1179×2556
      {
        url: '/splash/1179x2556.png',
        media:
          '(device-width: 393px) and (device-height: 852px) and (-webkit-device-pixel-ratio: 3)',
      },
      // iPhone 14 Pro Max / 15 Plus (430×932 @3x) → 1290×2796
      {
        url: '/splash/1290x2796.png',
        media:
          '(device-width: 430px) and (device-height: 932px) and (-webkit-device-pixel-ratio: 3)',
      },
      // iPhone 15 Pro (393×852 @3x) → 1179×2556 (14 Pro와 동일)
      // iPhone 15 Pro Max (430×932 @3x) → 1290×2796 (14 Pro Max와 동일)
      // ── iPad ────────────────────────────────────────────────────────────
      // iPad mini / iPad 9세대 (768×1024 @2x) → 1536×2048
      {
        url: '/splash/1536x2048.png',
        media:
          '(device-width: 768px) and (device-height: 1024px) and (-webkit-device-pixel-ratio: 2)',
      },
      // iPad Air / iPad Pro 10.5" (834×1112 @2x) → 1668×2224
      {
        url: '/splash/1668x2224.png',
        media:
          '(device-width: 834px) and (device-height: 1112px) and (-webkit-device-pixel-ratio: 2)',
      },
      // iPad Pro 11" (834×1194 @2x) → 1668×2388
      {
        url: '/splash/1668x2388.png',
        media:
          '(device-width: 834px) and (device-height: 1194px) and (-webkit-device-pixel-ratio: 2)',
      },
      // iPad Pro 12.9" (1024×1366 @2x) → 2048×2732
      {
        url: '/splash/2048x2732.png',
        media:
          '(device-width: 1024px) and (device-height: 1366px) and (-webkit-device-pixel-ratio: 2)',
      },
    ],
  },

  // ── 아이콘 ────────────────────────────────────────────────────────────────
  // ⚠️ 아래 경로의 파일들을 public/ 폴더에 모두 준비해야 함
  // Figma 등에서 SVG 아이콘 제작 후 https://favicon.io 등으로 변환 가능

  icons: {
    // 브라우저 탭 파비콘
    icon: [
      { url: '/favicon.ico', sizes: 'any' }, // 구버전 브라우저 호환
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' }, // 일반 탭
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }, // 레티나 탭
      { url: '/icon-96x96.png', sizes: '96x96', type: 'image/png' }, // 안드로이드 Chrome
      { url: '/icon-192x192.png', sizes: '192x192', type: 'image/png' }, // PWA 기본 아이콘
      { url: '/icon-512x512.png', sizes: '512x512', type: 'image/png' }, // PWA 스플래시
    ],

    // 즐겨찾기 아이콘 (브라우저마다 다름, icon과 같은 파일 사용 가능)
    shortcut: [{ url: '/favicon.ico' }],

    // iOS 홈화면 저장 시 아이콘 (Apple touch icon)
    // 배경색 없이 투명 PNG로 만들면 iOS가 자동으로 둥근 모서리 적용
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }, // 기본 (필수)
      {
        url: '/apple-touch-icon-152x152.png',
        sizes: '152x152',
        type: 'image/png',
      }, // iPad
      {
        url: '/apple-touch-icon-167x167.png',
        sizes: '167x167',
        type: 'image/png',
      }, // iPad Pro
    ],

    other: [
      // Safari 핀 탭용 단색 SVG 아이콘 — color는 핀 상태의 마스크 색상
      { rel: 'mask-icon', url: '/safari-pinned-tab.svg', color: BRAND_COLOR },
    ],
  },

  // ── PWA Web App Manifest ──────────────────────────────────────────────────
  // Chrome/Edge에서 "앱 설치" 배너, 홈화면 추가 기능 활성화
  // public/site.webmanifest 파일 내용은 아래에서 별도 생성
  manifest: '/site.webmanifest',

  // ── 기타 커스텀 메타 태그 ─────────────────────────────────────────────────
  // Next.js Metadata API가 직접 지원하지 않는 <meta name="..."> 태그들

  other: {
    // 전화번호 자동 링크 변환 방지 (iOS Safari 기본 동작)
    // 청첩장 계좌번호가 전화번호로 인식되는 것을 막음
    'format-detection': 'telephone=no, date=no, email=no, address=no',

    // Android Chrome에서 홈화면 추가 시 전체화면(Standalone) 모드
    // appleWebApp.capable의 Android 대응 버전
    'mobile-web-app-capable': 'yes',

    // Windows 8/10 시작화면 타일 색상
    'msapplication-TileColor': BRAND_COLOR,

    // Windows 8 라이브 타일 이미지 (144×144)
    'msapplication-TileImage': '/icon-144x144.png',

    // Windows Edge 즐겨찾기 색상
    'msapplication-navbutton-color': BRAND_COLOR,

    // Windows Phone 탭 하이라이트 제거
    'msapplication-tap-highlight': 'no',

    // 지원하는 색상 스킴 명시 (light | dark | light dark)
    // CSS color-scheme 속성과 연동됨
    'color-scheme': 'light dark',

    // Pinterest가 이 페이지의 이미지를 핀할 수 없도록 차단 (선택)
    // 허용하려면 이 줄 제거
    pinterest: 'nopin',

    // DNS 프리페치 힌트 — 외부 리소스 연결 속도 개선
    'x-dns-prefetch-control': 'on',
  },
};

// ─────────────────────────────────────────────────────────────────────────────
// Viewport
// Next.js 14+에서 viewport 설정은 metadata와 분리된 export로 관리
// https://nextjs.org/docs/app/api-reference/functions/generate-viewport
// ─────────────────────────────────────────────────────────────────────────────

export const viewport: Viewport = {
  // 모바일 뷰포트 설정
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1, // 핀치 줌 비활성화 (청첩장 레이아웃 보호)
  userScalable: false,

  // 지원하는 색상 스킴 (light | dark | only light 등)
  colorScheme: 'light dark',

  // 브라우저 주소창/상태바 색상 — 미디어쿼리로 라이트/다크 각각 지정
  // wedding 테마의 배경색과 맞춰 수정
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#f5efe8' }, // ivory 계열
    { media: '(prefers-color-scheme: dark)', color: '#1a1612' }, // 다크 계열
  ],

  // 가상 키보드가 올라올 때 레이아웃 처리 방식 (Next.js 14.1+)
  // resizes-visual: 키보드가 올라오면 시각적 뷰포트만 축소 (스크롤 유지)
  // resizes-content: 키보드가 올라오면 레이아웃 자체가 줄어듦
  interactiveWidget: 'resizes-visual',
};

// ─────────────────────────────────────────────────────────────────────────────
// Layout
// ─────────────────────────────────────────────────────────────────────────────

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="ko"
      data-theme={ACTIVE_THEME}
      className={`${playfair.variable} ${spaceGrotesk.variable} ${notoSans.variable} ${cormorant.variable}`}
    >
      <head>
        {/*
         * JSON-LD 구조화 데이터
         * 구글 검색에서 이벤트 카드로 표시될 수 있음
         * 여러 스키마를 배열로 전달하면 모두 적용됨
         */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify([jsonLdEvent, jsonLdWebsite]) }}
        />
      </head>

      <body>
        <Providers>{children}</Providers>

        <Toaster position="bottom-center" />
        {/*
         * Kakao JavaScript SDK
         * CH09 공유 버튼에서 카카오톡 공유 기능에 사용
         * NEXT_PUBLIC_KAKAO_APP_KEY 환경변수 설정 후 활성화
         * 앱키 없이 배포 시 shareKakao()가 LINK 복사로 폴백됨
         */}
        <Script
          src="https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
