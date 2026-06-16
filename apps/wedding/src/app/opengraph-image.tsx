import { readFile } from 'node:fs/promises';
import { ImageResponse } from 'next/og';
import { WEDDING } from '@/data/wedding';

export const alt = `${WEDDING.groom.name} ♥ ${WEDDING.bride.name} 결혼식 청첩장`;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default async function OpengraphImage() {
  const imageBuffer = await readFile(
    new URL('../../public/photos/02-og-source.png', import.meta.url)
  );
  const imageUrl = `data:image/png;base64,${imageBuffer.toString('base64')}`;

  return new ImageResponse(
    <div
      style={{
        position: 'relative',
        display: 'flex',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        background: '#121212',
      }}
    >
      <img
        src={imageUrl}
        alt={alt}
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center 30%',
        }}
      />

      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(180deg, rgba(0,0,0,0.08) 0%, rgba(0,0,0,0.2) 45%, rgba(0,0,0,0.78) 100%)',
        }}
      />

      <div
        style={{
          position: 'absolute',
          left: 72,
          right: 72,
          bottom: 60,
          display: 'flex',
          flexDirection: 'column',
          gap: 12,
          color: '#ffffff',
        }}
      >
        <div
          style={{
            display: 'flex',
            fontSize: 34,
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.82)',
          }}
        >
          2026년 10월 24일 토요일 오후 5시
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 64,
            fontWeight: 700,
            letterSpacing: '-0.04em',
          }}
        >
          {WEDDING.groom.name} ♥ {WEDDING.bride.name}
        </div>
        <div
          style={{
            display: 'flex',
            fontSize: 34,
            fontWeight: 500,
            letterSpacing: '-0.02em',
            color: 'rgba(255,255,255,0.82)',
          }}
        >
          {WEDDING.venue.name}
        </div>
      </div>
    </div>,
    size
  );
}
