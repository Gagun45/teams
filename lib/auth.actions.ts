"use server";

import type { RegisterFormType } from "./types";
import { registerSchema } from "./zod-schemas";
import { hash } from "bcryptjs";
import { prisma } from "./db";

export const register = async (values: RegisterFormType) => {
  try {
    const validatedFields = registerSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields" };
    const { email, password, name } = validatedFields.data;

    const existingUser = await prisma.user.findFirst({ where: { email } });

    if (existingUser) return { error: "Email already taken" };
    const hashedPassword = await hash(password, 10);

    await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    });

    return { success: "User created" };
  } catch (err) {
    console.log("Error: ", err);
    return { error: "Something went wrong" };
  }
};

// export const login = async (values: LoginFormType) => {
//   const validatedFields = loginSchema.safeParse(values);
//   if (!validatedFields.success) return { error: "Invalid fields" };
//   const { email, password } = validatedFields.data;

//   const existingUser = await getUserByEmail(email);

//   if (!existingUser) return { error: "Email not found" };
//   if (!existingUser.password) return { error: "Password not set yet" };

//   const passwordMatch = await compare(password, existingUser.password);

//   if (!passwordMatch) return { error: "Credentials invalid" };

//   try {
//     await signIn("credentials", { email, password });
//     return { success: "Logged in" };
//   } catch (err) {
//     if (err instanceof AuthError) {
//       return { error: "Something went wrong" };
//     }
//     throw err;
//   }
// };

// export const logout = async () => {
//   await signOut();
// };
