import { db } from "~/server/db";
import { chats } from "~/server/schemas/chats";
import { eq, or } from 'drizzle-orm';  // Adjust based on your project structure
import { messages } from "~/server/schemas/messages";
import { v4 as uuid } from 'uuid'
import { getPostById } from "../posts/actions";
import { getUserById } from "../profile/actions";

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

export const createConversationFromPost = async (userId: any, postId: any, receiverId: any, createdAt: any) => {
    try {
        //apesi pe mesaj
        //verifici daca exista deja o conv cu postId 
        //daca nu exista deja, o creezi cu 
        // id, 
        // conversationName o sa fie post title concatenat cu cel care a facut postul + cel care da mesaj 
        // createdAt o sa fie atunci
        // senderId e logged in user
        // receiverId e cel care a creat postul
        const existingConversation = await getConversationByPostId(postId);

        if(!existingConversation){
            const senderName = await getUserById(userId);
            const receiverName = await getUserById(receiverId); 
            const post = await getPostById(postId);
            const conversationName = post?.title + "-" + senderName[0]?.name + "-" + receiverName[0]?.name;

            return await db
            .insert(chats)
            .values({
                      id: uuid(), 
                      senderId: userId, 
                      receiverId:  receiverId, 
                      conversationName: conversationName, 
                      createdAt: createdAt, 
                      postId: postId
                  })
            .execute();
        }
        return null;
    } catch (error) {
        console.error('Faied creating conversation from post', error);
        throw new Error('Could not create conversation for post');
    }
}

export const getConversationByPostId = async (postId: any) => {
    try {
        return await db
          .select()
          .from(chats)
          .where(eq(chats.postId, postId))
          .execute();
    } catch (error) {
        console.error('Failed getting conversation by post id', error);
        throw new Error('Could not get conversation by post id');
    }
}

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