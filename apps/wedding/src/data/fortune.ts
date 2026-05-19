import { WEDDING } from "./wedding";

export interface Vibe {
  tag: string;
  q: string;
  a: string;
}

export const VIBES: Vibe[] = [
  {
    tag: "#오늘의나",
    q: "나를 아끼는 일이\n오늘의 가장 큰 일.",
    a: "— 너에게",
  },
  { tag: "#월요병퇴치", q: "뭐든 일단\n해보고 후회하자.", a: "— 26살의 결심" },
  {
    tag: "#럭키비키",
    q: "잘 안 풀리면\n잘 풀리려고 그러는 거임.",
    a: "— 럭키비키 마인드",
  },
  {
    tag: "#소소행",
    q: "커피 한 모금에\n하루가 살짝 괜찮아짐.",
    a: "— 화요일 오전",
  },
  { tag: "#무지성긍정", q: "되면 좋고\n안 되면 더 좋고.", a: "— MZ식 단단함" },
  {
    tag: "#나에게진심",
    q: "남 눈치 한 스푼 빼고\n내 기분 한 스푼 더.",
    a: "— 레시피",
  },
  { tag: "#마음근육", q: "오늘 안 한다고\n인생 망하지 않음.", a: "— 진짜임" },
  {
    tag: "#럽스타그램",
    q: "좋은 사람 옆에 있으면\n나도 좋은 사람이 됨.",
    a: `— ${WEDDING.groom.initial} & ${WEDDING.bride.initial}로부터`,
  },
  {
    tag: "#긍정스택",
    q: "될 일은 되고\n안 될 일은 안 가도 됨.",
    a: "— 우주의 흐름",
  },
  { tag: "#존버는승리", q: "버티는 게 아니라\n쌓이는 중.", a: "— 너의 시간" },
  {
    tag: "#MBTI관계없음",
    q: "결국 다정한 사람이\n이긴다.",
    a: "— 통계 없음 사실임",
  },
  {
    tag: "#결혼식초대",
    q: "좋은 사람들끼리\n좋은 날 모이자.",
    a: `— ${WEDDING.dateDot}`,
  },
];

export const PALETTES: [string, string][] = [
  ["#ff9a9e", "#fad0c4"],
  ["#a18cd1", "#fbc2eb"],
  ["#ffecd2", "#fcb69f"],
  ["#84fab0", "#8fd3f4"],
  ["#fccb90", "#d57eeb"],
  ["#fdcbf1", "#e6dee9"],
  ["#a1c4fd", "#c2e9fb"],
  ["#ff9a8b", "#ff6a88"],
  ["#fbc2eb", "#a6c1ee"],
  ["#fdfcfb", "#e2d1c3"],
  ["#c2e9fb", "#a1c4fd"],
  ["#ffd6a5", "#ffadad"],
];
