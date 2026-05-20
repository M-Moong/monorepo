import { config } from 'dotenv';
import type { Config } from 'drizzle-kit';

config({ path: '.env.local' });

export default {
  schema: './src/db/schema.ts',
  out: './drizzle',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.WEDDING_DATABASE_URL!,
  },
} satisfies Config;
