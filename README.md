# Monorepo

pnpm + Turborepo 기반 모노레포.

## 구조

```
apps/
  wedding/           # 모바일 웨딩 청첩장 (Next.js 16 + React 19 + Tailwind v4)
packages/
  ui/                # 공유 컴포넌트 라이브러리 (@repo/ui) — shadcn/ui 기반
  eslint-config/     # ESLint 설정 공유 패키지 (@repo/eslint-config)
  typescript-config/ # tsconfig 공유 패키지 (@repo/typescript-config)
```

## 명령어

```bash
# 전체
pnpm dev             # 모든 앱 개발 서버
pnpm build           # 모든 앱 빌드
pnpm lint            # 모든 앱 lint
pnpm check-types     # 모든 앱 TypeScript 검사
pnpm format          # prettier 전체 포맷 --write (ts,tsx,css,md)
pnpm format:check    # prettier 검사만 (수정 없이)

# 특정 앱/패키지만
pnpm --filter wedding dev         # wedding 앱 개발 서버 (localhost:3000)
pnpm --filter wedding build       # wedding 앱 빌드
pnpm --filter wedding lint        # wedding ESLint
pnpm --filter @repo/ui lint       # packages/ui ESLint
```

---

## 설정 현황

각 앱·패키지가 어떤 설정을 전역(루트)에서 가져오고, 어떤 설정을 자체적으로 갖는지 정리.

### Prettier

|                | `.prettierrc`                                                    | `prettier-plugin-tailwindcss`                              |
| -------------- | ---------------------------------------------------------------- | ---------------------------------------------------------- |
| 루트           | `semi`, `singleQuote`, `tabWidth`, `trailingComma`, `printWidth` | 미사용                                                     |
| `apps/wedding` | **자체 파일** — 루트와 동일한 5개 옵션 + 플러그인 추가           | `tailwindStylesheet: ./src/app/globals.css`                |
| `packages/ui`  | 루트 설정 상속                                                   | 패키지에 설치되어 있으나 `.prettierrc` 없이 루트 설정 사용 |

> Prettier는 `extends`가 없어서 wedding은 루트 옵션을 직접 복사한 뒤 Tailwind 관련 옵션을 추가한 구조.

---

### ESLint

|                | 설정 파일                  | 사용하는 config                      |
| -------------- | -------------------------- | ------------------------------------ |
| `apps/wedding` | `eslint.config.mjs` (자체) | `@repo/eslint-config/next-js`        |
| `packages/ui`  | `eslint.config.mjs` (자체) | `@repo/eslint-config/react-internal` |

> 루트에 ESLint 설정 없음. 각 앱·패키지가 `@repo/eslint-config`에서 용도에 맞는 preset을 가져다 씀.

**`@repo/eslint-config` preset 목록:**

- `base.js` — 기본 TypeScript 규칙
- `next.js` — Next.js + React Hooks + TypeScript (wedding이 사용)
- `react-internal.js` — 패키지 내부 React 컴포넌트용 (ui가 사용)
- `node-script.js` — Node.js 스크립트용

---

### TypeScript

|                | `tsconfig.json` | `extends`                                                                  |
| -------------- | --------------- | -------------------------------------------------------------------------- |
| `apps/wedding` | 자체            | `@repo/typescript-config/nextjs.json` + `@/*` 경로 별칭 추가               |
| `packages/ui`  | 자체            | `@repo/typescript-config/react-library.json` + `@repo/ui/*` 경로 별칭 추가 |

> 루트에 tsconfig 없음. **`@repo/typescript-config` preset 목록:**
>
> - `base.json` — strict, ES2022, isolatedModules, noUncheckedIndexedAccess
> - `nextjs.json` — base + Next.js 플러그인, Bundler 모듈 해석
> - `react-library.json` — base + 선언 파일 생성 포함

---

### .gitignore

|                | 관리 위치           | 주요 항목                                                                                                                                                     |
| -------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 루트           | `.gitignore`        | `node_modules`, `.turbo`, `.vercel`, `.next/`, `build`, `dist`, `.env` 계열, `*.tsbuildinfo`, `.DS_Store`, `**/supabase/.temp`, `.claude/settings.local.json` |
| `apps/wedding` | `.gitignore` (자체) | `.env*` (루트보다 넓은 와일드카드), `next-env.d.ts`, `/drizzle`, `/public/photos/`                                                                            |

---

### Turborepo (`turbo.json`) — 루트 전용

전체 태스크 파이프라인 정의. 모든 앱·패키지에 적용.

- `build` — `^build` 의존 (패키지 먼저 빌드), `.env*` 변경 시 캐시 무효화, `.next/**` 출력 캐시
- `lint` — `^lint` 의존, `NODE_ENV` 환경변수 인식
- `check-types` — `^check-types` 의존
- `dev` — 캐시 없음, persistent 모드

---

### Drizzle ORM — `apps/wedding` 전용

루트 및 다른 패키지에는 없는 wedding 전용 설정.

- 설정 파일: `drizzle.config.ts`
- dialect: `postgresql` / schema: `./src/db/schema.ts` / out: `./drizzle`
- 환경변수: `WEDDING_DATABASE_URL` (`.env.local`에서 로드)

```bash
pnpm --filter wedding db:generate   # 마이그레이션 파일 생성
pnpm --filter wedding db:migrate    # 마이그레이션 실행
pnpm --filter wedding db:push       # 스키마 직접 push
pnpm --filter wedding db:studio     # Drizzle Studio 실행
```
