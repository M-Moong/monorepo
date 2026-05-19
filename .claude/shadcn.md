# shadcn/ui

모노레포 전역에 shadcn/ui가 설치되어 있습니다. 컴포넌트는 `packages/ui`에서 관리하고, 각 앱에서 import해 사용합니다.

## 구조

```
packages/ui/
├── src/
│   ├── components/   # shadcn CLI로 추가한 컴포넌트 (button.tsx 등)
│   ├── lib/
│   │   └── utils.ts  # cn() 함수 (clsx + tailwind-merge)
│   └── styles/
│       └── globals.css  # packages/ui 자체 CSS 변수
├── components.json   # shadcn CLI 설정
└── package.json      # @repo/ui
```

각 앱은 자체 `components.json`과 `globals.css`를 별도로 갖습니다.

## 새 컴포넌트 추가

shadcn CLI는 반드시 `packages/ui` 기준으로 실행:

```bash
pnpm dlx shadcn@latest add button --cwd packages/ui
```

추가된 컴포넌트는 `packages/ui/src/components/`에 생성됩니다.

## import 경로

```tsx
// shadcn 컴포넌트
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
- shadcn CSS 변수 기반 클래스(`bg-background`, `text-primary` 등)는 shadcn 컴포넌트 전용 — 앱 고유 토큰과 혼용 금지
