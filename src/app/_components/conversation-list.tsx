'use client';

import { useEffect, useState } from 'react';
import { getConversationsForUser, getMessageById } from "../(pages)/chats/actions";
import { getPostById } from '../(pages)/posts/actions';
import { getAllUsersClerk } from '../(pages)/profile/actions';

export default function ConversationList({ userId, onSelectConversation }: any) {
  const defaultPostImageSrc = "https://utfs.io/f/pNntNKO2tJAb4xDR6Wi2DOKUW0AbJkt8BZ6zmfXy1LgQ5FNM";
  const [conversations, setConversations] = useState<any[]>([]);
  const [conversationImagesMap, setConversationImagesMap] = useState<Map<any, string>>(new Map());
  const [lastSentMessageMap, setLastSentMessageMap] = useState<Map<any, string>>(new Map());
  const [userEmails, setUserEmails] = useState<any[]>([]);
  const [postsFromConversations, setPostsFromConversations] = useState<any[]>([]);

  useEffect(() => { 
    async function fetchConversationsData() {
      const conversations = await getConversationsForUser(userId);
      setConversations(conversations);
      const users = await getAllUsersClerk();
      setUserEmails(users);
    }
    fetchConversationsData();
  }, [userId]);

  useEffect(() => {
    async function fetchPostsFromConversations() { 
      const posts : any = [];
      for(const conversation of conversations){
        const post = await getPostById(conversation.postId);
        posts.push(post);
      }
      setPostsFromConversations(posts);
    }
    fetchPostsFromConversations();
  }, [conversations])

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

  useEffect(() => {
    async function fetchConversationsLastSentMessage() {
      const lastSentMessagesMap = new Map<any, string>();
      for (const conversation of conversations) {
        const lastSentMessage = await getLastSentMessageOfConversation(conversation.lastSentMessageId);
        lastSentMessagesMap.set(conversation.postId, lastSentMessage || "");
      }
      setLastSentMessageMap(lastSentMessagesMap);
    }
    fetchConversationsLastSentMessage();
  }, [conversations]);

  async function getFirstImageOfPost(postId: any) {
    const post = await getPostById(postId);
    if (post) {
      return post.imagesUrls?.split(',')[0]?.toString();
    }
    return defaultPostImageSrc;
  }

  async function getLastSentMessageOfConversation(lastSentMessageId: any) {
    const lastSentMessage = await getMessageById(lastSentMessageId);
    return lastSentMessage ? lastSentMessage[0]?.messageText : ""; 
  }

  function getUserEmail(userId: any) {
    const found = userEmails.find(user => user.id === userId);
    if(found)
      return found.emailAddresses[0].emailAddress;
  }

  function getTitleOfPost(postId: any) {
    const post = postsFromConversations.find(post => post.id === postId);
    if(post)
      return post.title;
  }

  function formatLastMessageDate(lastMessageDate: any){
    const [date] = lastMessageDate.split(" ");  // Split by space to separate the date and time
    const [year, month, day] = date.split("-");  // Split the date part by "-"
    return `${month}-${day}`;
  }

  return (
    <div>
      {conversations.map((conversation: any) => (
        <div
          key={conversation.id}
          onClick={() => onSelectConversation(conversation)}
          style={{ padding: '10px', borderBottom: '1px solid #ddd', cursor: 'pointer' }}
        >
          <div className="flex items-center p-3 border-b border-gray-300">
            <div className="mr-3">
              <img src={conversationImagesMap.get(conversation.postId)} alt="Product" width={40} className="w-10 h-10 rounded-full object-cover" />
            </div>
            <div className="flex-1">
              <div className="font-bold text-sm">Title: {getTitleOfPost(conversation.postId)}</div>
              <div className="text-gray-800 text-xs">{lastSentMessageMap.get(conversation.postId)}</div>
            </div>
            <div className="text-xs text-gray-500 font-semibold">{formatLastMessageDate(conversation.lastSentMessageDate)}</div>
          </div>
        </div>
      ))}
    </div>
  );
}
