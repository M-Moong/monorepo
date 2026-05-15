export const WEDDING = {
  date: new Date('2026-10-17T14:00:00+09:00'),
  dateText: '2026년 10월 17일 토요일 오후 2시',
  dateShort: '17 · 10 · 2026',

  groom: {
    name: '김민준',
    en: 'Minjun',
    full_en: 'Minjun Kim',
    father: '김영호',
    mother: '이정희',
    tagline: '느린 걸음, 깊은 마음',
    facts: ['건축가 · 1995', '커피 두 잔이 일상', '서연의 첫 청자, 마지막 청자'],
  },

  bride: {
    name: '이서연',
    en: 'Seoyeon',
    full_en: 'Seoyeon Lee',
    father: '이상철',
    mother: '박미경',
    tagline: '문장이 되는 사람',
    facts: ['에디터 · 1996', '책과 산책을 모음', '민준의 가장 솔직한 독자'],
  },

  inviteMessage: `함께 걸어온 5년의 길 끝에서\n새로운 길의 시작을 약속하려 합니다.\n\n맑은 가을 어느 토요일,\n가장 아끼는 분들 앞에서\n서로의 평생을 약속하는 자리에\n당신을 정중히 모십니다.`,

  venue: {
    name: '그랜드하얏트 서울 그랜드볼룸',
    short: '그랜드하얏트 서울',
    address: '서울시 용산구 소월로 322',
    detail: '본관 3층 그랜드볼룸',
    mapUrl: '',
    mapUrls: {
      kakao: 'https://map.kakao.com/link/map/그랜드하얏트서울,37.539565,126.992161',
      naver: 'https://map.naver.com/v5/search/그랜드하얏트서울',
      tmap: 'https://tmap.life/place?lat=37.539565&lng=126.992161&name=그랜드하얏트서울',
    },
    transport: {
      subway: {
        icon: '🚇',
        title: '지하철',
        body: '6호선 한강진역 1번 출구\n도보 8분 (셔틀버스 5분 간격)',
      },
      bus: { icon: '🚌', title: '버스', body: '광역 9408, 간선 110A · 400\n한강진역 정류장 하차' },
      car: { icon: '🚗', title: '자가용', body: '내비 "그랜드하얏트 서울"\n발렛파킹 무료 (4시간)' },
      taxi: { icon: '🚕', title: '택시', body: '서울역에서 약 15분\n강남역에서 약 20분' },
    },
  },

  accounts: {
    groom: [
      { who: '신랑', name: '김민준', bank: '신한', number: '110-123-456789' },
      { who: '신랑 아버지', name: '김영호', bank: '신한', number: '110-987-654321' },
      { who: '신랑 어머니', name: '이정희', bank: '신한', number: '110-456-789012' },
    ],
    bride: [
      { who: '신부', name: '이서연', bank: '국민', number: '123-45-6789-012' },
      { who: '신부 아버지', name: '이상철', bank: '국민', number: '987-65-4321-098' },
      { who: '신부 어머니', name: '박미경', bank: '국민', number: '456-78-9012-345' },
    ],
  },

  photos: [
    '/photos/01.jpg',
    '/photos/02.jpg',
    '/photos/03.jpg',
    '/photos/04.jpg',
    '/photos/05.jpg',
    '/photos/06.jpg',
    '/photos/07.jpg',
    '/photos/08.jpg',
    '/photos/09.jpg',
  ],
} as const;

export type TransportKey = keyof typeof WEDDING.venue.transport;
