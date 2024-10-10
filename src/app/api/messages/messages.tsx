// pages/api/messages.js
import { getMessages, sendMessageToConversation } from "~/app/(pages)/chats/actions";

export default async function handler(req: any, res: any) {
  if (req.method === 'GET') {
    const { conversationId } = req.query;
    try {
      const messages = await getMessages(conversationId);
      res.status(200).json(messages);
    } catch (error) {
      console.error("Error fetching messages:", error);
      res.status(500).json({ error: 'Failed to fetch messages' });
    }
  } else if (req.method === 'POST') {
    const { id, messageText, conversationId, senderId, createdAt } = req.body;

    try {
      const newMessage = await sendMessageToConversation(id, messageText, conversationId, senderId, createdAt);
      res.status(201).json(newMessage);
    } catch (error) {
      console.error("Error sending message:", error);
      res.status(500).json({ error: 'Failed to send message' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
