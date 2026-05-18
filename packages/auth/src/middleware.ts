import { createServerClient } from "@supabase/ssr";
import type { CookieOptions } from "@supabase/ssr";
import { type NextRequest, NextResponse } from "next/server";
import type { User } from "@supabase/supabase-js";

/**
 * 미들웨어에서 세션을 갱신하고 유저 정보를 반환.
 *
 * Next.js 미들웨어에서 반드시 호출해야 세션 토큰이 자동 갱신된다.
 * 반환된 supabaseResponse를 그대로 return해야 쿠키가 제대로 전달된다.
 */
export async function updateSession(
  request: NextRequest
): Promise<{ supabaseResponse: NextResponse; user: User | null }> {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet: { name: string; value: string; options: CookieOptions }[]) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options as Parameters<typeof supabaseResponse.cookies.set>[2])
          );
        },
      },
    }
  );

  // getUser()는 매 요청마다 서버에서 토큰을 검증 — getSession()보다 안전
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return { supabaseResponse, user };
}
