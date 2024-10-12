// pages/index.js (Server Component)
import { SignedIn } from '@clerk/nextjs';
import ConversationList from '~/app/_components/conversation-list';
import { getConversationsForUser } from './actions';
import { auth } from '@clerk/nextjs/server';
import NotLoggedIn from '~/app/_components/not-logged-in';

export default async function Chats() {
  const { userId } = await auth(); // Server-side authentication check
  const conversations = await getConversationsForUser(userId);
  
  if(!userId){
    return (
      <div>
        <NotLoggedIn message="access the conversations!"/>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <SignedIn>
        <ConversationList userId={userId} conversations={conversations} />
      </SignedIn>
    </div>
  );
}
