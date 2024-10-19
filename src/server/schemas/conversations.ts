// id name createdAt

import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const conversations = sqliteTable('conversations', {
  id: text('id').notNull().primaryKey(),
  senderId: text("sender_id"),
  receiverId: text("receiverId"),
  conversationName: text('name').notNull(),
  createdAt: text('createdAt').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  postId: text('postId').notNull(),
  lastSentMessageDate: text('lastSentMessageDate').default(sql`(CURRENT_TIMESTAMP)`),
  lastSentMessageId: text('lastSentMessageId').default(""),
  messagesIds: text('messagesIds').default(""),
});