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
                    console.log("Attempting Database connection")
                    await connectToDatabase();
                    console.log("Connection successful");
                    // 2. Find the user in the database based on email
                    const user = await User.findOne({ email: credentials?.email });
                    console.log("Credentials: ", credentials);
                    console.log("User: ", user)

                    // 3. Check if the user exists
                    if (!user) {
                        // If the user is not found, return null to signal failure
                        console.log("User not found");
                        return null;
                    }
                    console.log("User found")

                    // 4. Compare the provided password with the stored hash
                    const isValid = await bcrypt.compare(
                        credentials?.password,
                        user.password,
                    );

                    console.log("isValid", isValid)

                    // 5. Check if the password matches
                    if (!isValid) {
                        // If the passwords don't match, return null to signal failure
                        console.log("Passwords do not match")
                        return null;
                    }

                    // 6. If authentication is successful, return user data for the session
                    console.log("Successfully logged in")

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
        strategy: "jwt",
        maxAge: 30 * 60,
        updateAge: 24 * 60 * 60,
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
            // Access the user's id and role directly from the token object
            session.user.id = token.id as string;
            session.user.role = token.role as string;
            return session;
        },
    },
});

export { handler as GET, handler as POST };