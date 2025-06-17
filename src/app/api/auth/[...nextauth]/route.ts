import {
  copyAllDreamsFromDriveToDB,
  getAllDreams,
} from '@/app/features/dreams/utils/DB/dreamCrud';
import { initializeDatabase } from '@/app/features/dreams/utils/DB/initDB';
import {
  getAllUsers,
  getUserByEmail,
  updateLastLoginUserToNow,
} from '@/app/features/dreams/utils/DB/userCrud';
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
      // console.log(await getAllDreams());
      // console.log(await getAllUsers());

      session.user.role = user.status;

      return session;
    },
  },
});

export { handler as GET, handler as POST };
