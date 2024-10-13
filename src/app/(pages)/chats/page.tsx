// pages/index.js (Server Component)
'use client'
import ConversationList from '~/app/_components/conversation-list';
import NotLoggedIn from '~/app/_components/not-logged-in';
import { useState } from 'react';
import ConversationView from '~/app/_components/conversation-view';
import { SignedIn, useUser } from '@clerk/nextjs';

export default function Chats() {
  const user  = useUser(); // Server-side authentication check
  const [selectedConversation, setSelectedConversation] = useState(null);

  if(!user.user){
    return (
      <div>
        <NotLoggedIn message="access the conversations!"/>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SignedIn>
        <div style={{ width: '30%', borderRight: '1px solid #ccc' }}>
          <ConversationList userId={user.user.id} onSelectConversation={setSelectedConversation} />
        </div>
        <div style={{ width: '70%' }}>
          <ConversationView conversation={selectedConversation} />
        </div>
      </SignedIn>
    </div>
  );


}
