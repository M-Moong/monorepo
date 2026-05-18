import { updateSession } from "@repo/auth/middleware";
import { type NextRequest, NextResponse } from "next/server";

// 로그인이 필요한 경로 — 추가/수정 여기서만
const PROTECTED_PATHS = ["/dashboard", "/profile", "/settings"];

// 로그인된 유저가 접근하면 홈으로 보낼 경로
const AUTH_ONLY_PATHS = ["/auth/login", "/auth/signup"];

export async function middleware(request: NextRequest) {
  const { supabaseResponse, user } = await updateSession(request);
  const { pathname } = request.nextUrl;

  const isProtected = PROTECTED_PATHS.some((p) => pathname.startsWith(p));
  const isAuthOnly = AUTH_ONLY_PATHS.some((p) => pathname.startsWith(p));

  // 비로그인 → 보호된 경로 접근 시 로그인 페이지로
  if (isProtected && !user) {
    const url = request.nextUrl.clone();
    url.pathname = "/auth/login";
    url.searchParams.set("next", pathname); // 로그인 후 원래 경로로 복귀
    return NextResponse.redirect(url);
  }

  // 로그인 상태 → 로그인/회원가입 페이지 접근 시 홈으로
  if (isAuthOnly && user) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // 반드시 supabaseResponse를 그대로 반환해야 세션 쿠키가 유지됨
  return supabaseResponse;
}

export const config = {
  matcher: [
    // 정적 파일, 이미지 제외하고 모든 경로에 미들웨어 적용
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
