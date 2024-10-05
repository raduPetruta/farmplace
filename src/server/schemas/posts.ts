import { desc, sql } from "drizzle-orm";
import { sqliteTable, text } from "drizzle-orm/sqlite-core";
import { users } from "./users";
import { array } from "zod";
import { boolean } from "drizzle-orm/mysql-core";
import { integer } from "drizzle-orm/sqlite-core";

export const posts = sqliteTable('posts', {
  id: text('id').notNull().primaryKey(),
  userId: text('userId').notNull(),   //foreign key
  title: text('content').notNull(),
  description: text('description').notNull(),
  imagesUrls: text('imagesUrl').notNull(),  // Store JSON as text
  location: text('location').notNull(),
  price: text('price').notNull(),
  isNegotiable: integer('isNegotiable', { mode: 'boolean' }), 
  condition: text('condition').notNull(),
  createdAt: text('createdAt').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
  updatedAt: text('updatedAt').default(sql`(CURRENT_TIMESTAMP)`).notNull(),
});