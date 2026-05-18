"use server";

import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import type { AuthProvider } from "@repo/auth/types";

export async function signInWithPassword(formData: FormData) {
  const supabase = await createClient();
  const next = (formData.get("next") as string) || "/";

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    redirect(`/auth/login?error=${encodeURIComponent(error.message)}&next=${encodeURIComponent(next)}`);
  }

  redirect(next);
}

export async function signUp(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.signUp({
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  });

  if (error) {
    redirect(`/auth/signup?error=${encodeURIComponent(error.message)}`);
  }

  // 이메일 인증 메일 발송 완료
  redirect("/auth/verify-email");
}

export async function signInWithOAuth(provider: AuthProvider) {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: `${process.env.NEXT_PUBLIC_SUPABASE_URL}/auth/callback`,
    },
  });

  if (error) {
    redirect(`/auth/login?error=${encodeURIComponent(error.message)}`);
  }

  if (data.url) redirect(data.url);
}

export async function signOut() {
  const supabase = await createClient();
  await supabase.auth.signOut();
  redirect("/auth/login");
}

export async function resetPassword(formData: FormData) {
  const supabase = await createClient();

  const { error } = await supabase.auth.resetPasswordForEmail(
    formData.get("email") as string
  );

  if (error) {
    redirect(`/auth/login?error=${encodeURIComponent(error.message)}`);
  }

  redirect("/auth/login?message=비밀번호 재설정 이메일을 발송했습니다.");
}
