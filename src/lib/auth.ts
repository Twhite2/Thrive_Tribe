import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { compare } from "bcryptjs";
import PostgresAdapter from "@auth/pg-adapter";
import { db } from "./db";
import { eq } from "drizzle-orm";
import { schema } from "./db";
import postgres from "postgres";

// Create postgres client specifically for the Auth.js adapter
const connectionString = process.env.DATABASE_URL;
const client = postgres(connectionString || '');

// User auth functions
async function getUserByEmail(email: string) {
  try {
    const users = await db.select().from(schema.users).where(eq(schema.users.email, email));
    return users[0] || null;
  } catch (error) {
    console.error("Error finding user by email:", error);
    return null;
  }
}

export const authOptions: NextAuthOptions = {
  // Use PostgreSQL adapter
  adapter: PostgresAdapter(client),
  providers: [
    // Only add Google provider if credentials are available
    ...(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET
      ? [
          GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID || "",
            clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
          }),
        ] 
      : []),
    
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Get user from database
        const user = await getUserByEmail(credentials.email);

        if (!user || !user.password) {
          return null;
        }

        // Check password
        const passwordMatch = await compare(credentials.password, user.password);
        if (!passwordMatch) {
          return null;
        }

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          image: user.image,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET || "temporary_secret_for_development_only",
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
  },
};
