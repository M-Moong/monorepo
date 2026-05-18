interface Props {
  searchParams: Promise<{ reason?: string }>;
}

const REASONS: Record<string, string> = {
  callback_failed: "인증 처리 중 오류가 발생했습니다.",
};

export default async function AuthErrorPage({ searchParams }: Props) {
  const { reason } = await searchParams;
  const message = (reason && REASONS[reason]) ?? "알 수 없는 오류가 발생했습니다.";

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="space-y-4 text-center">
        <h1 className="text-2xl font-bold text-destructive">인증 오류</h1>
        <p className="text-muted-foreground">{message}</p>
        <a
          href="/auth/login"
          className="inline-block rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground"
        >
          로그인으로 돌아가기
        </a>
      </div>
    </div>
  );
}
