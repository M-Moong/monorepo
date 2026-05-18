# 미작동 기능 및 누락 사항 정리

> 분석일: 2026-05-16  
> 대상: `apps/wedding/frontend` + `apps/wedding/backend`

---

## 🔴 작동 안 되는 기능

### 1. 갤러리 실제 사진 표시 불가 (Ch04 · Ch03)

**증상**

- Ch04 갤러리 그리드에 실제 사진 대신 줄무늬 색상 패턴(`PhotoFrame`)만 표시됨
- 라이트박스 팝업도 동일하게 패턴만 나옴
- Ch03 커플 카드 내 신랑·신부 사진도 패턴만 표시됨

**원인**

- `src/data/wedding.ts:64-74`에 `/photos/01.jpg` ~ `/photos/09.jpg`가 정의되어 있으나
- `public/` 폴더에 `photos/` 디렉토리가 존재하지 않음 → 전부 404
- `Lightbox.tsx:29`의 `hasRealPhoto` 조건이 항상 `false`라서 `PhotoFrame` 폴백만 표시

**해결**

- `apps/wedding/frontend/public/photos/` 디렉토리 생성
- `01.jpg` ~ `09.jpg` 실제 사진 파일 추가

---

### 2. ADD TO CALENDAR 버튼 — 기능 미구현 (Ch05)

**증상**

- Ch05 Calendar 하단의 "+ ADD TO CALENDAR" 버튼을 눌러도 아무 반응 없음

**원인**

- `Ch05Calendar.tsx:98` 해당 `<button>`에 `onClick` 핸들러가 없음 — UI만 구현된 상태

**해결**

- Google Calendar / iCal 딥링크 생성 로직 구현 필요
  ```
  Google: https://calendar.google.com/calendar/r/eventedit?text=...&dates=20261017T050000Z/20261017T080000Z&location=...
  iCal:   data:text/calendar;charset=utf8,BEGIN:VCALENDAR...
  ```

---

### 3. 카카오톡 공유 버튼 미작동 (Ch09)

**증상**

- "KAKAO" 공유 버튼 클릭 시 카카오 공유 팝업이 뜨지 않고 링크만 복사됨

**원인**

- `NEXT_PUBLIC_KAKAO_APP_KEY` 환경변수가 미설정 (`.env`에 없음)
- `Ch09Finale.tsx:46` — `!appKey` 조건이 `true`라서 `shareLink()`로 폴백됨

**해결**

