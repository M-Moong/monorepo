# Wedding Invitation — 구현 현황 & 개발 가이드

## 스택

| 항목 | 값 |
|---|---|
| 프레임워크 | Next.js 16 (App Router) + React 19 |
| 언어 | TypeScript (strict, `any` 금지) |
| 스타일 | Tailwind CSS v4 (`@theme` 토큰, `tailwind.config.js` 없음) |
| 폰트 | Cormorant Garamond (serif) · Space Grotesk (sans) |
| 타겟 | 모바일 전용 · max-width 390px |

---

## 디자인 시스템

### 컬러 토큰 (`app/globals.css @theme`)
| 클래스 | 값 | 용도 |
|---|---|---|
| `bg-bg` / `text-bg` | `#0a0a0a` | 배경 (거의 블랙) |
| `text-fg` / `bg-fg` | `#f0e8d8` | 본문 텍스트 (크림) |
| `text-gold` / `bg-gold` | `#e8c87c` | 강조 (골드) |
| `bg-warm` | `#15110b` | 카드·섹션 배경 (따뜻한 다크) |

투명도: Tailwind opacity suffix 사용 (`text-fg/60`, `border-fg/20` 등)

### 폰트 클래스
- `font-serif` → Cormorant Garamond (제목, 이름, italic)
- `font-sans` → Space Grotesk (본문, UI 텍스트, 기본값)

### 애니메이션 (`globals.css @theme --animate-*`)
| 클래스 | 설명 |
|---|---|
| `animate-shimmer` | 불투명도 0.4 ↔ 1 (3s) |
| `animate-drift` | Y축 -8px 유도 화살표 (2s) |
| `animate-pulse-ring` | 지도 핀 pulse (2s) |
| `animate-flip` | 카드 뒤집기 rotateY (0.5s) |
| `animate-glow` | gold box-shadow glow (2s) |
| `animate-pulse-btn` | FAB 그림자 pulse (3s) |

### 스타일 규칙
- 인라인 `style={}` 최소화 — 동적 gradient·transform 값만 허용
- 버튼 primary: `bg-gold text-bg font-bold`
- 버튼 ghost: `bg-transparent border border-gold text-gold`
- 구분선: `border-fg/20`
- 카드 배경: `bg-warm`
- 스크롤: `[scroll-snap-type:y_proximity]` + 각 섹션 `scroll-start`

---

## 파일 구조

```
apps/wedding/
├── app/
│   ├── globals.css          # @theme 토큰 + 애니메이션 keyframes
│   ├── layout.tsx           # 폰트 로드, viewport (userScalable=false)
│   └── page.tsx             # InvitationPage — 전체 조립, FAB 버튼
│
├── data/
│   └── wedding.ts           # WEDDING 상수 (단일 수정 포인트)
│
├── components/
│   ├── hud/
│   │   └── HUD.tsx          # sticky 상단바: 챕터번호 · 도트 · BGM · progress
│   ├── chapters/
│   │   ├── Ch01Cover.tsx    # 포스터 + D-Day 카운트다운
│   │   ├── Ch02Invite.tsx   # 초대글 + 양가 부모님
│   │   ├── Ch03Couple.tsx   # 신랑/신부 accordion 카드
│   │   ├── Ch04Gallery.tsx  # 3×3 그리드 + Lightbox
│   │   ├── Ch05Calendar.tsx # 달력 + D-Day 브릭 + ADD TO CALENDAR
│   │   ├── Ch06Venue.tsx    # SVG 지도 + 교통편 탭 + 지도 버튼
│   │   ├── Ch07Fortune.tsx  # MZ 명언 카드 (12개, 랜덤, 공유)
│   │   ├── Ch08Guestbook.tsx# 통계 · 폼 · 피드 (useState, API 연동 예정)
│   │   └── Ch09Finale.tsx   # 계좌 아코디언 + COPY 토스트 + 공유
│   └── ui/
│       ├── ChapterSection.tsx # section 래퍼 (data-ch, snap-start, 기본 패딩)
│       ├── ChHeader.tsx       # CH.XX · LABEL + italic serif 제목
│       ├── PhotoFrame.tsx     # 사진 placeholder (8가지 tone 줄무늬 gradient)
│       ├── GoldButton.tsx     # solid/ghost 버튼 공통
│       └── Lightbox.tsx       # 갤러리 전체화면 오버레이 (키보드 지원)
│
└── hooks/
    ├── useCountdown.ts      # {d, h, m, s, isPast} — 1초 interval
    ├── useScroll.ts         # {chapter, progressPct} — IntersectionObserver
    └── useBGM.ts            # WebAudio 앰비언트 (110/165/220Hz, gain 0.04)
```

---

## 데이터 파일 (`data/wedding.ts`)

**실제 정보 입력 시 이 파일만 수정.**

```ts
WEDDING.date              // 결혼 날짜 (Date 객체)
WEDDING.dateText          // '2026년 10월 17일 토요일 오후 2시'
WEDDING.groom / bride     // name, en, father, mother, tagline, facts[]
WEDDING.inviteMessage     // 초대글 (줄바꿈 \n)
WEDDING.venue             // short, address, detail, mapUrl, transport{}
WEDDING.accounts.groom[]  // [{who, name, bank, number}] × 3
WEDDING.accounts.bride[]  // [{who, name, bank, number}] × 3
WEDDING.photos[]          // '/photos/01.jpg' ~ '09.jpg'
```

---

## 컴포넌트 작성 규칙

- `useState` / `useEffect` / `useRef` 사용 시 `'use client'` 필수
- Props는 반드시 `interface`로 명시
- import alias `@/` 전용 (상대경로 금지)
- 컴포넌트 내부 데이터 하드코딩 금지 → `data/wedding.ts`에서 import
- `any` 타입 사용 금지

---

## 미완료 항목 (실제 콘텐츠 교체 필요)

- [ ] `data/wedding.ts` — 실제 신랑신부 이름·날짜·장소 입력
- [ ] `public/photos/01.jpg ~ 09.jpg` — 실제 웨딩 사진
- [ ] `WEDDING.venue.mapUrl` — 카카오맵 URL 입력
- [ ] `Ch09Finale.tsx` — KAKAO/LINK/SMS 공유 버튼 실제 연동
- [ ] `Ch05Calendar.tsx` — ADD TO CALENDAR ICS 기능 구현
- [ ] `Ch08Guestbook.tsx` — API 연동 (현재 useState만 사용)

---

## 개발 명령어

```bash
# 루트에서 실행
pnpm --filter wedding dev    # 개발 서버 (localhost:3000)
pnpm --filter wedding build  # 프로덕션 빌드 + TypeScript 검사
```

브라우저 DevTools → 390px 모바일 뷰로 확인.
