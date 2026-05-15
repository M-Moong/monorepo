# 멀티 테마 시스템 PRD

> **브랜치**: `feature/claude` (base: `dev`)
> **작성일**: 2026-05-15
> **상태**: 구현 준비

---

## 1. 개요

### 배경

현재 웨딩 청첩장은 `dark-gold` 단일 테마로 하드코딩되어 있다. 색상이 CSS 변수와 Tailwind 클래스에 혼재되어 있어 테마 전환이 불가능하다. 배포 시 신랑·신부의 취향에 맞는 테마를 선택할 수 있도록 멀티 테마 시스템을 구축한다.

### 목표

- `ACTIVE_THEME` 값 하나만 바꿔서 전체 앱 색상이 교체되는 빌드타임 테마 시스템
- CSS 커스텀 프로퍼티(`data-theme` 셀렉터) 기반으로 런타임 오버헤드 없음
- 기존 컴포넌트 구조 변경 최소화

### 범위 (In Scope)

- 3개 테마 정의: `dark-gold`, `ivory-rose`, `sage-linen`
- CSS 변수 체계 재정비 및 테마별 토큰 정의
- 하드코딩 인라인 스타일 → CSS 변수 치환
- HUD 미정의 변수 완성

### 범위 외 (Out of Scope)

- 런타임 사용자 테마 전환 UI (현재는 빌드타임 고정)
- 다크모드/라이트모드 OS 감지 자동 전환
- 4번째 이상 테마 추가

---

## 2. 현황 분석

### 2.1 현재 색상 시스템 문제점

| 구분 | 문제 |
|------|------|
| HUD.tsx | `var(--color-hud-gradient)`, `var(--color-dot-inactive)` 미정의 |
| globals.css | 테마 분기 없이 전역 CSS 변수만 존재 |
| 여러 컴포넌트 | 인라인 `style={{ background: '#e8c87c' }}` 하드코딩 |
| shadcn 변수 | 테마와 무관한 별도 light/dark 체계 |

### 2.2 현재 정의된 CSS 변수

```css
--color-bg       #0a0a0a
--color-fg       #f0e8d8
--color-gold     #e8c87c
--color-warm     #15110b
--color-dim      rgba(240,232,216,.3)
--color-overlay  rgba(10,10,10,.6)
```

### 2.3 컴포넌트별 색상 사용 현황

| 컴포넌트 | CSS 변수 | 하드코딩 | Tailwind 유틸 |
|---------|---------|---------|-------------|
| HUD.tsx | `--color-gold` | 그라디언트 (이미 교체됨) | `text-gold`, `bg-gold` |
| GoldButton.tsx | - | - | `bg-gold`, `text-bg`, `border-gold` |
| ChHeader.tsx | - | - | `text-gold`, `text-fg` |
| Ch07Fortune.tsx | - | 12가지 팔레트 하드코딩 | - |
| PhotoFrame.tsx | - | 8가지 톤 하드코딩 | - |
| Ch01~Ch09 | `--color-warm` | 부분 하드코딩 | `text-gold`, `text-fg`, `bg-warm` |

---

## 3. 테마 설계

### 3.1 테마별 색상 팔레트

#### `dark-gold` (기본 · 현재)
> 콘셉트: 야간 갤러리, 럭셔리 웨딩

| 변수 | 값 | 용도 |
|------|-----|------|
| `--color-bg` | `#0a0a0a` | 페이지 배경 |
| `--color-fg` | `#f0e8d8` | 기본 텍스트 |
| `--color-gold` | `#e8c87c` | 포인트 컬러 |
| `--color-warm` | `#15110b` | 카드/섹션 배경 |
| `--color-dim` | `rgba(240,232,216,.3)` | 구분선, 서브텍스트 |
| `--color-overlay` | `rgba(10,10,10,.6)` | 오버레이 |
| `--color-hud-gradient` | `linear-gradient(180deg, rgba(10,10,10,.96) 0%, rgba(10,10,10,.6) 80%, transparent 100%)` | HUD 배경 |
| `--color-dot-inactive` | `rgba(240,232,216,.18)` | HUD 비활성 도트 |

#### `ivory-rose`
> 콘셉트: 낮의 정원, 로맨틱 클래식

| 변수 | 값 | 용도 |
|------|-----|------|
| `--color-bg` | `#faf6f1` | 아이보리 배경 |
| `--color-fg` | `#2d1f1a` | 딥 브라운 텍스트 |
| `--color-gold` | `#b5736a` | 로즈골드 포인트 |
| `--color-warm` | `#f0e6dc` | 카드/섹션 배경 |
| `--color-dim` | `rgba(45,31,26,.25)` | 구분선, 서브텍스트 |
| `--color-overlay` | `rgba(250,246,241,.7)` | 오버레이 |
| `--color-hud-gradient` | `linear-gradient(180deg, rgba(250,246,241,.97) 0%, rgba(250,246,241,.7) 80%, transparent 100%)` | HUD 배경 |
| `--color-dot-inactive` | `rgba(45,31,26,.18)` | HUD 비활성 도트 |

#### `sage-linen`
> 콘셉트: 봄날 들판, 내추럴 미니멀

| 변수 | 값 | 용도 |
|------|-----|------|
| `--color-bg` | `#f2ede6` | 린넨 배경 |
| `--color-fg` | `#1e2820` | 딥 그린 텍스트 |
| `--color-gold` | `#6b8c6e` | 세이지 포인트 |
| `--color-warm` | `#e5ddd4` | 카드/섹션 배경 |
| `--color-dim` | `rgba(30,40,32,.25)` | 구분선, 서브텍스트 |
| `--color-overlay` | `rgba(242,237,230,.7)` | 오버레이 |
| `--color-hud-gradient` | `linear-gradient(180deg, rgba(242,237,230,.97) 0%, rgba(242,237,230,.7) 80%, transparent 100%)` | HUD 배경 |
| `--color-dot-inactive` | `rgba(30,40,32,.18)` | HUD 비활성 도트 |

