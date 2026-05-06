# 모바일 청첩장 구현 계획서

## 1. 프로젝트 개요

**디자인 컨셉:** 시네마틱 다크 (V6 Cinema)  
**기술 스택:** Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4  
**타겟:** 모바일 전용 (max-width: 390px 기준)  
**백엔드:** 프론트 전용 (RSVP·방명록 = localStorage, 추후 API 연동)

---

## 2. 디자인 시스템

### 컬러
| 토큰 | 값 | 용도 |
|---|---|---|
| `--bg` | `#0a0a0a` | 배경 (거의 블랙) |
| `--fg` | `#f0e8d8` | 본문 텍스트 (크림 화이트) |
| `--gold` | `#e8c87c` | 강조 (골드) |
| `--dim` | `rgba(240,232,216,0.3)` | 보조 텍스트·구분선 |
| `--overlay` | `rgba(10,10,10,0.6)` | 오버레이 |

### 타이포그래피
| 역할 | 폰트 | 굵기 |
|---|---|---|
| Display (제목, 이름) | Cormorant Garamond | 300 · 500 (Italic 포함) |
| Body (설명, UI) | Space Grotesk | 300 · 400 · 500 · 700 |

### 공통 스타일 규칙
- 스크롤: `scroll-snap-type: y proximity` — 각 챕터가 snap point
- 스크롤바 숨김: `scrollbar-width: none`
- 섹션 기본: `min-h-screen px-6 py-16 flex flex-col justify-center`
- 인풋: `border-b border-fg/30 bg-transparent`, focus시 `border-gold`
- 버튼 primary: `bg-gold text-bg`
- 버튼 ghost: `border border-fg/30 text-fg`

---

## 3. 파일 구조

```
apps/wedding/
├── app/
│   ├── layout.tsx          # 폰트 로드, 모바일 viewport
│   ├── page.tsx            # InvitationPage (진입점)
│   └── globals.css         # CSS 변수, 기본 리셋
│
├── data/
│   └── wedding.ts          # 더미 데이터 (수정 포인트 한 곳으로 집중)
│
├── components/
│   ├── hud/
│   │   └── HUD.tsx         # 상단 HUD (챕터 도트 + BGM + 진행바)
│   │
│   ├── chapters/
│   │   ├── Ch01Cover.tsx
│   │   ├── Ch02Invite.tsx
│   │   ├── Ch03Couple.tsx
│   │   ├── Ch04Gallery.tsx
│   │   ├── Ch05Calendar.tsx
│   │   ├── Ch06Venue.tsx
│   │   ├── Ch07Fortune.tsx
│   │   ├── Ch08RSVP.tsx
│   │   └── Ch09Finale.tsx
│   │
│   └── ui/
│       ├── PhotoSlot.tsx   # 사진 자리 placeholder
│       └── Lightbox.tsx    # 갤러리 라이트박스
│
└── hooks/
    ├── useCountdown.ts     # D-Day 카운트다운
    ├── useScroll.ts        # 스크롤 → 현재 챕터 추적
    └── useBGM.ts           # WebAudio 앰비언트 BGM
```

---

## 4. 더미 데이터 (`data/wedding.ts`)

아래 항목을 모두 한 파일에 모아두고, 실제 정보 입력 시 이 파일만 수정하면 됨.

```ts
// data/wedding.ts — 실제 정보 입력 포인트

export const WEDDING = {
  // ── 기본 정보 ──────────────────────────────────────
  date: new Date('2026-10-17T14:00:00+09:00'),
  dateText: '2026년 10월 17일 토요일 오후 2시',

  // ── 신랑 ───────────────────────────────────────────
  groom: {
    name: '김민준',
    en: 'Minjun Kim',
    father: '김영호',
    mother: '이정희',
    intro: '신랑 소개 문구를 여기에 입력하세요.',
  },

  // ── 신부 ───────────────────────────────────────────
  bride: {
    name: '이서연',
    en: 'Seoyeon Lee',
    father: '이상철',
    mother: '박미경',
    intro: '신부 소개 문구를 여기에 입력하세요.',
  },

  // ── 초대글 ─────────────────────────────────────────
  inviteMessage: `저희 두 사람이 사랑을 나누며\n함께 걸어가려 합니다.\n귀한 걸음 하시어 축복해 주시면\n감사하겠습니다.`,

  // ── 장소 ───────────────────────────────────────────
  venue: {
    name: '그랜드하얏트 서울 그랜드볼룸',
    short: '그랜드하얏트 서울',
    address: '서울시 용산구 소월로 322',
    detail: '본관 3층 그랜드볼룸',
    mapUrl: '',           // 카카오맵 / 네이버지도 URL
    kakaoMapId: '',       // 카카오맵 장소 ID (선택)
    transport: {
      subway: '지하철 안내 문구',
      bus: '버스 안내 문구',
      car: '자가용 안내 문구 (주차 정보 포함)',
      taxi: '택시 안내 문구',
    },
  },

  // ── 계좌번호 ───────────────────────────────────────
  accounts: [
    { label: '신랑 측', name: '김민준', bank: '신한', number: '110-123-456789' },
    { label: '신부 측', name: '이서연', bank: '국민', number: '123-45-6789-012' },
    { label: '신랑 아버지', name: '김영호', bank: '신한', number: '110-987-654321' },
    { label: '신부 어머니', name: '박미경', bank: '국민', number: '987-65-4321-098' },
  ],

  // ── 갤러리 ─────────────────────────────────────────
  // 실제 사진 경로로 교체 (public/photos/ 하위)
  photos: [
    '/photos/01.jpg',
    '/photos/02.jpg',
    '/photos/03.jpg',
    '/photos/04.jpg',
    '/photos/05.jpg',
    '/photos/06.jpg',
    '/photos/07.jpg',
    '/photos/08.jpg',
    '/photos/09.jpg',
  ],
};
```

