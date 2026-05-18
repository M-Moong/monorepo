import { signUp, signInWithOAuth } from "@/app/auth/actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function SignupPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 px-4">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold">회원가입</h1>
          <p className="text-sm text-muted-foreground">새 계정을 만드세요</p>
        </div>

        {error && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <form action={signUp} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              이메일
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              autoComplete="email"
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              비밀번호
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="new-password"
              minLength={8}
              className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            />
            <p className="text-xs text-muted-foreground">8자 이상 입력하세요</p>
          </div>

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            회원가입
          </button>
        </form>

        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background px-2 text-muted-foreground">또는</span>
          </div>
        </div>

        <div className="space-y-2">
          <form action={signInWithOAuth.bind(null, "google")}>
            <button
              type="submit"
              className="w-full rounded-md border border-input bg-background px-4 py-2 text-sm font-medium"
            >
              Google로 계속하기
            </button>
          </form>
        </div>

        <p className="text-center text-sm text-muted-foreground">
          이미 계정이 있으신가요?{" "}
          <a href="/auth/login" className="font-medium underline">
            로그인
          </a>
        </p>
      </div>
    </div>
  );
}
