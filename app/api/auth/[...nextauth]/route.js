import GoogleProvider from "next-auth/providers/google";
import NextAuth from "next-auth";
import prisma from "../../../../prisma/client";
import { PrismaAdapter } from "@next-auth/prisma-adapter";




export const dynamic = "force-dynamic";
export const authOptions = {
  adapter: PrismaAdapter(prisma),
  secret: process?.env?.NEXTAUTH_SECRET,
  providers: [

    GoogleProvider({
      clientId: process?.env?.GOOGLE_CLIENT_ID,
      clientSecret: process?.env?.GOOGLE_CLIENT_SECRET,
 
    }),
  ],
  pages: {
    signIn: "/auth/signin",  
  },
  session: {
    strategy: "jwt",
  },


  callbacks: {
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith("/")) return `${baseUrl}${url}`
      // Allows callback URLs on the same origin
      else if (new URL(url).origin === baseUrl) return url
      return baseUrl
    },
    async session({ session, token, user }) {
   // Adding the user's unique ID (sub) from the token to the session object.
  // This ensures the ID is accessible in the client-side by getServerSession.
      if (token) {
        session.user.id = token.sub
      }

      return session
    }

  },
};

export const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
