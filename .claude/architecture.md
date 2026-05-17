# apps/wedding 아키텍처

**싱글 페이지 모바일 청첩장** — 9개 챕터를 수직 스크롤로 이동. 자세한 내용은 `apps/wedding/PLAN.md` 참조.

## 핵심 규칙

- `apps/wedding/data/wedding.ts`의 `WEDDING` 상수가 **단일 데이터 수정 포인트**. 컴포넌트 내부 하드코딩 금지.
- **모든 CSS는 Tailwind CSS v4 유틸리티 클래스**로 작성. `tailwind.config.js` 없음 — `app/globals.css`의 `@theme` 블록에서 토큰 정의.
- `useState`/`useEffect`/`useRef` 사용 컴포넌트에 `'use client'` 필수.
- import는 `@/` alias만 사용 (tsconfig `paths: { "@/*": ["./*"] }`).
- `any` 타입 금지. Props는 `interface`로 명시.

## 데이터 흐름

```
data/wedding.ts
  └─ 각 챕터 컴포넌트가 직접 import (전역 상태 없음)

app/page.tsx
  └─ useScroll(containerRef) 로 스크롤 상태 관리
       └─ HUD + 플로팅 FAB에 전달
```

## 컴포넌트 구조

```
components/
  chapters/   # Ch01Cover ~ Ch09Finale — 챕터별 섹션
  hud/        # HUD.tsx — 상단 진행 표시
  ui/         # ChHeader, ChapterSection, GoldButton 등 공통 UI
```

## CSS 작성 규칙

- 커스텀 색상/애니메이션 토큰은 `design-system.md` 참조
- 동적 값에만 `style={}` 허용 (`design-system.md`의 허용 기준 참조)
