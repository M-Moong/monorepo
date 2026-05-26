# 실제 데이터 교체 가이드

## 콘텐츠 (`src/data/wedding.ts`)

| 항목             | 현재 값                        | 필드                                             |
| ---------------- | ------------------------------ | ------------------------------------------------ |
| 결혼식 날짜      | `2026-10-17T14:00:00+09:00`    | `date` / `dateText`                              |
| 신랑 이름        | `김민준` / `Minjun Kim`        | `groom.name` / `groom.en`                        |
| 신랑 부모        | `김영호 · 이정희`              | `groom.father` / `.mother`                       |
| 신랑 소개글      | `느린 걸음, 깊은 마음` 외      | `groom.tagline` / `.facts`                       |
| 신부 이름        | `이서연` / `Seoyeon Lee`       | `bride.name` / `bride.en`                        |
| 신부 부모        | `이상철 · 박미경`              | `bride.father` / `.mother`                       |
| 신부 소개글      | `문장이 되는 사람` 외          | `bride.tagline` / `.facts`                       |
| 초대 문구        | `함께 걸어온 5년...`           | `inviteMessage` (`\n` 개행)                      |
| 초대 문구 강조줄 | `3`                            | `inviteHighlightLine` (0-based, 금색)            |
| 예식장           | `그랜드하얏트 서울 그랜드볼룸` | `venue.name` / `.short` / `.detail` / `.address` |
| 지도 좌표        | `37.539565, 126.992161`        | `venue.mapUrls.kakao` URL 내 좌표                |
| 교통편           | 지하철/버스/자가용/택시        | `venue.transport.{subway\|bus\|car\|taxi}.body`  |
| 계좌번호         | 신한(신랑) / 국민(신부)        | `accounts.groom[]` / `accounts.bride[]`          |

## 사진

- **갤러리**: `public/photos/01.png ~ 09.png` 교체 (권장: 3:4 세로, 750×1000px 이상)
- **커플 카드**: `Ch03Couple/CoupleCard.tsx`의 `PhotoFrame`을 실제 `<img>`로 교체, `wedding.ts` groom/bride에 `photo` 필드 추가
- **OG 이미지**: `public/og-image.jpg` (1200×630) / `public/og-image-square.jpg` (1200×1200)

## BGM

`public/bgm.mp3` 추가 후 `src/hooks/useBGM.ts`를 Web Audio 오실레이터에서 `new Audio('/bgm.mp3')`로 교체.

## 테마

`src/config/theme.config.ts` — `ACTIVE_THEME`: `'dark-gold'` | `'ivory-rose'` | `'sage-linen'`
