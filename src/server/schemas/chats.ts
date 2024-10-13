// id name createdAt

import { sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";

export const chats = sqliteTable('chats', {
  id: text('id').notNull().primaryKey(),
  senderId: text("sender_id"),
  receiverId: text("receiverId"),
  conversationName: text('name').notNull(),
  createdAt: text('createdAt').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  postId: text('postId').notNull()
});