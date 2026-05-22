import { WEDDING } from './wedding';

export interface QuizQuestion {
  id: string;
  question: string;
  choices: string[];
  answerIndex: number;
  reveal: {
    photo?: string;
    caption: string;
  };
}

// ⚠️ 더미 데이터입니다. answerIndex와 reveal.caption을 실제 이야기로 교체하세요.
export const QUIZ: QuizQuestion[] = [
  {
    id: 'first-meet',
    question: '두 사람이 처음 만난 곳은?',
    choices: ['대학교 동아리', '회사 신입 OT', '친구 소개팅', '서점 책방'],
    answerIndex: 2,
    reveal: {
      photo: WEDDING.photos[0],
      caption: '2021년 봄, 친구가 차려준 자리에서 처음 마주쳤어요.',
    },
  },
  {
    id: 'groom-job',
    question: '신랑의 직업은?',
    choices: ['디자이너', '개발자', '교사', '사진작가'],
    answerIndex: 1,
    reveal: {
      photo: WEDDING.photos[1],
      caption: '코드 짜는 시간만큼 시은이 생각도 많이 했다고.',
    },
  },
  {
    id: 'bride-job',
    question: '신부의 직업은?',
    choices: ['간호사', '회사원', '어린이집 교사', '작가'],
    answerIndex: 2,
    reveal: {
      photo: WEDDING.photos[2],
      caption: '매일 아이들과 함께하는 사람, 그래서 더 따뜻해요.',
    },
  },
  {
    id: 'dating-years',
    question: '두 사람이 사귄 기간은?',
    choices: ['2년', '3년', '4년', '5년'],
    answerIndex: 3,
    reveal: {
      photo: WEDDING.photos[3],
      caption: '함께 걸어온 5년의 길 끝에서 새 출발을 합니다.',
    },
  },
  {
    id: 'groom-routine',
    question: '신랑이 하루도 빠뜨리지 않는 것은?',
    choices: ['새벽 운동', '커피 두 잔', '넷플릭스', '독서'],
    answerIndex: 1,
    reveal: {
      photo: WEDDING.photos[4],
      caption: '아침 한 잔, 오후 한 잔 — 빠지면 하루가 안 풀려요.',
    },
  },
  {
    id: 'bride-hobby',
    question: '신부가 즐기는 취미 두 가지는?',
    choices: ['요리 · 영화', '그림 · 음악', '운동 · 게임', '책 · 산책'],
    answerIndex: 3,
    reveal: {
      photo: WEDDING.photos[5],
      caption: '책 한 권 들고 산책하는 게 신부의 완벽한 하루.',
    },
  },
  {
    id: 'propose',
    question: '신랑이 프러포즈한 장소는?',
    choices: ['남산 N서울타워', '제주 협재 바다', '한강 벚꽃길', '집 거실'],
    answerIndex: 2,
    reveal: {
      photo: WEDDING.photos[6],
      caption: '벚꽃이 가장 짙던 날, 한강에서.',
    },
  },
  {
    id: 'venue',
    question: '결혼식 장소는?',
    choices: ['그랜드 하얏트 서울', '더 바실리움', '롯데호텔', '파크하얏트'],
    answerIndex: 1,
    reveal: {
      caption: '경기 성남 야탑동, 8층 단독홀에서 만나요.',
    },
  },
  {
    id: 'wedding-date',
    question: '결혼식 날짜는?',
    choices: ['2026년 9월 20일', '2026년 10월 10일', '2026년 10월 17일', '2026년 10월 24일'],
    answerIndex: 3,
    reveal: {
      caption: '맑은 가을 토요일, 2026년 10월 24일입니다.',
    },
  },
  {
    id: 'start-year',
    question: '두 사람의 연애가 시작된 연도는?',
    choices: ['2019년', '2020년', '2021년', '2022년'],
    answerIndex: 2,
    reveal: {
      photo: WEDDING.photos[8],
      caption: '5년 전인 2021년, 그 자리가 시작이었어요.',
    },
  },
];

export interface ResultTier {
  min: number;
  label: string;
  title: string;
  desc: string;
}

export const RESULT_TIERS: ResultTier[] = [
  {
    min: 9,
    label: '★★★',
    title: '베프 인증',
    desc: '우리를 너무 잘 아는 당신, 식장 맨 앞자리 예약입니다.',
  },
  {
    min: 6,
    label: '★★☆',
    title: '꽤 가까운 사이',
    desc: '한 잔 더 마시면 다 알게 될 것 같아요.',
  },
  {
    min: 3,
    label: '★☆☆',
    title: '이제부터 친해져요',
    desc: '식장에서 인사 한번 꼭 해주세요.',
  },
  {
    min: 0,
    label: '☆☆☆',
    title: '초면이시군요',
    desc: '2026년 10월 24일, 만나서 알아가요.',
  },
];

export function tierFor(score: number): ResultTier {
  return RESULT_TIERS.find((t) => score >= t.min) ?? RESULT_TIERS[RESULT_TIERS.length - 1]!;
}
