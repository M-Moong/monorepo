# 웨딩 청첩장 작업 지침서

> 모든 콘텐츠 데이터는 `apps/wedding/src/data/wedding.ts` 한 파일에서 관리됩니다.

---

## 1. 콘텐츠 교체 (wedding.ts)

파일 위치: `apps/wedding/src/data/wedding.ts`

| 항목             | 현재 값                            | 교체 방법                                       |
| ---------------- | ---------------------------------- | ----------------------------------------------- |
| 결혼식 날짜      | `2026-10-17T14:00:00+09:00`        | `date` 필드 수정                                |
| 날짜 텍스트      | `2026년 10월 17일 토요일 오후 2시` | `dateText` 필드 수정                            |
| 신랑 이름 (한)   | `김민준`                           | `groom.name`                                    |
| 신랑 이름 (영)   | `Minjun` / `Minjun Kim`            | `groom.en` / `groom.full_en`                    |
| 신랑 부모        | `김영호 · 이정희`                  | `groom.father` / `groom.mother`                 |
| 신랑 소개글      | `느린 걸음, 깊은 마음` 외          | `groom.tagline` / `groom.facts[]`               |
| 신부 이름 (한)   | `이서연`                           | `bride.name`                                    |
| 신부 이름 (영)   | `Seoyeon` / `Seoyeon Lee`          | `bride.en` / `bride.full_en`                    |
| 신부 부모        | `이상철 · 박미경`                  | `bride.father` / `bride.mother`                 |
| 신부 소개글      | `문장이 되는 사람` 외              | `bride.tagline` / `bride.facts[]`               |
| 초대 문구        | `함께 걸어온 5년...`               | `inviteMessage` (개행은 `\n` 사용)              |
| 초대 문구 강조줄 | `3` (0-based 인덱스)               | `inviteHighlightLine` — 금색으로 표시할 줄 번호 |
| 예식장 이름      | `그랜드하얏트 서울 그랜드볼룸`     | `venue.name`                                    |
| 예식장 약칭      | `그랜드하얏트 서울`                | `venue.short`                                   |
| 예식장 상세      | `본관 3층 그랜드볼룸`              | `venue.detail`                                  |
| 예식장 주소      | `서울시 용산구 소월로 322`         | `venue.address`                                 |
| 지도 좌표        | `37.539565, 126.992161`            | `venue.mapUrls.kakao` URL 안의 좌표 교체        |
| 계좌번호 (신랑)  | 신한 3개                           | `accounts.groom[]` 배열                         |
| 계좌번호 (신부)  | 국민 3개                           | `accounts.bride[]` 배열                         |

교통편 수정: `venue.transport` 안의 `subway / bus / car / taxi` 각 항목의 `body` 텍스트 수정 (개행은 `\n`).

---

## 2. 사진 교체

### 갤러리 사진 (9장)

경로: `apps/wedding/public/photos/`

```
01.png ~ 09.png  ← 실제 사진으로 교체
```

- 권장 비율: **3:4 (세로)** — 750×1000px 이상
- JPG로 바꿀 경우 `wedding.ts`의 `photos` 배열을 `/photos/01.jpg`로 수정

### 커플 카드 사진

파일: `apps/wedding/src/components/chapters/Ch03Couple/CoupleCard.tsx`

```tsx
// 현재
<PhotoFrame label={c.who} tone={c.tone} />

// 교체 후
<img src={c.photo} alt={c.who} className="h-full w-full object-cover object-top" />
```

`wedding.ts`의 `groom` / `bride` 객체에 `photo: '/photos/groom.jpg'` 필드 추가.

---

## 3. BGM 교체

현재 Web Audio API 오실레이터(전자음) 사용 중. 실제 음악 파일로 교체:

파일: `apps/wedding/src/hooks/useBGM.ts`

```ts
export function useBGM(enabled: boolean): void {
  useEffect(() => {
    if (!enabled) return;
    const audio = new Audio('/bgm.mp3');
    audio.loop = true;
    audio.volume = 0.25;
    audio.play().catch(() => {});
    return () => {
      audio.pause();
      audio.currentTime = 0;
    };
  }, [enabled]);
}
```

음악 파일 위치: `apps/wedding/public/bgm.mp3`

---

## 4. OG 이미지 (SNS 공유 썸네일)

위치: `apps/wedding/public/`

| 파일명                | 크기      | 용도                    |
| --------------------- | --------- | ----------------------- |
| `og-image.jpg`        | 1200×630  | 카카오톡·페북·슬랙 공유 |
| `og-image-square.jpg` | 1200×1200 | 인스타·라인 공유        |

---

## 5. 환경변수 설정

파일: `apps/wedding/.env.local`

```env
# Supabase Transaction pooler (포트 6543) — Vercel 서버리스용
DATABASE_URL="postgresql://postgres.[ref]:[pw]@aws-0-[region].pooler.supabase.com:6543/postgres?pgbouncer=true"

# 배포 도메인
NEXT_PUBLIC_SITE_URL="https://your-domain.vercel.app"

# 카카오 JavaScript 앱키 (지도 + 카카오톡 공유)
NEXT_PUBLIC_KAKAO_APP_KEY="your_kakao_javascript_key"
```

---

## 6. 카카오 앱 설정

1. https://developers.kakao.com → **내 애플리케이션 → 앱 추가**
2. **플랫폼 → Web → 사이트 도메인 추가:** `http://localhost:3000`, 배포 도메인
3. **앱 키 → JavaScript 키** 복사 → `.env.local`의 `NEXT_PUBLIC_KAKAO_APP_KEY`에 입력
4. **카카오 로그인 → 활성화 OFF**

하나의 키로 **지도 미리보기 + 카카오톡 공유** 모두 활성화됩니다.

---

## 7. Vercel 배포

#### 1단계: Supabase DB 생성

1. https://supabase.com → New Project
2. **Settings → Database → Connection string** 에서 URL 복사

#### 2단계: DB 마이그레이션 (최초 1회)

```bash
pnpm --filter wedding db:push
```

#### 3단계: Vercel 배포

- **Root Directory:** `apps/wedding`
- 환경변수:
  - `DATABASE_URL`
  - `NEXT_PUBLIC_SITE_URL`
  - `NEXT_PUBLIC_KAKAO_APP_KEY`

---

## 8. Daily Vibe 문구 교체

파일: `apps/wedding/src/data/fortune.ts`

```ts
{ tag: '#해시태그', q: '카드에 표시될\n문구', a: '— 출처 또는 서브텍스트' }
```

---

## 9. 테마 변경

파일: `apps/wedding/src/config/theme.config.ts`

```ts
export const ACTIVE_THEME = 'dark-gold'; // 'ivory-rose' | 'sage-linen'
```

색상 정의: `apps/wedding/src/app/globals.css`의 `[data-theme='...']` 블록에서 수정.

---

## 10. 체크리스트 (배포 전 최종 확인)

- [ ] `wedding.ts` 이름/날짜/장소/계좌 실제 정보로 교체
- [ ] `public/photos/01~09.png` 실제 사진으로 교체
- [ ] `public/bgm.mp3` 음악 파일 추가 + `useBGM.ts` 코드 교체
- [ ] `public/og-image.jpg`, `og-image-square.jpg` 제작 후 추가
- [ ] 카카오 앱키 발급 + 도메인 등록
- [ ] Supabase DB 생성 + `pnpm --filter wedding db:push` 실행
- [ ] Vercel 환경변수 설정 후 배포
- [ ] 배포 후 카카오톡 공유 테스트
- [ ] 배포 후 방명록 작성 테스트
