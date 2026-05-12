# Design System

## 아이콘

**lucide-react** 사용. 다른 아이콘 라이브러리 추가 금지.

```tsx
import { Heart, MapPin, Calendar } from 'lucide-react';
```

`lucide-react`는 `packages/ui` 의존성으로 설치되어 있고, `apps/wedding`에도 직접 의존성으로 추가되어 있음.

## 색상 토큰

`apps/wedding/app/globals.css`의 `@theme` 블록에서 정의. Tailwind 유틸리티 클래스로 사용.

| 클래스                      | 값                      | 용도               |
| --------------------------- | ----------------------- | ------------------ |
| `bg-bg` / `text-bg`         | `#0a0a0a`               | 기본 배경          |
| `text-fg`                   | `#f0e8d8`               | 기본 텍스트        |
| `text-gold` / `border-gold` | `#e8c87c`               | 강조 골드          |
| `bg-warm`                   | `#15110b`               | 따뜻한 어두운 배경 |
| `text-dim`                  | `rgba(240,232,216,0.3)` | 흐린 텍스트        |
| `bg-overlay`                | `rgba(10,10,10,0.6)`    | 오버레이           |

## 폰트

| 변수         | 패밀리                      | 용도         |
| ------------ | --------------------------- | ------------ |
| `font-serif` | Cormorant Garamond, Georgia | 제목, 이니셜 |
| `font-sans`  | Space Grotesk, system-ui    | 본문, UI     |

## 애니메이션 클래스

`globals.css`의 `@theme`에서 정의된 커스텀 애니메이션:

| 클래스               | 설명                      |
| -------------------- | ------------------------- |
| `animate-shimmer`    | 3s 반복 opacity 페이드    |
| `animate-drift`      | 2s 상하 부유              |
| `animate-pulse-ring` | 2s 링 펄스                |
| `animate-flip`       | 0.5s Y축 뒤집기           |
| `animate-glow`       | 2s 골드 박스섀도우 글로우 |
| `animate-pulse-btn`  | 3s 버튼 섀도우 펄스       |

## style={} 허용 기준

Tailwind로 표현 불가한 **동적 값**에만 허용:

```tsx
// 허용 — 런타임 동적 값
style={{ transform: `rotate(${angle}deg)` }}
style={{ background: `linear-gradient(${deg}deg, ...)` }}

// 금지 — Tailwind 클래스로 대체 가능
style={{ color: '#e8c87c' }}  // → className="text-gold"
style={{ display: 'flex' }}   // → className="flex"
```
