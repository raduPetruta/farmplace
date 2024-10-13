import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

export default defineConfig({
  schema: "./src/server/schemas/*",
  out: './src/server/migrations',
  dialect: 'sqlite',
  driver: 'turso',
  dbCredentials: {
    url: process.env.NEXT_PUBLIC_TURSO_CONNECTION_URL!,
    authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN!,
  },
});