### 3.2 CSS 셀렉터 전략

```css
/* globals.css 구조 */

/* 기본값 (dark-gold = 변수 기본) */
:root {
  --color-bg: #0a0a0a;
  /* ... */
}

/* 테마 오버라이드 */
[data-theme='ivory-rose'] {
  --color-bg: #faf6f1;
  /* ... */
}

[data-theme='sage-linen'] {
  --color-bg: #f2ede6;
  /* ... */
}
```

`dark-gold`는 `:root` 기본값으로 처리 → `data-theme="dark-gold"` 셀렉터 불필요.

### 3.3 Tailwind 유틸리티 매핑

`globals.css`에서 Tailwind v4 방식으로 색상 토큰 등록:

```css
@theme {
  --color-bg: var(--color-bg);
  --color-fg: var(--color-fg);
  --color-gold: var(--color-gold);
  --color-warm: var(--color-warm);
  --color-dim: var(--color-dim);
}
```

→ `bg-bg`, `text-fg`, `bg-gold`, `text-gold`, `bg-warm` 등 기존 Tailwind 클래스 그대로 동작.

---

## 4. 구현 단계

### Phase 1 — CSS 변수 기반 완성 (globals.css)

**작업 내용**
1. `:root`에 `dark-gold` 전체 토큰 정의 (`--color-hud-gradient`, `--color-dot-inactive` 포함)
2. `[data-theme='ivory-rose']` 블록 추가
3. `[data-theme='sage-linen']` 블록 추가
4. `@theme` 블록에 신규 변수 등록 (필요 시)

**검증 기준**
- `theme.config.ts`에서 `ACTIVE_THEME`을 세 가지로 바꿔가며 빌드 후 색상 전환 확인
- HUD 그라디언트·도트 색상 정상 표시

---

### Phase 2 — 하드코딩 인라인 스타일 제거

**대상 파일 및 작업**

| 파일 | 현재 | 변경 |
|------|------|------|
| `components/ui/PhotoFrame.tsx` | 8개 톤 하드코딩 | CSS 변수 or `data-tone` 속성 분리 (테마 영향 최소화) |
| `components/chapters/Ch07Fortune.tsx` | 12가지 팔레트 | 팔레트 자체는 유지, 배경/텍스트 오버레이만 변수화 |
| 기타 chapter 컴포넌트 | `rgba(...)` 직접 사용 | `var(--color-overlay)` 등으로 치환 |

**원칙**
- PhotoFrame·Fortune의 사진 톤은 테마와 무관한 콘텐츠 속성 → 변경하지 않음
- 배경, 오버레이, 구분선, 텍스트 색상만 변수화

---

### Phase 3 — 테마별 시각 검수

**체크리스트 (테마별 반복)**

- [ ] Ch01 Cover: 배경 색상, 텍스트, 애니메이션 shimmer
- [ ] Ch02 Invite: 부모님 정보 카드, 구분선
- [ ] Ch03 Couple: 인물 카드 배경, 태그라인
- [ ] Ch04 Gallery: 사진 오버레이, Lightbox 배경
- [ ] Ch05 Calendar: 달력 날짜 강조, 배경
- [ ] Ch06 Venue: 지도 컨테이너, 교통 정보 카드
- [ ] Ch07 Fortune: 명언 카드 오버레이
- [ ] Ch08 Guestbook: 입력 폼, 게시물 카드
- [ ] Ch09 Finale: 계좌 정보 박스, 공유 버튼
- [ ] HUD: 그라디언트, 도트 색상, BGM 버튼
- [ ] Progress bar: 배경/포인트 색상

---

## 5. 파일별 변경 계획 요약

```
apps/wedding/
├── app/
│   ├── globals.css          ← Phase 1 핵심 (테마 토큰 정의)
│   └── layout.tsx           ✅ 완료 (data-theme 적용)
├── config/
│   └── theme.config.ts      ✅ 완료 (ACTIVE_THEME, Theme 타입)
└── components/
    ├── hud/
    │   └── HUD.tsx          ✅ 완료 (CSS 변수 치환)
    ├── ui/
    │   ├── GoldButton.tsx   Phase 2 (검토 후 결정)
    │   ├── PhotoFrame.tsx   Phase 2 (톤 시스템 유지)
    │   └── ChHeader.tsx     Phase 2 (검토 후 결정)
    └── chapters/
        └── Ch*.tsx          Phase 2 (오버레이·배경 변수화)
```

---

## 6. 비기능 요구사항

| 항목 | 요구사항 |
|------|---------|
| 성능 | 테마 적용으로 인한 추가 JS 번들 없음 (순수 CSS) |
| 빌드 | `ACTIVE_THEME` 변경 후 `pnpm build` 한 번으로 배포 가능 |
| 유지보수 | 4번째 테마 추가 시 `theme.config.ts` 타입 + `globals.css` 블록만 추가 |
| 접근성 | 각 테마의 텍스트/배경 대비비 WCAG AA 기준 충족 |

---

## 7. 시작 순서

```
1. globals.css — 테마 토큰 전체 정의 (Phase 1)
2. 빌드 테스트 — 세 테마 교체 확인
3. 하드코딩 인라인 스타일 제거 (Phase 2, 파일별 순차)
4. 시각 검수 (Phase 3)
```
