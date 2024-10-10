import { config } from 'dotenv';
import { drizzle } from 'drizzle-orm/libsql';
import { createClient } from '@libsql/client';
config({ path: '.env' }); // or .env.local


const client = createClient({
  url: process.env.NEXT_PUBLIC_TURSO_CONNECTION_URL!,
  authToken: process.env.NEXT_PUBLIC_TURSO_AUTH_TOKEN!,
});

export const db = drizzle(client);