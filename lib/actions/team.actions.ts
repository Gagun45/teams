"use server";

import { auth } from "../auth";
import { prisma } from "../db";
import { getTeamByJoinLinkToken } from "../helper/team.helper";
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

export const joinTeamByLink = async (joinLinkToken: string) => {
  if (!joinLinkToken) return { error: "Missing token" };
  const team = await getTeamByJoinLinkToken(joinLinkToken);
  if (!team) return { error: "Wrong token" };
  const session = await auth();
  if (!session) return { error: "Authorized only" };
  const user = session?.user;
  if (team.members.some((member) => member.userId === user.id))
    return { error: "Already joined" };
  const joinedTeam = await prisma.teamMember.create({
    data: {
      teamRole: "viewer",
      teamId: team.id,
      userId: user.id,
    },
  });
  return { teamId: joinedTeam.teamId };
};

export const leaveTeam = async (teamId: string) => {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) throw new Error();
    await prisma.teamMember.delete({
      where: { userId_teamId: { teamId, userId } },
    });
    return { success: "You left a team" };
  } catch {
    return { error: "Something went wrong" };
  }
};

export const deleteUserFromTeam = async (teamId: string, userId: string) => {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) return { error: "Authorized only" };
    await prisma.teamMember.delete({
      where: { userId_teamId: { teamId, userId } },
    });
    return { success: "User removed" };
  } catch {
    return { error: "Something went wrong" };
  }
};
