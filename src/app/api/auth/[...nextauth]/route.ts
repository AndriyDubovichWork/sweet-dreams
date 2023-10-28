import axios from 'axios';
import { Session } from 'inspector';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import SignToken from './SignToken';

const handler = NextAuth({
  secret: process.env.GOOGLE_JWT,
  session: {
    strategy: 'jwt',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async jwt({ token, user, account }) {
      if (account) {
        const userLoggedIn = await SignToken(user?.email as string);
        token.loggedUser = userLoggedIn;
      }
      return token;
    },
    async session({ session, token }: any) {
      session.jwt = token.loggedUser;
      return session;
    },
  },
});

export { handler as GET, handler as POST };
