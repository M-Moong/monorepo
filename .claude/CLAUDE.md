# CLAUDE.md

## 명령어

```bash
pnpm dev                      # 모든 앱 개발 서버
pnpm build                    # 모든 앱 빌드
pnpm lint                     # ESLint (turbo)
pnpm check-types              # TypeScript 검사
pnpm format                   # Prettier --write

pnpm --filter wedding dev     # wedding 개발 서버 (localhost:3000)
pnpm --filter wedding build   # wedding 빌드 + 타입 검사
pnpm --filter wedding lint    # wedding ESLint
```

## 코드 품질

- **Prettier**: 코드 작성 후 반드시 `pnpm format` 실행 (Tailwind v4 클래스 정렬 포함)

## 브랜치 & 커밋

- Conventional Commits (`feat` / `fix` / `refactor` / `chore`) — 메시지는 한국어
- 상세 규칙 → @.claude/rules/git-workflow.md

## 모노레포 구조

```
apps/
  wedding/   # 모바일 웨딩 청첩장 (Next.js + React 19 + Tailwind v4)
packages/
  ui/        # 공유 컴포넌트 (@repo/ui) — shadcn/ui 저장소
```

## shadcn/ui

컴포넌트는 `packages/ui`에서 관리. 반드시 `--cwd packages/ui`로 실행:

```bash
pnpm dlx shadcn@latest add button --cwd packages/ui
```

```tsx
import { Button } from '@repo/ui/components/button';
import { cn } from '@repo/ui/lib/utils';
```

- `packages/ui` 내부 utils import는 상대 경로: `import { cn } from '../lib/utils'`
- shadcn CSS 변수 클래스(`bg-background` 등)는 앱 고유 토큰과 혼용 금지

## 상세 가이드

@apps/wedding/.claude/architecture.md
@apps/wedding/.claude/WORK_GUIDE.md
