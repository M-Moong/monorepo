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
