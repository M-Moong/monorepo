import { z } from "zod";

export { z } from "zod";
export { createEnv } from "@t3-oss/env-nextjs";

export const baseServerSchema = {
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
};

export const baseClientSchema = {};

/** DB를 사용하는 앱의 env.ts에서 spread해서 사용 */
export const databaseSchema = {
  DATABASE_URL: z.string().url(),
};

/** Supabase 서버 전용 (절대 클라이언트에 노출 금지) */
export const supabaseServerSchema = {
  SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
};

/** Supabase 공개 키 (NEXT_PUBLIC_ 접두사 — 브라우저에 노출됨) */
export const supabaseClientSchema = {
  NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
};
