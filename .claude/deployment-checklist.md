# 배포 안정성 체크리스트

> wedding 앱 (Next.js + Supabase + Vercel) 기준. `dev → main` PR 머지 전 순서대로 통과해야 한다.
>
> **원칙:** Gate를 하나라도 통과하지 못하면 머지하지 않는다. 빠른 배포보다 손님이 보는 화면이 깨지지 않는 것이 우선이다.

---

## Gate 0 — 에셋 사전 확인

빌드 전에 파일 존재 여부를 확인한다. **파일이 없어도 빌드는 통과**하지만, 없으면 사용자에게 바로 노출된다.

```bash
ls apps/wedding/public/photos/   # 01.png ~ 09.png 9개 존재 확인
ls apps/wedding/public/og-image.jpg apps/wedding/public/og-image-square.jpg
```

| 파일 | 없을 때 증상 |
|------|-------------|
| `public/photos/01.png ~ 09.png` | 갤러리 썸네일·Lightbox가 placeholder로 표시됨 |
| `public/og-image.jpg` | 카카오톡·슬랙 공유 시 썸네일 깨짐 |
| `public/og-image-square.jpg` | 인스타·라인 공유 시 썸네일 깨짐 |

**통과 기준:** 위 파일이 모두 존재하고 실제 이미지(0byte 아님)인지 확인.

---

## Gate 1 — 정적 검사 (자동화 가능)

```bash
pnpm check-types      # TypeScript 오류 0개 (turbo → packages/ui 포함)
pnpm lint             # ESLint 오류 0개 (warning은 허용)
pnpm format:check     # Prettier 포맷 위반 0개
```

**통과 기준:** 세 명령 모두 exit 0.

**모노레포 주의:** `pnpm check-types`는 루트에서 실행해야 한다. `packages/ui` 변경이 있으면 wedding 타입도 함께 검사된다 (`turbo.json`의 `"dependsOn": ["^check-types"]`).

---

## Gate 2 — 빌드

```bash
pnpm --filter wedding build
```

**통과 기준:**
- 빌드 exit 0
- `Route (app)` 출력에 오류 라우트 없음
- 콘솔에 `Missing environment variable` 경고 없음

**모노레포 주의:** `packages/ui`를 변경한 PR이라면 wedding이 의존하므로 반드시 위 명령으로 wedding까지 빌드가 깨지지 않는지 확인한다.

---

## Gate 3 — 인프라 사전 확인

환경변수가 맞아도 아래가 안 되어 있으면 Gate 4 기능 확인이 실패한다. **Vercel Preview 배포 전에** 완료한다.

### 환경 변수

Vercel 대시보드에서 아래 변수가 모두 등록되어 있는지 직접 확인한다. `.env.local`은 로컬 전용이므로 Vercel에 자동 반영되지 않는다.

| 변수명 | 용도 | 없을 때 증상 |
|--------|------|-------------|
| `WEDDING_DATABASE_URL` | Supabase DB 연결 | 방명록 첫 요청에서 500 |
| `NEXT_PUBLIC_SITE_URL` | OG 메타 절대 URL | 카카오톡 공유 썸네일 URL 깨짐 |
| `NEXT_PUBLIC_KAKAO_APP_KEY` | 카카오톡 공유 + 지도 | 공유 버튼이 링크 복사로 폴백, 지도 SVG로 폴백 |

**보안 확인:** `WEDDING_DATABASE_URL`이 `NEXT_PUBLIC_` 접두사 없이 등록되어 있는지 확인한다. 클라이언트 번들에 노출되면 DB 직접 접근 가능.

### DB 테이블

최초 배포이거나 스키마를 변경한 경우 반드시 실행한다.

```bash
pnpm --filter wedding db:push    # Supabase에 GuestEntry 테이블 생성/동기화
```

**확인:** Supabase 대시보드 → Table Editor → `GuestEntry` 테이블 존재 여부.

이미 테이블이 있고 스키마 변경이 없는 PR이라면 생략 가능.

### 카카오 개발자 콘솔 도메인 등록

`NEXT_PUBLIC_KAKAO_APP_KEY`를 Vercel에 넣어도, 카카오 콘솔에 도메인이 미등록이면 카카오 공유·지도가 실패한다.

