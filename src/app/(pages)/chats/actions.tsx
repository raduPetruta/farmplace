import { db } from "~/server/db";
import { chats } from "~/server/schemas/chats";
import { eq, or } from 'drizzle-orm';  // Adjust based on your project structure
import { messages } from "~/server/schemas/messages";

export const getConversationsForUser = async (userId: any) => {

    try {
        const allPostsByUserId = await db
                                        .select().from(chats)
                                        .where(or(
                                            eq(chats.senderId, userId),
                                            eq(chats.receiverId, userId)
                                            ))
                                        .execute();
        return allPostsByUserId;
    } catch (error) {
        console.error('Error fetching posts by user ID:', error);
        throw new Error('Could not fetch posts');
    }    

};

export const getMessages = async (conversationId: any) => {
    return await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .execute();
  };
  
export const sendMessageToConversation = async (id: any, messageText: any, conversationId: any, senderId: any, createdAt: any) => {
    return await db
      .insert(messages)
      .values({ id, messageText, conversationId, senderId, createdAt })
      .execute();
};