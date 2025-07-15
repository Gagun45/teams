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

    const newTeam = await prisma.team.create({
      data: {
        name,
        creator: { connect: { id: session.user.id } },
      },
    });

    await prisma.teamMember.create({
      data: {
        userId: session.user.id,
        teamId: newTeam.id,
        teamRole: "owner",
      },
    });

    return { success: "Team created" };
  } catch (err) {
    console.log("Error: ", err);
    return { error: "Something went wrong" };
  }
};
