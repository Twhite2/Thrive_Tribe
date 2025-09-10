import { db, schema } from "..";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";

export type NewUser = {
  name: string;
  email: string;
  password: string;
  image?: string;
};

export type UserWithoutPassword = {
  id: number;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
  emailVerified: Date | null;
  image: string | null;
};

/**
 * Creates a new user in the database
 */
export async function createUser(userData: NewUser): Promise<UserWithoutPassword | null> {
  try {
    // Check if user with the same email already exists
    const existingUser = await findUserByEmail(userData.email);
    if (existingUser) {
      return null; // User already exists
    }

    // Hash the password
    const hashedPassword = await hash(userData.password, 10);

    // Insert the new user
    const newUsers = await db
      .insert(schema.users)
      .values({
        name: userData.name,
        email: userData.email,
        password: hashedPassword,
        image: userData.image || null,
      })
      .returning({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        createdAt: schema.users.createdAt,
        updatedAt: schema.users.updatedAt,
        emailVerified: schema.users.emailVerified,
        image: schema.users.image,
      });

    return newUsers[0] || null;
  } catch (error) {
    console.error("Error creating user:", error);
    return null;
  }
}

/**
 * Finds a user by email
 */
export async function findUserByEmail(email: string) {
  try {
    const users = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.email, email));
    
    return users[0] || null;
  } catch (error) {
    console.error("Error finding user by email:", error);
    return null;
  }
}

/**
 * Finds a user by ID
 */
export async function findUserById(id: number) {
  try {
    const users = await db
      .select()
      .from(schema.users)
      .where(eq(schema.users.id, id));
    
    return users[0] || null;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    return null;
  }
}

/**
 * Updates a user's profile information
 */
export async function updateUserProfile(
  userId: number, 
  profileData: Partial<{ name: string; image: string | null }>
) {
  try {
    const updatedUsers = await db
      .update(schema.users)
      .set({
        ...profileData,
        updatedAt: new Date(),
      })
      .where(eq(schema.users.id, userId))
      .returning({
        id: schema.users.id,
        name: schema.users.name,
        email: schema.users.email,
        image: schema.users.image,
        updatedAt: schema.users.updatedAt,
      });
    
    return updatedUsers[0] || null;
  } catch (error) {
    console.error("Error updating user profile:", error);
    return null;
  }
}

/**
 * Updates user's premium status
 */
export async function updateUserPremiumStatus(
  userId: number, 
  isPremium: boolean, 
  expiryDate?: Date
) {
  try {
    // First, find or create the user's profile
    const userProfiles = await db
      .select()
      .from(schema.profiles)
      .where(eq(schema.profiles.userId, userId));
    
    const userProfile = userProfiles[0];
    
    if (!userProfile) {
      // Create profile if it doesn't exist
      const newProfiles = await db
        .insert(schema.profiles)
        .values({
          userId: userId,
          isPremium: isPremium,
          premiumExpires: expiryDate || null,
        })
        .returning();
      
      return newProfiles[0] || null;
    } else {
      // Update existing profile
      const updatedProfiles = await db
        .update(schema.profiles)
        .set({
          isPremium: isPremium,
          premiumExpires: expiryDate || null,
        })
        .where(eq(schema.profiles.userId, userId))
        .returning();
      
      return updatedProfiles[0] || null;
    }
  } catch (error) {
    console.error("Error updating user premium status:", error);
    return null;
  }
}

/**
 * Saves user's assessment score
 */
export async function saveUserAssessmentScore(userId: number, score: number) {
  try {
    // Find or create profile
    const userProfiles = await db
      .select()
      .from(schema.profiles)
      .where(eq(schema.profiles.userId, userId));
    
    const userProfile = userProfiles[0];
    
    if (!userProfile) {
      // Create new profile with score
      const newProfiles = await db
        .insert(schema.profiles)
        .values({
          userId: userId,
          stressAssessmentScore: score,
        })
        .returning();
      
      return newProfiles[0] || null;
    } else {
      // Update existing profile
      const updatedProfiles = await db
        .update(schema.profiles)
        .set({
          stressAssessmentScore: score,
        })
        .where(eq(schema.profiles.userId, userId))
        .returning();
      
      return updatedProfiles[0] || null;
    }
  } catch (error) {
    console.error("Error saving user assessment score:", error);
    return null;
  }
}
