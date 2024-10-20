import { db } from "~/server/db";
import { conversations } from "~/server/schemas/conversations";
import { eq, inArray, or } from 'drizzle-orm';  // Adjust based on your project structure
import { messages } from "~/server/schemas/messages";
import { v4 as uuid } from 'uuid'
import { getPostById } from "../posts/actions";
import { getUserById } from "../profile/actions";

export const getConversationsForUser = async (userId: any) => {
    try {
        const allPostsByUserId = await db
                                        .select().from(conversations)
                                        .where(or(
                                            eq(conversations.senderId, userId),
                                            eq(conversations.receiverId, userId)
                                            ))
                                        .execute();
        return allPostsByUserId;
    } catch (error) {
        console.error('Error fetching posts by user ID:', error);
        throw new Error('Could not fetch posts');
    }    
};

export const createConversationFromPost = async (userId: any, receiverId: any, postId: any) => {
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
        console.log("Exx", existingConversation)

        if(existingConversation.length === 0){
            const senderName = await getUserById(userId);
            const receiverName = await getUserById(receiverId); 
            const post = await getPostById(postId);
            const conversationName = post?.title + "-" + senderName[0]?.name + "-" + receiverName[0]?.name;
            
            await db
            .insert(conversations)
            .values({
                      id: uuid(), 
                      senderId: userId, 
                      receiverId:  receiverId, 
                      conversationName: conversationName, 
                      createdAt: Math.floor(Date.now() /1000).toString(), 
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
          .from(conversations)
          .where(eq(conversations.postId, postId))
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

export const getMessagesByIds = async (messageIds: string[]) => {
    if (!messageIds || messageIds.length === 0) return [];
    try {
      const result = await db
        .select()
        .from(messages)
        .where(inArray(messages.id, messageIds));
      return result;
    } catch (error) {
      console.error("Error fetching messages by IDs:", error);
      throw new Error("Failed to fetch messages.");
    }
};  

export const getMessageById = async (messageId: any) => {
    if (!messageId) return "";
    try {
      const result = await db
        .select()
        .from(messages)
        .where(eq(messages.id, messageId))
        .limit(1)
        .execute(); 
      return result;
    } catch (error) {
      console.error("Error fetching messages by IDs:", error);
      throw new Error("Failed to fetch messages.");
    }
}

export const createNewMessage = async (id: any, messageText: any, conversationId: any, senderId: any, createdAt: any) => {
    try {
        return await db
            .insert(messages)
            .values({ id, messageText, conversationId, senderId, createdAt })
            .execute();
    } catch (error) {
        console.log("Error while creating new message", error)
    }
}

export const saveMessageToConversation = async (conversation: any, message: any) => {
    try {
        if(message.messageText && conversation.id) {
            const currentConversation: any = await db
                .select()
                .from(conversations)
                .where(eq(conversations.id, conversation.id))
                .limit(1); 
            if (currentConversation) {
                const existingMessagesIds = currentConversation[0].messagesIds;
                let updatedMessagesIds: any = "";                                                        

                await createNewMessage( message.id, 
                                        message.messageText, 
                                        message.conversationId, 
                                        message.senderId, 
                                        message.createdAt ); 

                existingMessagesIds ? updatedMessagesIds = existingMessagesIds + "," + message.id: 
                                      updatedMessagesIds = message.id; 

                await db.update(conversations)
                        .set({ messagesIds: updatedMessagesIds, 
                               lastSentMessageId: message.id, 
                               lastSentMessageDate: message.createdAt})
                        .where(eq(conversations.id, conversation.id));
                console.log("Message successfully added to the conversation.");
            }
        }
    } catch (error) {
        console.log("Error saving message to conversation", error);
    }
};