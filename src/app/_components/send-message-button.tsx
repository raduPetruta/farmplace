'use client'
import React from 'react'
import { createConversationFromPost } from '../(pages)/chats/actions'
import { useRouter } from 'next/navigation';

const SendMessageButton = async ({senderId, receiverId, postId, setSelectedConversation}: any) => {
  const router = useRouter();

  const sendMessage: any = async (senderId: any, receiverId: any, postId: any) => {
    //create a conv with               senderId       postId   receiverId
    const newConversation = await createConversationFromPost(senderId, receiverId, postId);
    if (newConversation) {
        router.push('/chats');
        setSelectedConversation(newConversation);
    }
  }
      
  return (
    <button 
        className="mt-2 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition duration-200"
        onClick={() => sendMessage(senderId , receiverId, postId)}
    >
        Send Message
    </button>
  )
}

export default SendMessageButton