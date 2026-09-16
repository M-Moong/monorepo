'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@repo/ui/components/input-otp';

export function AdminOtpLogin() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);
  const [isPending, startTransition] = useTransition();

  const verify = (value: string) => {
    setError(false);
    startTransition(async () => {
      const res = await fetch('/api/guestbook/admin-auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code: value }),
      });
      if (res.ok) {
        router.refresh();
      } else {
        setError(true);
        setCode('');
      }
    });
  };

  const handleChange = (value: string) => {
    setCode(value);
    if (value.length === 6) verify(value);
  };

  return (
    <div className="flex min-h-dvh flex-col items-center justify-center gap-8 bg-bg px-5 font-sans text-fg">
      <div className="text-center">
        <div className="font-sans-en text-3xs tracking-[0.4rem] text-gold">· ADMIN ·</div>
        <h1 className="mt-2 font-serif-en text-4xl font-light text-fg italic">Guestbook Access</h1>
        <p className="mt-2 text-2xs tracking-[0.1rem] text-fg/40">
          비밀글 포함 전체 방명록을 보려면 비밀번호를 입력하세요.
        </p>
      </div>

      <InputOTP
        maxLength={6}
        value={code}
        onChange={handleChange}
        disabled={isPending}
        inputMode="numeric"
      >
        <InputOTPGroup className="gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <InputOTPSlot
              key={i}
              index={i}
              className={`h-13 w-10.5 rounded-md! border font-sans-en text-xl text-gold ${
                error
                  ? 'border-red-400/60 bg-warm'
                  : 'border-fg/15 bg-warm data-[active=true]:border-gold data-[active=true]:ring-2 data-[active=true]:ring-gold/25'
              }`}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>

      <p className={`text-2xs tracking-[0.1rem] ${error ? 'text-red-400' : 'text-fg/35'}`}>
        {error ? '비밀번호가 올바르지 않습니다.' : '6자리 비밀번호를 입력하세요.'}
      </p>
    </div>
  );
}
