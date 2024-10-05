'use server'

import { db } from "~/server/db";
import { posts } from "~/server/schemas/posts";
import { eq } from 'drizzle-orm';  // Adjust based on your project structure

export async function createPost(post: any) {
    await db.insert(posts).values(post);
}

export async function getPosts() {
    const allPosts = await db.select().from(posts);
    return allPosts;   
}

export async function getPostsByUserId(userId: string) {
    const allPostsByUserId = await db.select().from(posts).where(eq(posts.userId, userId));
    return allPostsByUserId;
}