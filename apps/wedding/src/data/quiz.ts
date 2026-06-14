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

export const QUIZ: QuizQuestion[] = [
  {
    id: 'favorite-date',
    question: '두 사람이 가장 자주 하는 데이트는?',
    choices: ['맛집 찾아가기', '카페 투어', '집에서 OTT 보기', '무계획 드라이브'],
    answerIndex: 0,
    reveal: {
      photo: WEDDING.photos[0],
      caption: '데이트의 시작은 늘 같습니다. 그래서 오늘 뭐 먹지?',
    },
  },
  {
    id: 'wedding-planning-phrase',
    question: '결혼 준비 중 두 사람이 가장 많이 한 말은?',
    choices: ['이게 왜 이렇게 비싸?', '결혼 빡세다.', '그냥 네가 골라', '일단 밥부터 먹자'],
    answerIndex: 1,
    reveal: {
      photo: WEDDING.photos[1],
      caption: '결혼은 행복하지만, 결혼 준비는 빡셌습니다.',
    },
  },
  {
    id: 'travel-style',
    question: '두 사람의 여행 스타일은?',
    choices: ['분 단위 계획형', '맛집만 예약형', '숙소에서 힐링형', '일단 레스고'],
    answerIndex: 3,
    reveal: {
      photo: WEDDING.photos[2],
      caption: '계획은 미래의 우리가 세우겠죠. 일단 레스고!',
    },
  },
  {
    id: 'disappears-fastest',
    question: '둘이 함께 있을 때 가장 빨리 사라지는 것은?',
    choices: ['시간', '간식', '휴대폰 배터리', '수건'],
    answerIndex: 3,
    reveal: {
      photo: WEDDING.photos[3],
      caption: '분명 많이 샀는데 이상하게 늘 부족한 수건.',
    },
  },
  {
    id: 'romance-genre',
    question: '두 사람의 연애를 영화 장르로 표현한다면?',
    choices: ['로맨틱 코미디', '휴먼 다큐멘터리', '액션 어드벤처', '생존 스릴러'],
    answerIndex: 0,
    reveal: {
      photo: WEDDING.photos[4],
      caption: '로맨스는 확실하고, 코미디는 매일 갱신 중입니다.',
    },
  },
];

/*
 * 나중에 검토할 퀴즈 후보
 *
 * 1. 데이트 메뉴를 정할 때 두 사람의 모습은?
 *    바로 결정한다 / 서로 아무거나라고 한다 / 맛집 검색만 30분 / 결국 늘 먹던 걸 먹는다
 *
 * 2. 두 사람의 카톡 대화에서 가장 많이 등장하는 말은?
 *    뭐 먹지? / 어디야? / 보고 싶어 / ㅋㅋㅋㅋㅋ
 *
 * 3. 두 사람이 집에서 영화를 볼 때 벌어지는 일은?
 *    시작 전에 잠든다 / 계속 질문한다 / 간식만 먹는다 / 고르다가 포기한다
 *
 * 4. 두 사람에게 갑자기 하루의 휴가가 생긴다면?
 *    당일치기 여행 / 맛집 투어 / 하루 종일 집콕 / 계획하다 하루가 끝난다
 *
 * 5. 두 사람의 사진첩에 가장 많은 사진은?
 *    서로의 사진 / 음식 사진 / 여행 풍경 / 흔들린 실패작
 *
 * 6. 두 사람이 늦잠을 잔 주말 아침에 가장 먼저 하는 일은?
 *    브런치 검색 / 다시 잠들기 / 배달 앱 켜기 / 누가 먼저 씻을지 눈치 보기
 *
 * 7. 결혼식이 끝난 직후 두 사람이 가장 먼저 할 말은?
 *    드디어 끝났다! / 우리 진짜 결혼했네? / 사진 잘 나왔을까? / 이제 뭐 먹지?
 *
 * 8. 두 사람이 함께 장을 보러 가면 생기는 일은?
 *    목록대로 정확히 산다 / 간식만 잔뜩 산다 / 필요한 것을 빼먹는다 / 예산보다 두 배 쓴다
 *
 * 9. 신혼여행에서 가장 많이 할 것 같은 말은?
 *    사진 한 장만 더! / 이거 얼마야? / 우리 어디로 가야 해? / 일단 뭐 좀 먹자
 *
 * 10. 두 사람이 로또에 당첨된다면 가장 먼저 할 일은?
 *     집부터 산다 / 세계여행을 떠난다 / 가족에게 알린다 / 아무에게도 말하지 않는다
 */

export interface ResultTier {
  score: number;
  label: string;
  title: string;
  desc: string;
}

export const RESULT_TIERS: ResultTier[] = [
  {
    score: 0,
    label: '☆☆☆☆☆',
    title: '당신은 누구시죠...?',
    desc: '일단 청첩장부터 다시 읽고 오시는 걸로 해요.',
  },
  {
    score: 1,
    label: '★☆☆☆☆',
    title: '청첩장은 제대로 받으셨죠?',
    desc: '한 문제는 맞혔으니 완전 초면은 아닌 걸로 할게요.',
  },
  {
    score: 2,
    label: '★★☆☆☆',
    title: '어디서 본 사이는 맞네요',
    desc: '조금만 더 관심을 가져주셨다면 좋았을 텐데요.',
  },
  {
    score: 3,
    label: '★★★☆☆',
    title: '제법 가까운 사이군요',
    desc: '이 정도면 식장에서 아는 척하셔도 됩니다.',
  },
  {
    score: 4,
    label: '★★★★☆',
    title: '한 문제는 봐드릴게요',
    desc: '실수였다는 거 알아요. 저희가 너그럽게 넘어갈게요.',
  },
  {
    score: 5,
    label: '★★★★★',
    title: '저희를 스토킹하셨나요...?',
    desc: '이 정도면 저희보다 저희를 더 잘 아시는데요.',
  },
];

export function tierFor(score: number): ResultTier {
  return RESULT_TIERS.find((tier) => tier.score === score) ?? RESULT_TIERS[0]!;
}
