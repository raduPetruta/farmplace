'use client';

import { useEffect, useState } from 'react';
import { getConversationsForUser } from "../(pages)/chats/actions";
import { getPostById } from '../(pages)/posts/actions';
import { getAllUsersClerk } from '../(pages)/profile/actions';

export default function ConversationList({ userId, onSelectConversation }: any) {
  const defaultPostImageSrc = "https://utfs.io/f/pNntNKO2tJAb4xDR6Wi2DOKUW0AbJkt8BZ6zmfXy1LgQ5FNM";
  const [conversations, setConversations] = useState<any[]>([]);
  const [conversationImagesMap, setConversationImagesMap] = useState<Map<any, string>>(new Map());
  const [userEmails, setUserEmails] = useState<any[]>([]);

  useEffect(() => { 
    async function fetchConversations() {
      const result = await getConversationsForUser(userId);
      setConversations(result);
      const users = await getAllUsersClerk();
      if(users){
        setUserEmails(users);
      }
    }
    fetchConversations();
  }, [userId]);

  useEffect(() => {
    async function fetchConversationsFirstImages() {
      const imagesMap = new Map<any, string>();
      for (const conversation of conversations) {
        const firstImage = await getFirstImageOfPost(conversation.postId);
        imagesMap.set(conversation.postId, firstImage || defaultPostImageSrc);
      }
      setConversationImagesMap(imagesMap);
    }
    fetchConversationsFirstImages();
  }, [conversations]);

  async function getFirstImageOfPost(postId: any) {
    const post = await getPostById(postId);
    if (post) {
      return post.imagesUrls?.split(',')[0]?.toString();
    }
    return defaultPostImageSrc;
  }

  function getUserEmail(userId: any){
    const found = userEmails.find(user => user.id === userId);
    if(found)
      return found.emailAddresses[0].emailAddress;
  }

  return (
    <div>
      {conversations.map((conversation: any) => (
        <div
          key={conversation.id}
          onClick={() => onSelectConversation(conversation)}
          style={{ padding: '10px', borderBottom: '1px solid #ddd', cursor: 'pointer' }}
        >
          <img src={conversationImagesMap.get(conversation.postId)} alt="Product" width={40} />
          <div>Receiver:  {getUserEmail(conversation.receiverId) || 'Unknown User'}</div>
          <div>Sender:    {getUserEmail(conversation.senderId) || 'Unknown User'}</div>
        </div>
      ))}
    </div>
  );
}
