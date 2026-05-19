# shadcn/ui

모노레포 전역에 shadcn/ui가 설치되어 있습니다.

## 구조

- **컴포넌트**: `packages/ui/src/components/` — shadcn 컴포넌트를 여기에 추가
- **유틸리티**: `packages/ui/src/lib/utils.ts` — `cn()` 함수 (clsx + tailwind-merge)
- **CSS 변수**: `apps/wedding/src/app/globals.css` — shadcn 테마 변수 (`--background`, `--primary` 등)
- **설정 파일**: `packages/ui/components.json`, `apps/wedding/components.json`

## 새 컴포넌트 추가

shadcn CLI로 `packages/ui` 디렉토리 기준 실행:

```bash
pnpm dlx shadcn@latest add button --cwd packages/ui
```

또는 수동으로 `packages/ui/src/components/`에 파일 직접 작성.

## import 경로

```tsx
// apps/wedding 내에서 shadcn 컴포넌트 사용
import { Button } from '@repo/ui/components/button';

// cn() 유틸리티
import { cn } from '@repo/ui/lib/utils';
```

## 의존성 추가

shadcn 관련 패키지는 `packages/ui`에 설치:

```bash
pnpm add --filter @repo/ui @radix-ui/react-dialog
```

## 주의사항

- `packages/ui/src/components/` 내부에서 utils import 시 **상대 경로** 사용: `import { cn } from '../lib/utils'`
- shadcn CSS 변수 기반 클래스(`bg-background`, `text-primary`)는 shadcn 컴포넌트 전용
- wedding 앱 고유 토큰(`bg-bg`, `text-gold` 등)과 공존하므로 혼용 금지
