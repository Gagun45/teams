"use server";

import { prisma } from "./prisma";
import type { LoginFormType, RegisterFormType } from "./types";
import { loginSchema, registerSchema } from "./zod-schemas";
import { hash } from "bcryptjs";

export const register = async (values: RegisterFormType) => {
  try {
    const validatedFields = registerSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields" };
    const { email, password, name } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({ where: { email } });

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

export const login = async (values: LoginFormType) => {
  const validatedFields = loginSchema.safeParse(values);
  if (!validatedFields.success) return { error: "Invalid fields" };
  const { email, password } = validatedFields.data;
  //TODO Login logic
};
