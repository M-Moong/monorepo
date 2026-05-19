export default function VerifyEmailPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-sm space-y-4 px-4 text-center">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">이메일을 확인해주세요</h1>
          <p className="text-sm text-muted-foreground">
            가입하신 이메일로 인증 링크를 발송했습니다.
            <br />
            이메일을 확인하여 계정을 활성화해주세요.
          </p>
        </div>
        <p className="text-xs text-muted-foreground">
          이메일이 오지 않았다면 스팸 폴더를 확인해보세요.
        </p>
        <a
          href="/auth/login"
          className="inline-block text-sm font-medium underline"
        >
          로그인으로 돌아가기
        </a>
      </div>
    </div>
  );
}
