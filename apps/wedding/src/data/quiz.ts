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
    question: '두 사람의 카톡 대화에서 가장 많이 등장하는 말은?',
    choices: ['오늘 뭐 먹지?', '어디야?', '하이', 'ㅋㅋㅋㅋㅋㅋㅋ'],
    answerIndex: 2,
    reveal: {
      photo: WEDDING.photos[0],
      caption: "'하이'가 이렇게 결혼식까지 이어질 줄은 몰랐습니다.",
    },
  },
  {
    id: 'wedding-planning-phrase',
    question: '데이트 메뉴를 정할 때 두 사람의 모습은?',
    choices: ['바로 결정한다', '서로 아무거나라고 한다', '그냥 네가 골라', '맛집 검색만 30분'],
    answerIndex: 1,
    reveal: {
      photo: WEDDING.photos[1],
      caption: "'아무거나'라는 가장 어려운 선택지를 매번 해결해 왔습니다.",
    },
  },
  {
    id: 'travel-style',
    question: '두 사람의 주말을 한 줄로 표현하면?',
    choices: ['계획대로 완벽', '눈 뜨니 저녁', '먹다가 끝남', '계획은 있었음'],
    answerIndex: 3,
    reveal: {
      photo: WEDDING.photos[2],
      caption: '계획은 늘 있었고, 실행은 미래의 우리에게 맡겼습니다.',
    },
  },
  {
    id: 'netflix-mode',
    question: '두 사람이 넷플릭스를 켜면?',
    choices: [
      '보다가 딴짓한다',
      '딱 한 편만 본다',
      '다음 화 자동재생의 노예가 된다',
      '중간에 잠든다',
    ],
    answerIndex: 2,
    reveal: {
      photo: WEDDING.photos[3],
      caption: '다음 화 보기 버튼은 누른 적 없는데, 이상하게 끝까지 보게 됩니다.',
    },
  },
  {
    id: 'romance-genre',
    question: '두 사람의 연애를 영화 장르로 표현한다면?',
    choices: ['로맨틱 코미디', '휴먼 다큐멘터리', '액션 어드벤처', '생존 스릴러'],
    answerIndex: 0,
    reveal: {
      photo: WEDDING.photos[4],
      caption: '진지하게 만나기 시작했는데 계속 웃기기만 했습니다.',
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
    desc: '혹시 잘못된 링크로 들어오신 건 아니죠?',
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
    desc: '이 정도면 식장에서 아는 척 가능합니다.',
  },
  {
    score: 4,
    label: '★★★★☆',
    title: '한 문제는 봐드릴게요',
    desc: '긴장만 안 했어도 만점이었을 텐데요.',
  },
  {
    score: 5,
    label: '★★★★★',
    title: '저희를 스토킹하셨나요...?',
    desc: '다음 명절에 오셔도 어색하지 않을 것 같아요.',
  },
];

export function tierFor(score: number): ResultTier {
  return RESULT_TIERS.find((tier) => tier.score === score) ?? RESULT_TIERS[0]!;
}
