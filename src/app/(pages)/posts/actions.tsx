import { db } from "~/server/db";
import { posts } from "~/server/schemas/posts";
import { eq } from 'drizzle-orm';  // Adjust based on your project structure

export async function getPostsByUserId(userId: string) {
    try {
        const allPostsByUserId = await db.select().from(posts).where(eq(posts.userId, userId));
        return allPostsByUserId;
    } catch (error) {
        console.error('Error fetching posts by user ID:', error);
        throw new Error('Could not fetch posts');
    }    
}

export async function getPostById(postId: string) {
    try {
        const postById = await db.select().from(posts).where(eq(posts.id, postId)).limit(1); 
        return postById.length > 0 ? postById[0] : null;
    } catch (error) {
        console.error('Error fetching post by ID:', error);
        throw new Error('Could not fetch post');
    }
}