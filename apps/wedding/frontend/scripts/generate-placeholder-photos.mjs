#!/usr/bin/env node
/**
 * 빌드/개발 서버 시작 시 public/photos/ 에 플레이스홀더 PNG를 자동 생성합니다.
 * 외부 의존성 없이 Node.js 내장 zlib만 사용합니다.
 * 파일이 이미 존재하면 덮어쓰지 않습니다 (실제 사진으로 교체 가능).
 */

import { deflateSync } from 'zlib';
import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, '../public/photos');

// ── PNG 생성 유틸 ─────────────────────────────────────────────────────────────

const CRC_TABLE = (() => {
  const t = new Uint32Array(256);
  for (let i = 0; i < 256; i++) {
    let c = i;
    for (let j = 0; j < 8; j++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[i] = c;
  }
  return t;
})();

function crc32(buf) {
  let crc = 0xffffffff;
  for (const byte of buf) crc = (crc >>> 8) ^ CRC_TABLE[(crc ^ byte) & 0xff];
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type, data) {
  const typeBuf = Buffer.from(type, 'ascii');
  const lenBuf = Buffer.alloc(4);
  lenBuf.writeUInt32BE(data.length);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([typeBuf, data])));
  return Buffer.concat([lenBuf, typeBuf, data, crcBuf]);
}

function hexToRgb(hex) {
  const n = parseInt(hex.replace('#', ''), 16);
  return [(n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff];
}

/**
 * 지정한 색상의 솔리드 PNG 버퍼를 생성합니다.
 * @param {number} width
 * @param {number} height
 * @param {string} hex  '#rrggbb' 형식
 */
function createSolidPNG(width, height, hex) {
  const [r, g, b] = hexToRgb(hex);

  const sig = Buffer.from([137, 80, 78, 71, 13, 10, 26, 10]);

  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(width, 0);
  ihdr.writeUInt32BE(height, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // color type: truecolor RGB

  // 각 스캔라인: filter byte(0=None) + RGB pixels
  const row = Buffer.alloc(1 + width * 3);
  for (let x = 0; x < width; x++) {
    row[1 + x * 3] = r;
    row[2 + x * 3] = g;
    row[3 + x * 3] = b;
  }
  const raw = Buffer.concat(Array.from({ length: height }, () => row));

  return Buffer.concat([
    sig,
    pngChunk('IHDR', ihdr),
    pngChunk('IDAT', deflateSync(raw, { level: 6 })),
    pngChunk('IEND', Buffer.alloc(0)),
  ]);
}

// ── 사진 목록 ─────────────────────────────────────────────────────────────────
// Ch04Gallery의 TONES 순서에 맞춰 PhotoFrame 팔레트 색상과 일치시킴
// 실제 사진으로 교체하려면 public/photos/ 에 동일 파일명으로 덮어쓰세요.

const PHOTOS = [
  { file: '01.png', color: '#dedede' }, // mono
  { file: '02.png', color: '#d0bba0' }, // sepia
  { file: '03.png', color: '#e0d5c3' }, // warm
  { file: '04.png', color: '#e4dac9' }, // paper
  { file: '05.png', color: '#c8d3c3' }, // sage
  { file: '06.png', color: '#e1cbc4' }, // blush
  { file: '07.png', color: '#d4d9df' }, // cool
  { file: '08.png', color: '#dedede' }, // mono
  { file: '09.png', color: '#d0bba0' }, // sepia
];

// 3:4 비율 (Lightbox의 aspect-[3/4]에 맞춤)
const WIDTH = 600;
const HEIGHT = 800;

// ── 실행 ──────────────────────────────────────────────────────────────────────

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });

let generated = 0;
for (const { file, color } of PHOTOS) {
  const dest = join(OUT_DIR, file);
  if (!existsSync(dest)) {
    writeFileSync(dest, createSolidPNG(WIDTH, HEIGHT, color));
    generated++;
  }
}

if (generated > 0) {
  console.log(`✓ ${generated}개의 플레이스홀더 사진 생성 → public/photos/`);
} else {
  console.log(`✓ public/photos/ 이미 존재함 (건너뜀)`);
}
