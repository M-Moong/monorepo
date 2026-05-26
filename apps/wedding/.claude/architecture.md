# apps/wedding 아키텍처

**싱글 페이지 모바일 청첩장** — 9개 챕터를 수직 스크롤로 이동.

## 앱 구조

단일 Next.js 앱. 프론트(페이지/컴포넌트)와 백엔드(API Route + DB)가 하나의 앱에 통합.

```
apps/wedding/
├── src/
│   ├── app/
│   │   ├── api/guestbook/route.ts   # 방명록 API (GET / POST)
│   │   ├── page.tsx                 # 메인 페이지
│   │   ├── layout.tsx               # 루트 레이아웃 + 메타데이터
│   │   └── globals.css              # Tailwind v4 + 테마 토큰 (@theme 블록)
│   ├── components/
│   │   ├── chapters/                # Ch01Cover ~ Ch09Finale
│   │   ├── hud/                     # HUD.tsx — 상단 진행 표시
│   │   └── ui/                      # ChHeader, ChapterSection 등 공통 UI
│   ├── db/
│   │   ├── index.ts                 # Drizzle 클라이언트
│   │   └── schema.ts                # DB 스키마 (GuestEntry)
│   ├── hooks/                       # useBGM, useScroll, useCountdown
│   ├── config/                      # theme.config.ts
│   └── data/                        # wedding.ts (단일 데이터 포인트)
├── public/
└── drizzle.config.ts
```

## 핵심 규칙

- `src/data/wedding.ts`의 `WEDDING` 상수가 **단일 데이터 수정 포인트**. 컴포넌트 내부 하드코딩 금지.
- **모든 CSS는 Tailwind CSS v4 유틸리티 클래스**로 작성. `tailwind.config.js` 없음 — `globals.css`의 `@theme` 블록에서 토큰 정의.
- `useState`/`useEffect`/`useRef` 사용 컴포넌트에 `'use client'` 필수.
- import는 `@/` alias만 사용 (tsconfig `paths: { "@/*": ["./src/*"] }`).
- `any` 타입 금지. Props는 `interface`로 명시.

## 데이터 흐름

```
src/data/wedding.ts
  └─ 각 챕터 컴포넌트가 직접 import (전역 상태 없음)

src/app/page.tsx
  └─ useScroll(containerRef) 로 스크롤 상태 관리
       └─ HUD + 플로팅 FAB에 전달

src/app/api/guestbook/route.ts
  └─ src/db/index.ts (Drizzle) → Supabase PostgreSQL
```

## 디자인 시스템

### 색상 토큰 (`globals.css` `@theme` 블록)

| 클래스                      | 값                      | 용도               |
| --------------------------- | ----------------------- | ------------------ |
| `bg-bg` / `text-bg`         | `#0a0a0a`               | 기본 배경          |
| `text-fg`                   | `#f0e8d8`               | 기본 텍스트        |
| `text-gold` / `border-gold` | `#e8c87c`               | 강조 골드          |
| `bg-warm`                   | `#15110b`               | 따뜻한 어두운 배경 |
| `text-dim`                  | `rgba(240,232,216,0.3)` | 흐린 텍스트        |
| `bg-overlay`                | `rgba(10,10,10,0.6)`    | 오버레이           |

### 폰트

| 변수         | 패밀리                      | 용도         |
| ------------ | --------------------------- | ------------ |
| `font-serif` | Cormorant Garamond, Georgia | 제목, 이니셜 |
| `font-sans`  | Space Grotesk, system-ui    | 본문, UI     |

### 애니메이션 클래스

| 클래스               | 설명                      |
| -------------------- | ------------------------- |
| `animate-shimmer`    | 3s 반복 opacity 페이드    |
| `animate-drift`      | 2s 상하 부유              |
| `animate-pulse-ring` | 2s 링 펄스                |
| `animate-flip`       | 0.5s Y축 뒤집기           |
| `animate-glow`       | 2s 골드 박스섀도우 글로우 |
| `animate-pulse-btn`  | 3s 버튼 섀도우 펄스       |

### style={} 허용 기준

Tailwind로 표현 불가한 **동적 값**에만 허용:

```tsx
// 허용 — 런타임 동적 값
style={{ transform: `rotate(${angle}deg)` }}
style={{ background: `linear-gradient(${deg}deg, ...)` }}

// 금지 — Tailwind 클래스로 대체 가능
style={{ color: '#e8c87c' }}  // → className="text-gold"
style={{ display: 'flex' }}   // → className="flex"
```

## 챕터 목록

CH01 Cover · CH02 Invite · CH03 Couple · CH04 Gallery · CH05 Calendar · CH06 Map · CH07 Quiz · CH08 Guestbook · CH09 Finale — 모두 구현 완료.
