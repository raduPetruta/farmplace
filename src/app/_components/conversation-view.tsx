import React, { useEffect, useState } from 'react';
import { v4 as uuid } from 'uuid';
import { getCurrentDate, sortByDate } from '../../utils/util-functions';
import { saveMessageToConversation, getMessagesByIds } from '../(pages)/chats/actions'; // import the necessary actions
import { getClerkUserById } from '../(pages)/profile/actions';
import { useUser } from '@clerk/nextjs';

const ConversationView = ({ conversation }: any) => {
  const [messageText, setMessageText] = useState('');
  const [messages, setMessages] = useState<any[]>([]);
  const loggedInUser = useUser().user!;

  const formatMessages = () => {
    return conversation?.messagesIds?.split(",").filter((word: string) => word != "");
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

  console.log('messages')
  return (
    <div className="flex flex-col justify-between h-full">
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
      <div className="border-t border-gray-200 p-4 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            placeholder="Type a message..."
            value={messageText}
            onChange={(e) => setMessageText(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={onSend}
            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded-lg shadow-md hover:bg-blue-600 transition-all duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConversationView;


// undefined4ba5a742-f845-432c-b84a-b67676ed450c,
// ca8fd65d-fd5c-44a8-9796-46f32253e732,
// a981d1a3-fbae-40dc-81dd-b48cba97267b,
// 31d23691-410d-4804-bd9a-e52520a4c61a,
// 4546dd8f-1427-4680-8f9a-fc008576aa16,
// 79a50b3a-d71a-433c-8496-e67a5c6bcfee,
// 8933548c-a281-49c6-a953-cca89118f940,
// 20066e46-0841-44e8-904a-30ec83ab0398,
// a8f734ef-6e6e-4560-81f9-828a4b1a8baf


// null4a5473d2-c4ff-4c0d-9ee8-993d2af2d12c
