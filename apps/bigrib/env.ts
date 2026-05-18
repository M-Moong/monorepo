import { createEnv, z, baseServerSchema, databaseSchema } from "@repo/env";

export const env = createEnv({
  server: {
    ...baseServerSchema,
    ...databaseSchema,
    // 앱별 서버 환경변수 추가
    // SUPABASE_SERVICE_ROLE_KEY: z.string().min(1),
  },
  client: {
    // 앱별 클라이언트 환경변수 추가 (NEXT_PUBLIC_ 접두사 필요)
    // NEXT_PUBLIC_SUPABASE_URL: z.string().url(),
    // NEXT_PUBLIC_SUPABASE_ANON_KEY: z.string().min(1),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    // SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    // NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    // NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
});