1. [developers.kakao.com](https://developers.kakao.com) → 내 애플리케이션 선택
2. 플랫폼 → Web → 사이트 도메인에 **Vercel Preview URL** 또는 **프로덕션 도메인** 추가

**확인:** 등록된 도메인 목록에 배포 URL이 포함되어 있는지 확인.

---

## Gate 4 — 기능 수동 확인 (Vercel Preview URL 기준)

> 로컬이 아닌 **Vercel Preview URL**에서 확인한다. 로컬은 환경 변수가 있어도 Vercel 설정 누락을 잡지 못한다.

| # | 확인 항목 | 판단 기준 |
|---|-----------|-----------|
| 1 | 방명록 쓰기 | 제출 후 새로고침해도 목록에 표시됨 |
| 2 | 방명록 읽기 | 기존 항목이 최신순으로 표시됨 |
| 3 | 갤러리 썸네일 | 그리드 9칸 모두 실사진 표시 (placeholder 없음) |
| 4 | Lightbox | 썸네일 탭 시 실사진 확대, 닫기 버튼 동작 |
| 5 | BGM | 음소거 토글 탭 후 소리 재생, 재탭 시 정지 |
| 6 | 카카오맵 버튼 | 탭 시 카카오맵 앱 또는 웹뷰로 이동 |
| 7 | 네이버·T맵 버튼 | 탭 시 해당 지도로 이동 |
| 8 | 카카오 공유 | 탭 시 카카오톡 공유 시트 표시 |
| 9 | 링크 복사 | 탭 시 "복사됨" 표시되고 클립보드에 URL 있음 |
| 10 | 계좌 복사 | COPY 탭 시 "복사됨" 표시되고 클립보드에 계좌번호 있음 |
| 11 | HUD 챕터 표시 | 스크롤 시 현재 챕터 번호 정확히 업데이트 |
| 12 | Fortune 카드 | "다른 카드" 탭마다 다른 카드로 교체됨 |
| 13 | 캘린더 추가 | "ADD TO CALENDAR" 탭 시 iOS 공유 시트 또는 앱 선택 피커 표시 |

---

## Gate 5 — 모바일 확인 (iOS Safari 실기기)

시뮬레이터는 터치 이벤트·자동재생 정책이 달라 실기기에서만 재현되는 문제를 잡지 못한다.

| 확인 항목 | 판단 기준 |
|-----------|-----------|
| 전체 섹션 스크롤 | 레이아웃 깨짐 없음, 콘텐츠가 주소창에 가려지지 않음 |
| Splash 애니메이션 | 문 열리는 연출이 버벅임 없이 재생됨 |
| Lightbox 열기/닫기 | 썸네일 탭 → 확대, 배경 탭 → 닫힘 |
| BGM | 사용자 탭 이후에만 재생 시작 (자동재생 정책 통과) |
| 폰트 | Cormorant Garamond(serif), Space Grotesk(sans) 둘 다 로드됨 |
| 카운트다운 | 숫자가 실시간으로 줄어듦 (고정값 아님) |

---

## Gate 6 — 성능

**도구:** [PageSpeed Insights](https://pagespeed.web.dev) — Vercel Preview URL 입력

| 항목 | 기준 | 측정 방법 |
|------|------|-----------|
| LCP | 3초 이하 | PageSpeed → Mobile 탭 → LCP 항목 |
| 이미지 최적화 경고 없음 | "Properly size images" 경고 없음 | PageSpeed → Opportunities |
| 스크롤 애니메이션 | 버벅임 없음 | iOS Safari에서 전체 섹션 스크롤하며 육안 확인 |

---

## Gate 7 — 보안

| 확인 항목 | 확인 방법 |
|-----------|-----------|
| DB URL 클라이언트 번들 미포함 | DevTools → Network → JS 번들 다운로드 후 `WEDDING_DATABASE_URL` 또는 `pooler.supabase.com` 검색 — 없어야 함 |
| Supabase RLS 활성화 | Supabase 대시보드 → Table Editor → `GuestEntry` → RLS enabled 확인 |
| 방명록 입력 길이 제한 | 서버 `route.ts`에서 `name.slice(0,20)`, `message.slice(0,300)` 적용 여부 코드 확인 |

---

## 배포 후 확인

머지 후 프로덕션 배포가 완료되면 아래를 확인한다.

| 항목 | 확인 방법 |
|------|-----------|
| Vercel 빌드 성공 | Vercel 대시보드 → Deployments → 최신 빌드 상태 |
| 프로덕션 방명록 | 실제 도메인에서 방명록 작성 → 새로고침 후 표시 확인 |
| HTTPS | 브라우저 주소창 자물쇠 아이콘 확인 |
| OG 카드 | 카카오톡에 링크 붙여넣기 → 썸네일·제목 정상 표시 |

---

## 롤백

배포 후 문제 발생 시:

```
Vercel 대시보드 → Deployments → 이전 배포 선택 → Promote to Production
```

롤백은 수 초 내 완료된다. DB 스키마 변경이 포함된 PR이었다면 롤백 전에 DB 상태를 먼저 확인한다.

---

## CI 자동화 (미래)

Gate 1~2는 GitHub Actions로 자동화 가능하다.

```yaml
# .github/workflows/ci.yml
- run: pnpm check-types
- run: pnpm lint
- run: pnpm format:check
- run: pnpm --filter wedding build
```

Gate 3~8은 PR 템플릿 체크박스로 관리하는 것이 현실적이다.
