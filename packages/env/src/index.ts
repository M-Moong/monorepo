import { z } from "zod";

export { z } from "zod";
export { createEnv } from "@t3-oss/env-nextjs";

/**
 * 모든 앱에서 공통으로 사용하는 서버 환경변수 스키마
 * 각 앱의 env.ts에서 spread해서 사용
 */
export const baseServerSchema = {
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
};

/**
 * 모든 앱에서 공통으로 사용하는 클라이언트 환경변수 스키마
 */
export const baseClientSchema = {};
