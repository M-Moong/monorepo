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
  dateText: d.format('YYYY년 M월 D일\ndddd A h시'),
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
    tagline: '말보다 행동으로 진심을 전하는 사람, 신랑 신승민',
    facts: ['개발자 · 1995', 'ENTP', '하루에 커피 꼭 2잔 먹음'],
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
    tagline: '사소한 순간도 특별한 추억으로 만드는 사람, 신부 김시은',
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
    // { text: '함께 걸어온 8년의 길 끝에서' },
    // { text: '새로운 길의 시작을 약속하려 합니다.' },
    // { text: '' },
    // { text: '맑은 가을 어느 토요일,', highlight: true },
    // { text: '가장 아끼는 분들 앞에서' },
    // { text: '서로의 평생을 약속하는 자리에' },
    // { text: '당신을 정중히 모십니다.' },
    // ======================================
    // { text: '서로 다른 계절을 품은 두 사람이 만나' },
    // { text: '각자의 시간 속에서 서로를 이해하고' },
    // { text: '서로의 다름을 존중하며 사랑을 키워왔습니다.' },
    // { text: '때로는 따뜻한 봄날처럼 웃음을 나누고,' },
    // { text: '때로는 차가운 겨울날처럼 서로에게 온기가 되어주며' },
    // { text: '평생을 함께할 소중한 인연이 되었습니다' },
    // { text: '이제 두 사람은 서로의 가장 든든한 편이 되어' },
    // { text: '같은 계절을 만들어가고자 합니다' },
    // { text: '소중한 분들을 모시고 새로운 시작의 첫걸음을 내딛고자 하오니' },
    // { text: '함께하시어 따뜻한 축복과 격려를 보내주시면 감사하겠습니다' },
    // ======================================
    { text: '서로 다른 계절을 품은 두 사람이', highlight: true },
    { text: '서로를 이해하고 다름을 존중하며' },
    { text: '사랑을 키워왔습니다.' },
    { text: '' },
    { text: '기쁠 때는 웃음을 나누고' },
    { text: '어려울 때는 서로의 온기가 되어' },
    { text: '이제 평생을 함께할 소중한 인연이 되었습니다.', highlight: true },
    { text: '' },
    { text: '새로운 시작의 자리에 함께하시어' },
    { text: '따뜻한 축복 보내주시면 감사하겠습니다.' },
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
        body: '야탑역 5분\n판교역 15분\n"코리아디자인센터" or "더 바실리움" 하차',
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
