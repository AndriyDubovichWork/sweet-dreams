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
    session({ session }: any) {
      session.user.role = 'user';

      if (session.user.email === process.env.ADMIN_EMAIL) {
        session.user.role = 'admin';
      }
      if (process.env.SUPER_USERS_LIST?.includes(session.user.email)) {
        session.user.role = 'superUser';
      }

      return session;
    },
  },
});

export { handler as GET, handler as POST };
