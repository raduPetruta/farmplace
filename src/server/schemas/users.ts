import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const users = sqliteTable('users', {
  id: text('id').notNull().primaryKey(),
  name: text('id').notNull(),
  email: text('email').notNull(),
});