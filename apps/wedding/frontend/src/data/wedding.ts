export const WEDDING = {
  date: new Date('2026-10-17T14:00:00+09:00'),
  dateText: '2026년 10월 17일 토요일 오후 2시',

  groom: {
    name: '김민준',
    en: 'Minjun',
    tagline: '느린 걸음, 깊은 마음',
    facts: ['건축가 · 1995', '커피 두 잔이 일상', '서연의 첫 청자, 마지막 청자'],
    account: { bank: '신한', number: '110-123-456789' },
    father: { name: '김영호', account: { bank: '신한', number: '110-987-654321' } },
    mother: { name: '이정희', account: { bank: '신한', number: '110-456-789012' } },
  },

  bride: {
    name: '이서연',
    en: 'Seoyeon',
    tagline: '문장이 되는 사람',
    facts: ['에디터 · 1996', '책과 산책을 모음', '민준의 가장 솔직한 독자'],
    account: { bank: '국민', number: '123-45-6789-012' },
    father: { name: '이상철', account: { bank: '국민', number: '987-65-4321-098' } },
    mother: { name: '박미경', account: { bank: '국민', number: '456-78-9012-345' } },
  },

  inviteMessage: `함께 걸어온 5년의 길 끝에서\n새로운 길의 시작을 약속하려 합니다.\n\n맑은 가을 어느 토요일,\n가장 아끼는 분들 앞에서\n서로의 평생을 약속하는 자리에\n당신을 정중히 모십니다.`,
  inviteHighlightLine: 3,

  venue: {
    name: '그랜드하얏트 서울 그랜드볼룸',
    short: '그랜드하얏트 서울',
    address: '서울시 용산구 소월로 322',
    detail: '본관 3층 그랜드볼룸',
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
