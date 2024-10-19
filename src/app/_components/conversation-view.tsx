import React, { useEffect, useState, useRef } from 'react';
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
  
  // Ref to track the end of the message list
  const endOfMessagesRef = useRef<null | HTMLDivElement>(null);

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

  // Automatically scroll to the latest message
  const scrollToBottom = () => {
    if (endOfMessagesRef.current) {
      endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  useEffect(() => {
    if (conversation) {
      fetchMessages();
    }
  }, [conversation]);

  useEffect(() => {
    scrollToBottom(); // Scroll to the bottom when messages are updated
  }, [messages]);

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
        <h2 className="text-xl font-semibold">{conversation.conversationName.split("-")[0]}</h2>
      </div>

      {/* Conversation Messages */}
      <div className="flex-1 p-4 overflow-y-auto">
        {messages.length > 0 ? (
          <>
            {messages.map((message: any) => {
              const isLoggedInUser = message.senderId === loggedInUser.id;
              return (
                <div
                  key={message.id}
                  className={`flex ${isLoggedInUser ? 'justify-end' : 'justify-start'} mb-4`}
                >
                  <div
                    className={`flex items-center space-x-4 max-w-xs break-words ${
                      isLoggedInUser
                        ? 'bg-[#033c3e] text-white' // Logged-in user's messages with teal background
                        : 'bg-gray-200 text-black'   // Other user's messages with light gray background
                    } rounded-lg p-3`}
                    style={{ minHeight: '50px' }} // Ensures some height for better alignment
                  >
                    {!isLoggedInUser && (
                      <img
                        src={message.sender?.imageUrl || '/default-profile.png'}
                        alt="Profile picture"
                        className="w-10 h-10 rounded-full"
                      />
                    )}

                    <div className="flex flex-col justify-center">
                      {!isLoggedInUser && (
                        <div className="font-semibold">
                          {message.sender?.username || message.sender?.emailAddresses[0].emailAddress || 'Unknown user'}
                        </div>
                      )}
                      <div className="text-sm">{message.messageText}</div>
                    </div>

                    {isLoggedInUser && (
                      <img
                        src={loggedInUser.imageUrl || '/default-profile.png'}
                        alt="Profile picture"
                        className="w-10 h-10 rounded-full"
                      />
                    )}
                  </div>
                </div>
              );
            })}
            {/* Empty div at the end to scroll to */}
            <div ref={endOfMessagesRef} />
          </>
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
