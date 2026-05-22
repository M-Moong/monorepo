import dayjs from 'dayjs';
import 'dayjs/locale/ko';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
dayjs.locale('ko');

const KST = 'Asia/Seoul';

const d = dayjs.tz('2026-10-24T17:20:00', KST);
const dEnd = d.add(3, 'hour');

export const WEDDING = {
  date: d.toDate(),
  dateText: d.format('YYYY년 M월 D일 dddd A h시'),
  dateShort: d.format('YYYY · MM · DD'),
  dateDot: d.format('YYYY.MM.DD'),
  timeText: d.format('ddd HH:mm').toUpperCase(),
  isoStart: d.format('YYYY-MM-DDTHH:mm:00+09:00'),
  isoEnd: dEnd.format('YYYY-MM-DDTHH:mm:00+09:00'),
  utcStart: d.utc().format('YYYYMMDDTHHmmss') + 'Z',
  utcEnd: dEnd.utc().format('YYYYMMDDTHHmmss') + 'Z',

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
