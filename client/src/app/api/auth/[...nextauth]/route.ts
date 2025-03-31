import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import axios from "axios";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
  ],
  callbacks: {
    async signIn({ user }: any) {
      try {
        const res = await axios.post(`${process.env.BACKEND_URL}/user/create`, {
          userId: user.email,
        });
        console.log("user created", res.data);
        if (res.data.error || res.data.message === "User Already Exists") {
          return true;
        } else {
          return true;
        }
      } catch (error) {
        console.error(error);
      }

      return true;
    },
    async jwt({ token, user }: any) {
      if (user) {
        token.email = user.email;
        token.id = user.email;
      }
      return token;
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.email = token.email;
        session.user.id = token.id;
      }
      return session;
    },
  },
  session: {
    strategy: "jwt",
  },
  secret: "fdasfdasfQ$#F#QEWQ#EWFCQE#WFQREWFQ",
};

const handler = NextAuth(authOptions as any);

export { handler as GET, handler as POST };
