function formatKoreanDateTime(date: Date): string {
  const weekdays = ['일', '월', '화', '수', '목', '금', '토'];
  const kst = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const year = kst.getFullYear();
  const month = kst.getMonth() + 1;
  const day = kst.getDate();
  const weekday = weekdays[kst.getDay()];
  const hour = kst.getHours();
  const ampm = hour < 12 ? '오전' : '오후';
  const h = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  return `${year}년 ${month}월 ${day}일 ${weekday}요일 ${ampm} ${h}시`;
}

function formatDateDotSep(date: Date): string {
  const kst = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const day = String(kst.getDate()).padStart(2, '0');
  const month = String(kst.getMonth() + 1).padStart(2, '0');
  const year = kst.getFullYear();
  return `${year} · ${month} · ${day}`;
}

function formatDateDot(date: Date): string {
  const kst = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const day = String(kst.getDate()).padStart(2, '0');
  const month = String(kst.getMonth() + 1).padStart(2, '0');
  const year = kst.getFullYear();
  return `${year}.${month}.${day}`;
}

function toUtcCompact(date: Date): string {
  return date.toISOString().replace(/[-:]/g, '').slice(0, 15) + 'Z';
}

function toKstIso(date: Date): string {
  const kst = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const pad = (n: number) => String(n).padStart(2, '0');
  return (
    `${kst.getFullYear()}-${pad(kst.getMonth() + 1)}-${pad(kst.getDate())}` +
    `T${pad(kst.getHours())}:${pad(kst.getMinutes())}:00+09:00`
  );
}

function formatTimeText(date: Date): string {
  const weekdays = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const kst = new Date(date.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
  const weekday = weekdays[kst.getDay()];
  const hour = kst.getHours();
  const minute = kst.getMinutes();
  const h = String(hour).padStart(2, '0');
  const m = String(minute).padStart(2, '0');
  return `${weekday} ${h}:${m}`;
}

const weddingDate = new Date('2026-10-24T17:20:00+09:00');
const weddingEndDate = new Date(weddingDate.getTime() + 3 * 60 * 60 * 1000);

export const WEDDING = {
  date: weddingDate,
  dateText: formatKoreanDateTime(weddingDate),
  dateShort: formatDateDotSep(weddingDate),
  dateDot: formatDateDot(weddingDate),
  timeText: formatTimeText(weddingDate),
  isoStart: toKstIso(weddingDate),
  isoEnd: toKstIso(weddingEndDate),
  utcStart: toUtcCompact(weddingDate),
  utcEnd: toUtcCompact(weddingEndDate),

  groom: {
    name: '신승민',
    en: 'Seung min',
    initial: 'SM',
    tagline: '느린 걸음, 깊은 마음',
    facts: ['개발자 · 1995', '커피 두 잔이 일상', '서연의 첫 청자, 마지막 청자'],
    account: { bank: '신한', number: '110-123-456789' },
    father: {
      name: '신우근',
      account: { bank: '신한', number: '110-987-654321' },
    },
    mother: {
      name: '이인숙',
      account: { bank: '신한', number: '110-456-789012' },
    },
  },

  bride: {
    name: '김시은',
    en: 'Si eun',
    initial: 'SE',
    tagline: '문장이 되는 사람',
    facts: ['어린이집 교사 · 1998', '책과 산책을 모음', '민준의 가장 솔직한 독자'],
    account: { bank: '국민', number: '123-45-6789-012' },
    father: {
      name: '김성준',
      account: { bank: '국민', number: '987-65-4321-098' },
    },
    mother: {
      name: '윤소라',
      account: { bank: '국민', number: '456-78-9012-345' },
    },
  },

  inviteLines: [
    { text: '함께 걸어온 8년의 길 끝에서' },
    { text: '새로운 길의 시작을 약속하려 합니다.' },
    { text: '' },
    { text: '맑은 가을 어느 토요일,', highlight: true },
    { text: '가장 아끼는 분들 앞에서' },
    { text: '서로의 평생을 약속하는 자리에' },
    { text: '당신을 정중히 모십니다.' },
  ],

  venue: {
    name: '더 바실리움',
    short: '더 바실리움',
    address: '경기 성남시 분당구 야탑동 344-1',
    detail: '8층 단독홀',
    mapUrls: {
      // kakao: 'https://map.kakao.com/link/map/그랜드하얏트서울,37.539565,126.992161',
      kakao: 'https://kko.to/HjMuUBXPae',
      // naver: 'https://map.naver.com/v5/search/그랜드하얏트서울',
      naver: 'https://map.naver.com/p/entry/place/1781336022?c=15.54,0,0,0,dh',
      tmap: 'https://tmap.life/place?lat=37.3995&lng=127.1272&name=더바실리움',
    },
    transport: {
      subway: {
        icon: '🚇',
        title: '지하철',
        body: '수인분당선 야탑역 4번 출구\n도보 7분 ~ 10분',
      },
      bus: {
        icon: '🚌',
        title: '버스',
        body: '야탑역 정류장 하차\n성남종합버스터미널 하차\n도보 5분 이내',
      },
      car: {
        icon: '🚗',
        title: '자가용',
        body: '코리아디자인센터 내 위치\n건물 내 주차 가능\n예식 하객 무료주차',
      },
      taxi: {
        icon: '🚕',
        title: '택시',
        body: '야탑역 5분\n판교역 15분\n코리아디자인센터 하차',
      },
    },
  },

  photos: [
    '/photos/01.png',
    '/photos/02.png',
    '/photos/03.png',
    '/photos/04.png',
    '/photos/05.png',
    '/photos/06.png',
    '/photos/07.png',
    '/photos/08.png',
    '/photos/09.png',
  ],
} as const;

export type TransportKey = keyof typeof WEDDING.venue.transport;
