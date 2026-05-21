# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 명령어

```bash
# 전체
pnpm dev                          # 모든 앱 개발 서버
pnpm build                        # 모든 앱 빌드
pnpm lint                         # 모든 앱 lint (turbo)
pnpm check-types                  # 모든 앱 TypeScript 검사
pnpm format                       # prettier 전체 포맷 --write (ts,tsx,css,md)
pnpm format:check                 # prettier 검사만 (수정 없이)

# 특정 앱/패키지만
pnpm --filter wedding dev         # wedding 앱 개발 서버 (localhost:3000)
pnpm --filter wedding build       # wedding 앱 빌드 + 타입 검사
pnpm --filter wedding lint        # wedding ESLint
pnpm --filter @repo/ui lint       # packages/ui ESLint
pnpm --filter @repo/ui lint:fix   # packages/ui ESLint --fix
pnpm --filter @repo/ui format     # packages/ui prettier --write
pnpm --filter @repo/ui format:check  # packages/ui prettier 검사만
```

테스트 러너는 현재 설정되어 있지 않습니다.

## 코드 품질 도구

- **ESLint**: `@repo/eslint-config/next-js` 기반 — TypeScript + React Hooks + Next.js 규칙 포함
- **Prettier**: 루트 `.prettierrc` 기준 전역 적용. `prettier-plugin-tailwindcss`로 Tailwind 클래스 자동 정렬
  - Tailwind v4이므로 `.prettierrc`에 `"tailwindStylesheet": "./apps/wedding/src/app/globals.css"` 지정 필요
  - 코드 작성 후 반드시 `pnpm format` 실행하거나 에디터 저장 시 자동 포맷 적용

## 브랜치 & 커밋

- 커밋 메시지: Conventional Commits (`feat` / `fix` / `docs` / `refactor` / `chore`)
- 커밋 메시지는 한국어로 작성

> 브랜치 전략 및 워크트리/PR 규칙 → @.claude/rules/git-workflow.md

## 모노레포 구조

**pnpm + Turborepo** 기반. `turbo.json`에서 태스크 의존성 관리 (`build → ^build` 등).

```
apps/
  wedding/     # 모바일 웨딩 청첩장 (Next.js 16 + React 19 + Tailwind v4)
packages/
  ui/          # 공유 컴포넌트 라이브러리 (@repo/ui) — shadcn/ui 컴포넌트 저장소
  eslint-config/
  typescript-config/
```

## 상세 가이드

@.claude/shadcn.md
