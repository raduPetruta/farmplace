import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable('posts', {
  id: text('id').notNull().primaryKey(),
  content: text('content').notNull(),
  createdAt: text('createdAt').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});