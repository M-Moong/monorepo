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
  dateText: d.format('YYYY년 M월 D일\ndddd A h시 mm분'),
  dateShort: d.format('YYYY . MM · DD'),
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
    tagline: '일단 해보는 사람',
    facts: ['개발자 · 1995 · ENTP', '바디프로필 경력 1회'],
    account: { bank: '우리', number: '1002-945-117685' },
    father: {
      name: '신우근',
      account: { bank: '우리', number: '005-205984-02-001' },
    },
    mother: {
      name: '이인숙',
      account: { bank: '우리', number: '086-076535-12-201' },
    },
  },

  bride: {
    name: '김시은',
    en: 'Si eun',
    initial: 'SE',
    tagline: '작은 일에도 행복을 찾는 사람',
    facts: ['어린이집 교사 · 1998 · ENFJ', '여행 중독 말기'],
    account: { bank: '우리', number: '1002-156-204982' },
    father: {
      name: '🎗️ 김성준',
      account: { bank: '국민', number: '987-65-4321-098' },
    },
    mother: {
      name: '윤소라',
      account: { bank: '농협', number: '355-0061-4698-03' },
    },
  },

  inviteLines: [
    { text: '서로 다른 계절을 품은 두 사람이', highlight: true },
    { text: '서로를 이해하고 다름을 존중하며' },
    { text: '사랑을 키워왔습니다.' },
    { text: '' },
    { text: '기쁠 때는 웃음을 나누고' },
    { text: '어려울 때는 서로의 온기가 되어' },
    { text: '평생을 함께할 소중한 인연이 되었습니다.', highlight: true },
    { text: '' },
    { text: '새로운 시작의 자리에 함께하시어' },
    { text: '따뜻한 축복 보내주시면 감사하겠습니다.' },
  ],

  venue: {
    name: '더 바실리움',
    short: '더 바실리움',
    address: '경기 성남시 분당구 야탑동 344-1',
    detail: '8층',
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
        body: '수인분당선 야탑역 4번 출구\n도보 7분 ~ 10분\n코리아디자인센터 8층',
      },
      bus: {
        icon: '🚌',
        title: '버스',
        body: '야탑역 정류장 or 분당차병원앞 하차\n성남종합버스터미널 하차\n도보 5분 이내',
      },
      car: {
        icon: '🚗',
        title: '자가용',
        body: '건물 내 주차 가능\n600대 동시 주차 가능\n예식 하객 무료주차 (2시간)',
      },
      taxi: {
        icon: '🚕',
        title: '택시',
        body: "'코리아디자인센터' or '더 바실리움' 하차\n강남역 25분 / 판교역 15분",
      },
    },
  },

  photos: [
    '/photos/01.webp',
    '/photos/02.webp',
    '/photos/03.webp',
    '/photos/04.webp',
    '/photos/05.webp',
    '/photos/06.webp',
    '/photos/07.webp',
    '/photos/08.webp',
    '/photos/09.webp',
    '/photos/10.webp',
    '/photos/11.webp',
    '/photos/12.webp',
  ],
} as const;

export type TransportKey = keyof typeof WEDDING.venue.transport;
