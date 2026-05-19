import { resetPassword } from "@/app/auth/actions";

interface Props {
  searchParams: Promise<{ error?: string }>;
}

export default async function ResetPasswordPage({ searchParams }: Props) {
  const { error } = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-6 px-4">
        <div className="space-y-1 text-center">
          <h1 className="text-2xl font-bold">비밀번호 재설정</h1>
          <p className="text-sm text-muted-foreground">
            가입한 이메일을 입력하면 재설정 링크를 보내드립니다.
          </p>
        </div>

        {error && (
          <p className="rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
            {error}
          </p>
        )}

        <form action={resetPassword} className="space-y-4">
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

          <button
            type="submit"
            className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
          >
            재설정 링크 보내기
          </button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          <a href="/auth/login" className="font-medium underline">
            로그인으로 돌아가기
          </a>
        </p>
      </div>
    </div>
  );
}
