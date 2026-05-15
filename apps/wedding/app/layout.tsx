import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Space_Grotesk } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import { ACTIVE_THEME } from '@/config/theme.config';

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

export const metadata: Metadata = {
  title: 'M & S · Wedding Invitation',
  description: '김민준 & 이서연의 결혼식에 초대합니다.',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" data-theme={ACTIVE_THEME}>
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
