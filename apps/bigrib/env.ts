import { createEnv, z, baseServerSchema } from "@repo/env";

export const env = createEnv({
  server: {
    ...baseServerSchema,
    // 앱별 서버 환경변수 추가
    // DATABASE_URL: z.string().url(),
  },
  client: {
    // 앱별 클라이언트 환경변수 추가 (NEXT_PUBLIC_ 접두사 필요)
    // NEXT_PUBLIC_API_URL: z.string().url(),
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    // DATABASE_URL: process.env.DATABASE_URL,
    // NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  },
});
