import {
  createEnv,
  z,
  baseServerSchema,
  databaseSchema,
  supabaseClientSchema,
  supabaseServerSchema,
} from "@repo/env";

export const env = createEnv({
  server: {
    ...baseServerSchema,
    ...databaseSchema,
    ...supabaseServerSchema,
  },
  client: {
    ...supabaseClientSchema,
  },
  runtimeEnv: {
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY,
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  },
});
