
// id chatId content createdAt 

import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const messages = sqliteTable('messages', {
  id: text('id').notNull().primaryKey(),
  chatId: text('chatId').notNull(),   //foreign key
  content: text('content').notNull(),
  createdAt: text('createdAt').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});