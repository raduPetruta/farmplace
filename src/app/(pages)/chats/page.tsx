'use client'
import ConversationList from '~/app/_components/conversation-list';
import NotLoggedIn from '~/app/_components/not-logged-in';
import { useEffect, useState } from 'react';
import ConversationView from '~/app/_components/conversation-view';
import { SignedIn, useUser } from '@clerk/nextjs';

export default function Chats() {
  const { user } = useUser(); // Server-side authentication check
  const [selectedConversation, setSelectedConversation] = useState(null);

  if (!user) {
    return (
      <div>
        <NotLoggedIn message="access the conversations!" />
      </div>
    );
  }

  // Handle side effects when `selectedConversation` changes
  useEffect(() => {
    if (selectedConversation) {
      console.log('Selected conversation (useEffect):', selectedConversation);
      // Any other side effects that need to happen when a conversation is selected
    }
  }, [selectedConversation]); // Dependency array listens for changes in selectedConversation

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <SignedIn>
        <div style={{ width: '30%', borderRight: '1px solid #ccc' }}>
          <ConversationList 
            userId={user.id}
            onSelectConversation={setSelectedConversation} // Directly set selectedConversation
          />
        </div>
        <div style={{ width: '70%' }}>
          {selectedConversation ? (
            <ConversationView conversation={selectedConversation} />
          ) : (
            <div>Open a conversation</div> // Show a message when no conversation is selected
          )}
        </div>
      </SignedIn>
    </div>
  );
}
