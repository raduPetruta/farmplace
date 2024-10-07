'use server'

import { db } from "~/server/db";
import { posts } from "~/server/schemas/posts";
import { eq } from 'drizzle-orm';  // Adjust based on your project structure

export async function createPost(post: any) {
    try {
        await db.insert(posts).values(post);
    } catch (error) {
        console.error('Error creating post:', error);
        throw new Error('Could not create post');
    }
}

export async function getPosts() {
    const allPosts = await db.select().from(posts);
    return allPosts;   
}
