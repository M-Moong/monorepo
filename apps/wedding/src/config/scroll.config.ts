/**
 * ╔══════════════════════════════════════════════════════════════╗
 * ║              스크롤 & 챕터 전환 통합 설정                        ║
 * ╠══════════════════════════════════════════════════════════════╣
 * ║  챕터 순서/방향을 바꾸려면 이 파일만 수정하면 됩니다.                ║
 * ╚══════════════════════════════════════════════════════════════╝
 *
 * transition:
 *   'scroll' — 일반 세로 스크롤 (위→아래)
 *   'slide'  — PPT처럼 가로 슬라이드 (세로 스크롤 → 오른쪽→왼쪽으로 보임)
 *              연속된 slide 챕터끼리 자동으로 하나의 슬라이더 그룹으로 묶임
 *
 * heightMode:
 *   'full'   — h-dvh 고정 (콘텐츠가 화면에 딱 맞는 챕터)
 *   'auto'   — min-h-dvh (콘텐츠가 길어질 수 있는 챕터)
 */

export type TransitionType = 'scroll' | 'slide';
export type HeightMode = 'full' | 'auto';

export interface ChapterConfig {
  chIndex: number; // data-ch 값 (0-based)
  label: string;   // 가독성용 레이블
  transition: TransitionType;
  heightMode: HeightMode;
}

// ─── 챕터별 설정 ───────────────────────────────────────────────────────────────
// ↓ 전환 방식·높이를 바꾸고 싶다면 여기만 수정

export const CHAPTER_CONFIGS: ChapterConfig[] = [
  { chIndex: 0, label: 'Cover',     transition: 'scroll', heightMode: 'full' },
  { chIndex: 1, label: 'Invite',    transition: 'scroll', heightMode: 'full' },
  { chIndex: 2, label: 'Couple',    transition: 'scroll', heightMode: 'full' },
  { chIndex: 3, label: 'Gallery',   transition: 'slide',  heightMode: 'full' },
  { chIndex: 4, label: 'Calendar',  transition: 'slide',  heightMode: 'full' },
  { chIndex: 5, label: 'Venue',     transition: 'slide',  heightMode: 'full' },
  { chIndex: 6, label: 'Fortune',   transition: 'scroll', heightMode: 'full' },
  { chIndex: 7, label: 'Guestbook', transition: 'scroll', heightMode: 'auto' },
  { chIndex: 8, label: 'Finale',    transition: 'scroll', heightMode: 'auto' },
];

// ─── 유틸 ─────────────────────────────────────────────────────────────────────

export function getChapterConfig(chIndex: number): ChapterConfig {
  return (
    CHAPTER_CONFIGS.find((c) => c.chIndex === chIndex) ?? {
      chIndex,
      label: `Ch${chIndex + 1}`,
      transition: 'scroll',
      heightMode: 'full',
    }
  );
}

/**
 * 연속된 slide 챕터를 그룹으로 묶어 반환
 * 예: [0s, 1s, 2s, 3slide, 4slide, 5slide, 6s, ...]
 *   → [{type:'scroll', chapters:[0,1,2]}, {type:'slide', chapters:[3,4,5]}, ...]
 */
export type ChapterGroup =
  | { type: 'scroll'; chapters: ChapterConfig[] }
  | { type: 'slide'; chapters: ChapterConfig[] };

export function groupChapters(): ChapterGroup[] {
  const groups: ChapterGroup[] = [];
  for (const config of CHAPTER_CONFIGS) {
    const last = groups[groups.length - 1];
    if (last && last.type === config.transition) {
      last.chapters.push(config);
    } else {
      groups.push({ type: config.transition, chapters: [config] });
    }
  }
  return groups;
}
