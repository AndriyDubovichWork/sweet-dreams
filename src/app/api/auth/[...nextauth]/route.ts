import { initializeDatabase } from '@/app/common/DB/initDB';
import {
  getUserByEmail,
  updateLastLoginUserToNow,
} from '@/app/common/DB/userCrud';
import NextAuth from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
  ],
  callbacks: {
    async session({ session }: any) {
      initializeDatabase();

      const user = await getUserByEmail(session.user.email);
      if (user) {
        updateLastLoginUserToNow(user.id);
      }

      // if (!user) {
      //   createUser(session.user);
      // }

      session.user.role = user.status;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
