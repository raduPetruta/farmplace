import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { getCurrentDate, sortByDate } from '../../utils/util-functions';
import { saveMessageToConversation, getMessagesByIds } from '../(pages)/chats/actions'; // import the necessary actions
import { getClerkUserById } from '../(pages)/profile/actions';
import { useUser } from '@clerk/nextjs';
import dynamic from 'next/dynamic';

// Dynamically import the EmojiPicker to avoid SSR issues
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

const ConversationView = ({ conversation }: any) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false); // Toggle for the emoji picker
  const loggedInUser = useUser().user!;

  const formatMessages = () => {
    return conversation?.messagesIds?.split(",").filter((word: string) => word !== "");
  }

  const fetchMessages = async () => {
    let formattedMessages = formatMessages();
    if (formattedMessages) {
      try {
        const messagesData = await getMessagesByIds(formattedMessages);
        let messagesWithSenders = await Promise.all(
          messagesData.map(async (message: any) => {
            const sender = await getClerkUserById(message.senderId);
            return { ...message, sender }; 
          })
        );
        messagesWithSenders = sortByDate(messagesWithSenders);
        setMessages(messagesWithSenders);
        console.log("setted", messagesWithSenders);
      } catch (error) {
        console.log('Error fetching messages:', error);
      }
    }
  };

  useEffect(() => {
    if (conversation) {
      fetchMessages();
    }
  }, [conversation]);

  const onSend = async () => {
    const newMessage = {
      id: uuid(),
      messageText: messageText,
      conversationId: conversation.id,
      senderId: loggedInUser.id,
      createdAt: getCurrentDate(),
    };
    if (newMessage) 
      await saveMessageToConversation(conversation, newMessage);
    conversation.messagesIds != null ? conversation.messagesIds += "," + newMessage.id : conversation.messagesIds = newMessage.id;
    setMessageText('');
    fetchMessages(); // Fetch the updated list of messages after sending
  };

  const onEmojiClick = (emoji: any) => {
    setMessageText(prev => prev + emoji.emoji); // Add the emoji to the message text
  };
  

  return (
    <div className="flex flex-col h-screen">
      {/* Conversation Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-xl font-semibold">{conversation.conversationName}</h2>
      </div>

      {/* Conversation Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length > 0 ? (
          messages.map((message: any) => (
            <div key={message.id} className="flex items-start space-x-4 mb-4">
              {/* Sender image */}
              <img
                src={message.sender?.imageUrl || '/default-profile.png'} // Assuming there's a default image
                alt="Profile picture"
                className="w-10 h-10 rounded-full"
              />
              <div>
                {/* Sender name */}
                <div className="font-semibold text-gray-800">
                  {message.sender?.username || message.sender?.emailAddresses[0].emailAddress || 'Unknown user'}
                </div>
                {/* Message text */}
                <div className="text-gray-600">{message.messageText}</div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-500">No messages yet. Start chatting!</div>
        )}
      </div>

      {/* Message Input Section */}
      <div className="sticky bottom-0 border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />

          {/* Emoji Button */}
          <button
            onClick={() => setShowEmojiPicker(!showEmojiPicker)}
            className="ml-2 px-2 py-2 bg-gray-100 border border-gray-300 rounded-full shadow-sm hover:bg-gray-200 transition-all duration-200"
          >
            😀
          </button>

          <button
            onClick={onSend}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
          >
            Send
          </button>
        </div>

        {/* Emoji Picker Panel */}
        {showEmojiPicker && (
          <div className="absolute bottom-16 right-4">
            <EmojiPicker onEmojiClick={onEmojiClick} />
          </div>
        )}
      </div>
    </div>
  );
};

export default ConversationView;
