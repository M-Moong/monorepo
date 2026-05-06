# Wedding Invitation — Agent Guide (요약)

## 1. 개요

* Next.js 16 + React 19 + TypeScript + Tailwind v4
* 모바일 청첩장 싱글 페이지 (9개 챕터)
* **파일 구조 고정 (변경 금지)**

---

## 2. 핵심 규칙

* ❌ 임의 판단 금지 (가이드 최우선)
* ❌ 구조 변경 금지
* ❌ 색상/폰트/데이터 하드코딩 금지
* ❌ `any` 사용 금지 / 패키지 추가 금지
* ✅ `@/` alias import 사용
* ✅ 스타일: Tailwind → CSS 변수 → 지정 애니메이션

---

## 3. 디자인 시스템

* 색상: `bg-bg`, `text-fg`, `text-gold`, `bg-warm`
* 폰트:

  * 제목: `font-serif` + italic
  * 본문: `font-sans`
* 투명도: Tailwind opacity (`/20`, `/60`)

👉 디자인 토큰 외 사용 금지

---

## 4. 컴포넌트 규칙

* 파일당 1 컴포넌트
* Props는 `interface`로 명시
* 훅 사용 시 `'use client'` 필수
* 인라인 스타일 최소화 (CSS 변수만 허용)

---

## 5. Tailwind v4 규칙

* `tailwind.config.js` 사용하지 않음
* `globals.css @theme` 토큰 사용
* 허용된 애니메이션만 사용:

  * shimmer / drift / pulse-ring / flip / glow

---

## 6. 레이아웃

* 중앙 정렬 모바일 프레임 (`max-w-[390px]`)
* 스크롤: `snap-scroll` + `snap-start`
* 고정 패딩: `px-[22px] pt-16 pb-12`

---

## 7. 데이터 규칙

* 모든 데이터는 `lib/`에서 import (`WEDDING` 등)
* ❌ 컴포넌트 내부 하드코딩 금지

---

## 8. 공유 컴포넌트

직접 구현 ❌ / import 사용 ⭕

* ChapterSection
* ChHeader
* Countdown
* PhotoFrame
* GoldButton
* Lightbox
* GuestbookFab

---

## 9. 챕터 구성

1. Cover (카운트다운)
2. Invitation
3. Couple (토글 카드)
4. Gallery (라이트박스)
5. Calendar (D-day + ICS)
6. Venue (지도 + 탭)
7. Vibes (랜덤 카드)
8. Guestbook (폼 + 리스트)
9. Finale (요약 + 계좌 + 공유)

👉 각 챕터는 Section 포함하여 완성

---

## 10. 완료 기준

* TypeScript 에러 없음
* Props 타입 정의 완료
* alias import 사용
* 디자인 토큰 준수
* 불필요 코드 없음

---

## 최종 한 줄 요약

**고정된 구조와 디자인 시스템 안에서 9개 챕터 UI를 정확히 구현하는 프로젝트**