---

## 5. 챕터별 구현 명세

총 9개 챕터. 각 챕터는 `<section data-ch={n}>` 으로 감싸고 scroll-snap.

### CH 01 · Cover
- 전체 화면 포스터 레이아웃
- 상단: 영문 이니셜 (대형 serif)
- 중앙: 한글 이름 + 날짜
- 하단: 실시간 D-Day 카운터 (`DD · HH · MM · SS`)
- 배경: 순수 블랙, 미세한 grain 텍스처 (CSS noise)
- 하단 스크롤 유도 화살표 (bounce 애니메이션)

### CH 02 · Invitation
- 초대글 (`WEDDING.inviteMessage`) — Cormorant Italic
- 양가 부모님 이름 (신랑·신부 순)
- 날짜·장소 요약 한 줄
- 전체 여백 위주, 텍스트 중심 레이아웃

### CH 03 · Couple
- 신랑/신부 카드 2개 (세로 배치 또는 탭)
- 카드 탭하면 소개 문구 펼치기 (accordion)
- 사진 영역: `PhotoSlot` (실제 사진으로 교체 예정)

### CH 04 · Gallery
- 3×3 그리드 (9장)
- 사진 탭 → Lightbox (전체화면 + 좌우 스와이프)
- 사진 미입력 시 `PhotoSlot` 표시

### CH 05 · Calendar
- 10월 달력 그리드 (요일 헤더 포함)
- 결혼일 셀 강조 (gold)
- 하단: `DD일 HH시간 MM분 SS초` 실시간 카운트다운

### CH 06 · Venue
- 장소명·주소·상세 안내
- 교통편 탭 4개: 지하철·버스·자가용·택시
- 지도 버튼 → `WEDDING.venue.mapUrl` 열기 (실제 지도 연동은 추후)
- 현재는 추상 지도 이미지 placeholder

### CH 07 · Fortune
- 운세 뽑기 카드 인터랙션 (신박한 기능)
- 카드 뒤집기 → 결혼 축하 메시지 + 행운의 숫자
- 메시지 목록: 12개 미리 정의 (hardcode)
- "다시 뽑기" 버튼

### CH 08 · RSVP + 방명록
**RSVP:**
- 이름 / 인원 / 식사 여부 → localStorage 저장
- 단계별 폼 (step 1 → 2 → 완료 화면)

**방명록:**
- 이름 + 메시지 입력 → localStorage에 배열로 누적
- 최신 3개 미리보기 표시

> 추후 백엔드 연동 시: `localStorage` 부분만 API call로 교체

### CH 09 · Finale
- 계좌번호 아코디언 (신랑측 / 신부측)
- 계좌번호 탭 → 클립보드 복사 + 토스트 메시지
- 공유 버튼: 카카오 공유 / URL 복사 (Web Share API fallback)
- 마무리 문구

---

## 6. 공통 컴포넌트

### HUD (상단 고정)
```
CH.01/09  [━━━━━━━━━]  ♪ OFF
```
- 좌: 현재 챕터 번호
- 중: 챕터 도트 바 (클릭 시 해당 챕터로 점프)
- 우: BGM 토글 버튼
- 하단: 골드 progress bar (스크롤 진행률)
- 배경: `backdrop-blur` + 그라데이션 fade

### 플로팅 RSVP 버튼
- CH01~CH07 구간에만 표시
- 우하단 고정, pulse 애니메이션
- 탭 → CH08로 스크롤

### BGM (WebAudio)
- 오실레이터 3개 (110Hz·165Hz·220Hz sine/triangle)
- gain 0.04로 앰비언트 톤
- ON/OFF 토글 시 fade in/out

---

## 7. 구현 순서

1. **환경 세팅** — `globals.css` CSS 변수·폰트 설정, `layout.tsx` viewport 설정
2. **데이터 파일** — `data/wedding.ts` 작성
3. **훅** — `useCountdown`, `useScroll`, `useBGM`
4. **HUD** — 고정 네비게이션 컴포넌트
5. **챕터 순서대로** — CH01 → CH09
6. **UI 유틸** — Lightbox, PhotoSlot, 클립보드 토스트
7. **page.tsx 조립** — 전체 구조 통합
8. **모바일 확인** — 실제 기기 or devtools 375px 기준 QA

---

## 8. 미결 사항 (추후 확인 필요)

- [ ] 실제 신랑신부 이름·날짜·장소 입력
- [ ] 실제 웨딩 사진 9장 (`public/photos/`)
- [ ] 카카오맵 장소 URL
- [ ] 카카오 공유 API 앱 키 (Finale 공유 기능)
- [ ] RSVP 백엔드 API (추후)
- [ ] 방명록 백엔드 API (추후)
- [ ] 도메인 배포 주소
