import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./db";
import authConfig from "./auth.config";
import { getUserById } from "./helper/user.helper";
import type { User, UserRoles } from "@prisma/client";
import "next-auth/jwt";

type ExtendedUser = User & {
  role: UserRoles;
  emailVerified: Date | null;
};

declare module "next-auth" {
  interface Session {
    user: ExtendedUser;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role: UserRoles;
    emailVerified: Date | null;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  callbacks: {
    session: async ({ session, token }) => {
      if (!token.sub) return session;
      session.user.role = token.role;
      session.user.emailVerified = token.emailVerified;
      session.user.id = token.sub;
      return session;
    },
    jwt: async ({ token }) => {
      if (!token.sub) return token;
      const existingUser = await getUserById(token.sub);
      if (!existingUser) return token;
      token.role = existingUser.role;
      token.emailVerified = null;
      return token;
    },
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig,
});
