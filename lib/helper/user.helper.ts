"use server";

import { prisma } from "../db";

export const getUserByEmail = async (email: string) => {
  try {
    const user = await prisma.user.findUniqueOrThrow({ where: { email } });
    return user;
  } catch {
    return null;
  }
};

export const getUserById = async (id: string) => {
  try {
    const user = await prisma.user.findUnique({ where: { id } });
    return user;
  } catch {
    return null;
  }
};