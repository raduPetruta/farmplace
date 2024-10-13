import { db } from "~/server/db"
import { users } from "~/server/schemas/users"
import { eq, or } from 'drizzle-orm';  // Adjust based on your project structure

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