// components/ConversationList.js (Client Component)
'use client';

import { useEffect, useState } from "react";
import { getConversationsForUser } from "../(pages)/chats/actions";

export default async function ConversationList( {userId, onSelectConversation } : any) {
  
  const conversations = await getConversationsForUser(userId);

  return (
    <div>
    {conversations.map((conversation: any) => (
      <div
        key={conversation.id}
        onClick={() => onSelectConversation(conversation)}
        style={{ padding: '10px', borderBottom: '1px solid #ddd', cursor: 'pointer' }}
      >
        <img src={conversation.conversationName} alt="Product" width="40" />
        <div>{conversation.receiverId}</div>
        <div>{conversation.receiverId}</div>
      </div>
    ))}
  </div>
  );
}
