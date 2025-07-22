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