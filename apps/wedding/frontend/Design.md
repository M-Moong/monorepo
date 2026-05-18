# Wedding Invitation — 디자인 레퍼런스

## 선정 디자인

**V6 Cinema · 시네마틱 다크 시안** — claude.ai/design에서 선정.

거의 블랙에 가까운 배경, 크림 화이트 텍스트, 골드 포인트의 고급스러운 무드.
Cormorant Garamond italic으로 영화 포스터 느낌을 살린 청첩장.

---

## 컬러

| 토큰 | 헥스      | 인상                    |
| ---- | --------- | ----------------------- |
| bg   | `#0a0a0a` | 거의 블랙               |
| fg   | `#f0e8d8` | 크림 화이트             |
| gold | `#e8c87c` | 웜 골드                 |
| warm | `#15110b` | 다크 브라운 (카드 배경) |

투명도 조합 예시: `text-fg/60` (보조 텍스트), `border-fg/20` (구분선)

---

## 타이포그래피

| 역할                  | 폰트               | 특징                   |
| --------------------- | ------------------ | ---------------------- |
| Display · 제목 · 이름 | Cormorant Garamond | italic, weight 300/500 |
| 본문 · UI · 레이블    | Space Grotesk      | weight 300~700         |

- 챕터 헤더: `CH. XX · LABEL` — 9px, tracking .4em, gold
- 대형 타이틀: 44px italic serif, leading 0.98
- 커버 display: 88px italic serif

---

## 레이아웃

- 모바일 프레임: `max-w-[390px]` 중앙 정렬
- 전체 높이: `h-dvh` + `overflow-y-scroll`
- 스크롤 snap: `[scroll-snap-type:y_proximity]`
- 챕터 패딩: `px-[22px] pt-16 pb-12`
- HUD: `sticky top-0 z-50` — backdrop blur + gradient fade

---

## 챕터 무드 요약

| CH  | 제목       | 핵심 요소                                                   |
| --- | ---------- | ----------------------------------------------------------- |
| 01  | Cover      | 88px italic "until we meet" · D-Day 카운터 · gold glow 배경 |
| 02  | Invitation | Cormorant italic 초대글 · 양가 부모님 3열 그리드            |
| 03  | Couple     | warm 카드 accordion · PhotoFrame (mono/sepia)               |
| 04  | Gallery    | 3×3 그리드 · Lightbox 전체화면                              |
| 05  | Calendar   | October 2026 달력 · 17일 gold 강조 · 4-brick 카운트다운     |
| 06  | Venue      | SVG 추상 지도 + gold pin pulse · 교통편 탭 4개              |
| 07  | Daily Vibe | MZ 명언 카드 12종 · gradient 배경 · 랜덤 플립 · 공유        |
| 08  | Guestbook  | 통계 3열 · 폼 (이모지 + 참석여부) · gold left-border 피드   |
| 09  | Finale     | 계좌 아코디언 · COPY 토스트 · 공유 버튼 · "· FIN ·" 마무리  |

---

## 인터랙션 패턴

- **카드 hover/active**: `border-gold` 전환 (transition 350ms)
- **버튼 토글**: gold bg ↔ transparent (transition 200ms)
- **플립 카드**: rotateY 0 → 90 → 0, 250ms delay로 내용 교체
- **스크롤 화살표**: `animate-drift` (Y -8px, 2s loop)
- **FAB**: `animate-pulse-btn` (gold shadow pulse, 3s loop)
- **지도 핀**: SVG `<animate>` r 22 → 30 → 22 (2s loop)
