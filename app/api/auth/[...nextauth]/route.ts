// app/api/auth/[...nextauth]/route.ts

import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from "@/lib/db"; // Assuming this connects to your database
import User from "@/models/User"; // Assuming this is your user model
import bcrypt from "bcryptjs";

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
          placeholder: "john.doe@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: any) {
        try {
          // 1. Establish database connection
          await connectToDatabase();

          // 2. Find the user in the database based on email
          const user = await User.findOne({ email: credentials?.email });

          // 3. Check if the user exists
          if (!user) {
            // If the user is not found, return null to signal failure
            return null;
          }

          // 4. Compare the provided password with the stored hash
          const isValid = await bcrypt.compare(
            credentials?.password,
            user.password,
          );

          // 5. Check if the password matches
          if (!isValid) {
            // If the passwords don't match, return null to signal failure
            return null;
          }

          // 6. If authentication is successful, return user data for the session
          return {
            id: user._id.toString(),
            email: user.email,
            name: user.name,
            role: user.role,
          };
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      },
    }),
  ],
  session: {
    strategy: "jwt", // Or "database" if you're using a database-backed session store
    maxAge: 24 * 60 * 60, // Session will last for 24 hours
    updateAge: 12 * 60 * 60, // Updated every 12 hours
  },
  pages: {
    signIn: "/login",
    error: "/auth/error",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      console.log("Session callback:", session); // Add this line for debugging
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to the dashboard after login
      return baseUrl + "/dashboard";
    },
  },
});

export { handler as GET, handler as POST };