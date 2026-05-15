# 챕터별 기능 구현 현황

> 마지막 업데이트: 2026-05-15

---

## CH01 — Cover ✅ 완전 구현

| 기능 | 상태 |
|------|------|
| D-Day 카운트다운 (1초 갱신) | ✅ |
| shimmer · drift 애니메이션 | ✅ |
| gold glow 배경 (.cover-glow CSS 클래스) | ✅ |

---

## CH02 — Invitation ✅ 완전 구현

| 기능 | 상태 |
|------|------|
| 양가 부모님/이름/날짜/장소 렌더링 | ✅ |

인터랙션 없는 순수 표시용 컴포넌트. 모든 텍스트는 `data/wedding.ts`에서 로드.

---

## CH03 — Couple ✅ 완전 구현

| 기능 | 상태 |
|------|------|
| 카드 클릭 → facts 목록 펼치기/접기 | ✅ |
| 금색 테두리 활성화 상태 | ✅ |
| PhotoFrame 플레이스홀더 (mono/sepia 톤) | ✅ |

---

## CH04 — Gallery ✅ 완전 구현

| 기능 | 상태 |
|------|------|
| 3×3 그리드 클릭 → Lightbox 팝업 | ✅ |
| 이전/다음 버튼 네비게이션 | ✅ |
| 키보드 지원 (← → Esc) | ✅ |
| 실제 사진 없으면 PhotoFrame 플레이스홀더 | ✅ |

실제 사진은 `public/photos/01.jpg ~ 09.jpg` 경로에 추가 필요.

---

## CH05 — Calendar ⚠️ 부분 구현

| 기능 | 상태 |
|------|------|
| 2026년 10월 달력 렌더링 + 17일 강조 | ✅ |
| 카운트다운 블록 4개 (DAYS/HRS/MIN/SEC) | ✅ |
| **ADD TO CALENDAR 버튼** | ❌ onClick 없음 — ICS 구현 필요 |

**해야 할 작업:** ICS 파일 생성 및 Google/Apple Calendar 연동

---

## CH06 — Venue ⚠️ 부분 구현

| 기능 | 상태 |
|------|------|
| 교통편 탭 4개 (지하철/버스/자가용/택시) | ✅ |
| SVG 추상 지도 + 핀 펄스 애니메이션 | ✅ |
| **T MAP 버튼** | ❌ onClick 없음 |
| **KAKAO MAP 버튼** | ❌ onClick 없음 |
| **NAVER MAP 버튼** | ❌ onClick 없음 |

**해야 할 작업:** `data/wedding.ts`의 `WEDDING.venue.mapUrl` 실제 URL 입력 후 각 버튼에 딥링크 연결

---

## CH07 — Fortune ✅ 완전 구현

| 기능 | 상태 |
|------|------|
| 12종 그래디언트 카드 랜덤 플립 | ✅ |
| rotateY 3D 플립 애니메이션 | ✅ |
| navigator.share → 클립보드 복사 폴백 | ✅ |
| "✓ 복사됨" 1.5초 피드백 | ✅ |

---

## CH08 — Guestbook ⚠️ 클라이언트 전용

| 기능 | 상태 |
|------|------|
| 폼 (이름/메시지/이모지/참석여부) | ✅ |
| 유효성 검사 (canSubmit) | ✅ |
| 제출 후 피드 상단 추가 | ✅ |
| 전체/신랑측/신부측 통계 카운트 | ✅ |
| **서버 저장/불러오기** | ❌ 로컬 state만 — 새로고침 시 초기화 |

초기 더미 데이터 5개 (`INITIAL_ENTRIES`)가 하드코딩되어 있음.

**해야 할 작업:** API 연동 (POST /guestbook, GET /guestbook)

---

## CH09 — Finale ⚠️ 부분 구현

| 기능 | 상태 |
|------|------|
| 계좌 아코디언 (신랑측/신부측) | ✅ |
| 계좌번호 클립보드 복사 + 피드백 | ✅ |
| **KAKAO 공유** | ❌ onClick 없음 |
| **LINK 복사** | ❌ onClick 없음 |
| **SMS 공유** | ❌ onClick 없음 |

**해야 할 작업:** Kakao SDK 연동, URL 클립보드 복사, SMS 딥링크(`sms:?body=...`)

---

## 미구현 우선순위

| 순위 | 챕터 | 작업 |
|------|------|------|
| 1 | CH09 | LINK 복사, KAKAO 공유, SMS 공유 |
| 2 | CH06 | 지도 앱 딥링크 (T MAP / KAKAO / NAVER) |
| 3 | CH05 | ADD TO CALENDAR (ICS 생성) |
| 4 | CH08 | 방명록 서버 API 연동 |

---

## 실제 데이터 교체 체크리스트

- [ ] `data/wedding.ts` — 신랑신부 실제 이름, 날짜, 장소, 계좌번호 입력
- [ ] `public/photos/01.jpg ~ 09.jpg` — 실제 웨딩 사진 업로드
- [ ] `WEDDING.venue.mapUrl` — 카카오맵 장소 URL 입력
