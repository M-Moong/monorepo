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

# DB (apps/wedding 전용)
pnpm --filter wedding db:generate   # 마이그레이션 파일 생성
pnpm --filter wedding db:migrate    # 마이그레이션 실행
pnpm --filter wedding db:push       # 스키마 직접 push
pnpm --filter wedding db:studio     # Drizzle Studio 실행
```

---

## 설정

### Prettier

| | 루트 | `apps/wedding` |
|---|---|---|
| 설정 파일 | `.prettierrc` | `.prettierrc` (자체) |
| `packages/ui` 적용 | 루트 상속 | — |

**루트 `.prettierrc`**

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100
}
```

**`apps/wedding/.prettierrc`** — 루트 동일 + Tailwind 추가

```json
{
  "semi": true,
  "singleQuote": true,
  "tabWidth": 2,
  "trailingComma": "es5",
  "printWidth": 100,
  "plugins": ["prettier-plugin-tailwindcss"],
  "tailwindStylesheet": "./src/app/globals.css"
}
```

> Prettier는 `extends`가 없어서 wedding은 루트 옵션을 복사한 뒤 Tailwind 옵션을 추가한 구조.

---

### ESLint

루트에 설정 없음. 각 앱·패키지가 `@repo/eslint-config`에서 preset을 가져다 씀.

| | 사용 preset |
|---|---|
| `apps/wedding` | `@repo/eslint-config/next-js` |
| `packages/ui` | `@repo/eslint-config/react-internal` |

---

### TypeScript

루트에 tsconfig 없음. 각 앱·패키지가 `@repo/typescript-config`를 `extends`해서 사용.

| | extends |
|---|---|
| `apps/wedding` | `nextjs.json` + `@/*` 경로 별칭 |
| `packages/ui` | `react-library.json` + `@repo/ui/*` 경로 별칭 |

**`packages/typescript-config/base.json`** — 공통 베이스

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "esModuleInterop": true,
    "incremental": false,
    "isolatedModules": true,
    "lib": ["es2022", "DOM", "DOM.Iterable"],
    "module": "NodeNext",
    "moduleDetection": "force",
    "moduleResolution": "NodeNext",
    "noUncheckedIndexedAccess": true,
    "resolveJsonModule": true,
    "skipLibCheck": true,
    "strict": true,
    "target": "ES2022"
  }
}
```

**`packages/typescript-config/nextjs.json`** — Next.js 앱용 (base 확장)

```json
{
  "extends": "./base.json",
  "compilerOptions": {
    "plugins": [{ "name": "next" }],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "allowJs": true,
    "jsx": "preserve",
    "noEmit": true
  }
}
```

**`apps/wedding/tsconfig.json`** — nextjs.json 확장 + 경로 별칭

```json
{
  "extends": "@repo/typescript-config/nextjs.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": { "@/*": ["./src/*"] }
  },
  "exclude": ["node_modules"]
}
```

---

### Turborepo

**루트 `turbo.json`** — 전체 태스크 파이프라인. 모든 앱·패키지에 적용.

```json
{
  "ui": "tui",
  "tasks": {
    "build": {
      "dependsOn": ["^build"],
      "inputs": ["$TURBO_DEFAULT$", ".env*"],
      "outputs": [".next/**", "!.next/cache/**"]
    },
    "lint": {
      "dependsOn": ["^lint"],
      "env": ["NODE_ENV"]
    },
    "check-types": {
      "dependsOn": ["^check-types"]
    },
    "dev": {
      "cache": false,
      "persistent": true
    }
  }
}
```

---

### .gitignore

**루트 `.gitignore`**

```gitignore
node_modules
.pnp
.pnp.js

.env
.env.local
.env.development.local
.env.test.local
.env.production.local

coverage
.turbo
.vercel
**/supabase/.temp

.next/
out/
build
dist

npm-debug.log*
yarn-debug.log*
yarn-error.log*
.pnpm-debug.log*

.claude/settings.local.json

.DS_Store
*.pem
*.tsbuildinfo
```

**`apps/wedding/.gitignore`** — wedding 전용 추가 항목

```gitignore
.env*
!.env.example

next-env.d.ts

/drizzle

/public/photos/
```

---

### Drizzle ORM — `apps/wedding` 전용

환경변수: `WEDDING_DATABASE_URL` (`.env.local`에서 로드)

```ts
// drizzle.config.ts
{
  dialect: 'postgresql',
  schema: './src/db/schema.ts',
  out: './drizzle',
}
```
