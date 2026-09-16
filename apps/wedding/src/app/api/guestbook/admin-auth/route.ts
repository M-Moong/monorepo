import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const COOKIE_NAME = 'gb_admin';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 30; // 30일

export async function POST(req: Request) {
  const { code } = await req.json();
  const adminSecret = process.env.GUESTBOOK_ADMIN_SECRET;

  if (!adminSecret || code !== adminSecret) {
    return NextResponse.json({ error: '비밀번호가 올바르지 않습니다.' }, { status: 401 });
  }

  const cookieStore = await cookies();
  cookieStore.set(COOKIE_NAME, adminSecret, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    path: '/guestbook/admin',
    maxAge: COOKIE_MAX_AGE,
  });

  return NextResponse.json({ ok: true });
}
