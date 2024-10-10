
// id chatId content createdAt 

import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const messages = sqliteTable('messages', {
  id: text('id').notNull().primaryKey(),
  messageText: text('messageText').notNull(),
  conversationId: text("conversationId").notNull(),
  senderId: text("senderId").notNull(),
  createdAt: text('createdAt').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});

