import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

/**
 * Supabase OAuth / Magic Link / 이메일 인증 콜백 처리.
 * Supabase 대시보드 → Authentication → URL Configuration → Redirect URL에
 * {your-domain}/auth/callback 을 등록해야 함.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/auth/error?reason=callback_failed`);
}
