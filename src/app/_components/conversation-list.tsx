'use client';

import { useEffect, useState } from 'react';
import { getConversationsForUser } from "../(pages)/chats/actions";

export default function ConversationList({ userId, onSelectConversation }: any) {
  const [conversations, setConversations] = useState<any[]>([]);

  useEffect(() => {
    async function fetchConversations() {
      const result = await getConversationsForUser(userId);
      setConversations(result);
    }
    fetchConversations();
  }, [userId]);

  return (
    <div>
      {conversations.map((conversation: any) => (
        <div
          key={conversation.id}
          onClick={() => {
            console.log('Clicked conversation:', conversation); // Add logging here to verify data
            onSelectConversation(conversation); // Trigger the parent callback
          }}
          style={{ padding: '10px', borderBottom: '1px solid #ddd', cursor: 'pointer' }}
        >
          <img src={conversation.conversationName} alt="Product" width="40" />
          <div>{conversation.receiverId}</div>
          <div>{conversation.senderId}</div>
        </div>
      ))}
    </div>
  );
}