1. [Kakao Developers](https://developers.kakao.com/)에서 앱 등록 후 JavaScript 키 발급
2. `apps/wedding/frontend/.env`에 추가:
   ```env
   NEXT_PUBLIC_KAKAO_APP_KEY="발급받은_JavaScript_키"
   ```

---

### 4. 방명록 배포 환경에서 작동 불가 (Ch08)

**증상**

- Vercel 등 서버리스 환경에 배포하면 방명록 데이터를 불러오거나 저장할 수 없음

**원인 두 가지**

| 원인    | 설명                                                                                           |
| ------- | ---------------------------------------------------------------------------------------------- |
| SQLite  | Vercel Functions는 읽기 전용 파일시스템이라 `file:./prisma/dev.db` 사용 불가                   |
| API_URL | `apps/wedding/frontend/.env`에 `API_URL`이 없어서 `localhost:3001`로 요청 → 배포 환경에서 실패 |

**해결**

1. [Supabase](https://supabase.com/)에서 PostgreSQL 프로젝트 생성
2. `apps/wedding/backend/.env` 수정:
   ```env
   DATABASE_URL="postgresql://USER:PASSWORD@HOST:5432/DATABASE?schema=public"
   ```
3. `apps/wedding/backend/prisma/schema.prisma`의 provider를 `postgresql`로 변경
4. `pnpm --filter wedding-backend prisma migrate deploy` 실행
5. `apps/wedding/frontend/.env` 수정:
   ```env
   API_URL="https://your-backend.vercel.app"
   ```

---

## 🟠 누락된 에셋 (파일 없음)

### 5. OG 이미지 (공유 썸네일) 없음

**증상**: 카카오톡 · 페이스북 · X · LINE · 슬랙 공유 시 이미지 프리뷰가 표시되지 않음

**누락 파일**

| 파일                         | 용도                             | 권장 크기 |
| ---------------------------- | -------------------------------- | --------- |
| `public/og-image.jpg`        | 가로형 공유 이미지               | 1200×630  |
| `public/og-image-square.jpg` | 정사각 공유 이미지 (LINE·인스타) | 1200×1200 |

---

### 6. 파비콘 · 앱 아이콘 없음

**증상**: 브라우저 탭 아이콘 없음, PWA 설치 후 아이콘 없음

**누락 파일 목록**

```
public/
├── favicon.ico                    # 브라우저 탭 (구버전 호환)
├── favicon-16x16.png              # 브라우저 탭 16px
├── favicon-32x32.png              # 브라우저 탭 32px (레티나)
├── icon-96x96.png                 # 안드로이드 Chrome
├── icon-144x144.png               # Windows 8 라이브 타일
├── icon-192x192.png               # PWA 기본 아이콘
├── icon-512x512.png               # PWA 스플래시
├── apple-touch-icon.png           # iOS 홈화면 (180×180)
├── apple-touch-icon-152x152.png   # iPad
├── apple-touch-icon-167x167.png   # iPad Pro
└── safari-pinned-tab.svg          # Safari 핀 탭
```

**생성 방법**: SVG 마스터 아이콘 제작 후 [favicon.io](https://favicon.io) 또는 [RealFaviconGenerator](https://realfavicongenerator.net/)로 일괄 변환

---

### 7. iOS 스플래시 스크린 없음

**증상**: iOS Safari에서 홈화면 추가 후 앱 실행 시 흰 화면만 잠깐 표시됨

**원인**: `public/splash/` 디렉토리 자체가 없음. `layout.tsx:301-390`에서 14종의 해상도별 이미지를 참조하나 실제 파일이 없음

**누락 파일** (`public/splash/` 하위):

```
640x1136.png    750x1334.png    1242x2208.png   1125x2436.png
828x1792.png    1242x2688.png   1170x2532.png   1284x2778.png
1179x2556.png   1290x2796.png   1536x2048.png   1668x2224.png
1668x2388.png   2048x2732.png
```

---

## 🟡 설정 필요 사항

### 8. NEXT_PUBLIC_SITE_URL 미설정 → SEO/OG 메타데이터 전부 깨짐

**증상**: 카카오톡 공유 시 링크가 `https://example.com`으로 나옴

**원인**: `layout.tsx:33`의 폴백값이 `'https://example.com'`이며 `.env`에 실제 값이 없음

**해결**: `apps/wedding/frontend/.env`에 추가:

```env
NEXT_PUBLIC_SITE_URL="https://실제도메인.vercel.app"
```

---

### 9. BGM — 실제 음악이 아닌 전자음 (오실레이터)

**현상**: BGM 토글을 켜면 웨딩 분위기와 어울리지 않는 단순 전자 화음이 재생됨

**원인**: `useBGM.ts`는 Web Audio API 오실레이터 3개(110Hz · 165Hz · 220Hz)로 소리를 합성. 실제 음악 파일을 재생하는 로직이 없음

**해결 방향 (선택)**

- 실제 음악 파일 방식: `public/bgm.mp3` 추가 후 `<audio>` 태그 또는 `HTMLAudioElement`로 재생
- 오실레이터 개선: 더 많은 주파수 · 하모닉스 추가로 피아노/현악기 느낌 연출

---

### 10. 검색엔진 노출 차단 (robots: noindex)

**현상**: 구글 등 검색엔진에 청첩장이 색인되지 않음

**원인**: `layout.tsx:181` — `robots: { index: false, follow: false }` 설정

**해결**: 공개 노출이 필요한 경우 `layout.tsx`에서 변경:

```ts
robots: {
  index: true,
  follow: true,
  nocache: false,
}
```

---

## 📋 실제 데이터 교체 필요 항목

> 현재 모두 가상 더미 데이터가 입력되어 있음. `apps/wedding/frontend/src/data/wedding.ts`에서 수정.

| 항목        | 현재 값                            | 수정 위치                           |
| ----------- | ---------------------------------- | ----------------------------------- |
| 신랑 이름   | 김민준                             | `WEDDING.groom.name`                |
| 신부 이름   | 이서연                             | `WEDDING.bride.name`                |
| 결혼 날짜   | 2026-10-17                         | `WEDDING.date`                      |
| 결혼식 장소 | 그랜드하얏트 서울                  | `WEDDING.venue.*`                   |
| 신랑측 계좌 | 신한 110-123-456789 (더미)         | `WEDDING.accounts.groom`            |
| 신부측 계좌 | 국민 123-45-6789-012 (더미)        | `WEDDING.accounts.bride`            |
| 부모 이름   | 김영호·이정희·이상철·박미경        | `WEDDING.groom/bride.father/mother` |
| 사진 경로   | `/photos/01.jpg` ~ `09.jpg` (없음) | `WEDDING.photos`                    |

---

## 우선순위 요약

| 우선순위  | 항목                        | 영향            |
| --------- | --------------------------- | --------------- |
| P0 (필수) | 실제 사진 파일 추가         | 갤러리 전체     |
| P0 (필수) | `NEXT_PUBLIC_SITE_URL` 설정 | OG/공유 전체    |
| P0 (필수) | OG 이미지 파일 생성         | 공유 썸네일     |
| P0 (필수) | 방명록 DB 설정 (배포 시)    | 방명록 전체     |
| P1 (중요) | 파비콘/아이콘 파일 추가     | 브라우저 탭·PWA |
| P1 (중요) | 카카오 앱키 설정            | 카카오 공유     |
| P1 (중요) | ADD TO CALENDAR 구현        | 캘린더 추가     |
| P2 (선택) | iOS 스플래시 이미지         | 홈화면 앱       |
| P2 (선택) | BGM 실제 음악 파일          | 배경음악        |
| P2 (선택) | robots noindex 해제         | 검색 노출       |
