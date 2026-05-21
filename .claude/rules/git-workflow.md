# Git 작업 규칙

## 브랜치 전략

```
main (배포)
 └── dev (개발 베이스)
      ├── feat/xxx
      ├── fix/xxx
      ├── refactor/xxx
      └── chore/xxx
```

### 절대 규칙

- `main`은 배포 전용. 직접 커밋, 브랜치 생성, 머지 **절대 금지**
- 모든 작업 브랜치는 반드시 `dev`에서 checkout
- 사용자의 명시적 지시 없이 `main` 관련 작업 금지

### 브랜치 생성

```bash
# 항상 dev 최신 상태에서 시작
git checkout dev
git pull origin dev
git checkout -b feat/xxx
```

- 같은 이름의 브랜치가 이미 존재하면 사용자에게 확인 후 진행

### 브랜치 네이밍

| 타입           | 용도            |
| -------------- | --------------- |
| `feat/xxx`     | 새 기능         |
| `fix/xxx`      | 버그 수정       |
| `refactor/xxx` | 리팩토링        |
| `chore/xxx`    | 설정, 의존성 등 |

## 워크트리 규칙

서브에이전트가 다른 `feat` 브랜치에서 작업 중일 수 있으므로, 병렬 작업은 항상 워크트리를 사용한다.

### 생성 규칙

- 위치: 모노레포와 **같은 계층** (`../`)
- 이름: `monorepo-{브랜치명}` (슬래시는 하이픈으로 변환)
- 항상 `dev` 기준으로 새 브랜치 생성

```bash
# 예시: feat/map 작업
git -C /path/to/monorepo worktree add ../monorepo-feat-map -b feat/map dev
```

### 정리 규칙

- 작업 완료 후 사용자 승인을 받으면 즉시 워크트리 제거
- 승인 키워드: 사용자가 명시적으로 완료/승인 의사를 밝힌 경우

```bash
git worktree remove ../monorepo-feat-map
git worktree prune
```

## Pull Request 규칙

### feat → dev PR

- 제목/본문: **한국어**
- 작성 후 사용자 승인을 받고 생성 (`gh pr create`)
- 사용자 승인 없이 PR 생성 금지

### dev → main PR

- 사용자의 명시적 지시가 있을 때만 진행
- 절대 자의적으로 생성하지 않음

### PR 형식

```
제목: feat: {기능 요약}

## 변경 내용
- 항목

## 테스트
- [ ] 확인 항목
```

## 작업 시작 체크리스트

1. `dev` 최신 상태 pull
2. `dev`에서 새 브랜치 checkout (또는 워크트리 생성)
3. 같은 이름 브랜치 존재 여부 확인 → 존재하면 사용자에게 확인
