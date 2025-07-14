import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { loginSchema } from "./zod-schemas";
import { getUserByEmail } from "./helper/user.helper";
import { compare } from "bcryptjs";

export default {
  providers: [
    Credentials({
      authorize: async (credentials) => {
        const validatedFields = loginSchema.safeParse(credentials);
        if (!validatedFields.success) return null;
        const { email, password } = validatedFields.data;
        const existingUser = await getUserByEmail(email);
        if (!existingUser || !existingUser.password) return null;

        const passwordMatch = await compare(password, existingUser.password);
        if (!passwordMatch) return null;

        return existingUser;
      },
    }),
  ],
} satisfies NextAuthConfig;
