/**
 * 배포 시 사용할 테마를 여기서 지정하세요.
 *
 * 'dark-gold'  — 다크 배경, 골드 포인트 (기본)
 * 'ivory-rose' — 아이보리 배경, 로즈골드 포인트
 * 'sage-linen' — 린넨 배경, 세이지 그린 포인트
 */
export const ACTIVE_THEME = 'dark-gold' as const;

export type Theme = 'dark-gold' | 'ivory-rose' | 'sage-linen';
