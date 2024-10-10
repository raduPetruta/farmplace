// pages/api/conversations.js

import { getConversationsForUser } from "~/app/(pages)/chats/actions";

export default async function handler(req: any, res: any) {
  const { userId } = req.query;

  try {
    const conversations = await getConversationsForUser(userId);
    res.status(200).json(conversations);
  } catch (error) {
    console.error("Error fetching conversations:", error);
    res.status(500).json({ error: 'Failed to fetch conversations' });
  }
}