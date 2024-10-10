// components/MessageView.js
import React, { useEffect, useState } from 'react';

const MessageView = (conversationId: any, userId: any) => {
  const [messages, setMessages] = useState([]);
  const [content, setContent] = useState('');

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        const res = await fetch(`/api/messages?conversationId=${conversationId}`);
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };

    if (conversationId) {
      fetchMessages();
    }
  }, [conversationId]);

  const sendMessage = async () => {
    if (!content) return;

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content, senderId: userId, conversationId }),
      });

      const newMessage = await res.json();
    //   setMessages((prev) => [...prev, newMessage]);
      setContent('');
    } catch (error) {
      console.error("Error sending message:", error);
    }
  };

  return (
    <div>
      <h2>Messages</h2>
      <div>
        {messages.map((msg: any) => (
          <div key={msg.id}>
            <strong>{msg.senderId}: </strong> {msg.content}
          </div>
        ))}
      </div>
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Type a message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
};

export default MessageView;
