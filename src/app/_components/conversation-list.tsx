// components/ConversationList.js (Client Component)
'use client';

export default function ConversationList( {userId, conversations} : any) {
  return (
    <div>
      <h2>Conversations for User ID: {userId}</h2>
      <ul>
        {conversations.map((conv: any) => (
          <li key={conv.id}>
            {conv.conversationName}
          </li>
        ))}
      </ul>
    </div>
  );
}
