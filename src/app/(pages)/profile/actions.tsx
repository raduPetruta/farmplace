'use server'

import { db } from "~/server/db"
import { users } from "~/server/schemas/users"
import { eq, inArray, or } from 'drizzle-orm';  // Adjust based on your project structure
 
import { createClerkClient } from '@clerk/backend'

const clerkClient = createClerkClient({ secretKey: process.env.CLERK_SECRET_KEY })

export const getAllUsersClerk = async () => {
  try {
    // Fetch the user list from Clerk
    const response = await clerkClient.users.getUserList();
    return JSON.parse(JSON.stringify(response.data)); // Return only the users array
  } catch (error) {
    console.error("Failed to fetch users from Clerk:", error);
    throw new Error("Failed to fetch users from Clerk");
  }
};


export const getUserById = async (userId: any) => {
  try {
    return await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .limit(1)
      .execute();
  } catch (error) {
    console.error("Failed getting user by id", error)
    throw new Error("Failed getting user by id");
  }
}

export const getUsersByIds = async (userIds: any[]) => {
  try {
    console.log("User IDs passed to getUsersByIds:", userIds); // Debugging: Log userIds array
    const result = await db
      .select()
      .from(users)
      .where(inArray(users.id, userIds))
      .execute();

    console.log("Query Result:", result); // Debugging: Log query result
    return result;
  } catch (error) {
    console.error("Failed getting users by ids", error);
    throw new Error("Failed getting users by ids");
  }
}
 

