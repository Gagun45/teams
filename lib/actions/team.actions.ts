"use server";

import { auth } from "../auth";
import { prisma } from "../db";
import type { NewTeamType } from "../types";
import { newTeamSchema } from "../zod-schemas";

export const createNewTeam = async (values: NewTeamType) => {
  try {
    const session = await auth();
    if (!session) return { error: "Access denied" };
    const validatedFields = newTeamSchema.safeParse(values);
    if (!validatedFields.success) return { error: "Invalid fields" };
    const { name } = validatedFields.data;

    await prisma.team.create({
      data: {
        name,
        creator: {
          connect: {
            id: session.user.id,
          },
        },
        members: { connect: [{ id: session.user.id }] },
      },
    });

    return { success: "Team created" };
  } catch (err) {
    console.log("Error: ", err);
    return { error: "Something went wrong" };
  }
};
