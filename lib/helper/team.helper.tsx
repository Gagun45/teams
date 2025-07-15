"use server";

import { auth } from "../auth";
import { prisma } from "../db";

export const getOwnTeamsById = async (id: string) => {
  try {
    const ownTeams = await prisma.team.findMany({
      where: { creatorId: id },
      include: { members: { include: { user: true } }, creator: true },
    });
    return ownTeams;
  } catch {
    return null;
  }
};

export const getAllTeams = async () => {
  try {
    const allTeams = await prisma.team.findMany({
      include: { members: { include: { user: true } }, creator: true },
    });
    return allTeams;
  } catch {
    return null;
  }
};

export const getTeamById = async (id: string) => {
  try {
    const team = await prisma.team.findUnique({
      where: { id },
      include: { members: { include: { user: true } } },
    });
    return team;
  } catch {
    return null;
  }
};

export const joinTeam = async (teamId: string) => {
  const session = await auth();
  if (!session?.user) return { error: "Access denied" };
  await prisma.teamMember.create({
    data: {
      teamRole: "viewer",
      userId: session.user.id,
      teamId,
    },
  });
  return { success: "You joined a team" };
};

export const leaveTeam = async (teamId: string) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return { error: "Access denied" };
  await prisma.teamMember.delete({
    where: { userId_teamId: { userId, teamId } },
  });
  return { success: "You left a team" };
};

export const checkMembership = async (teamId: string) => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return;
  const isMember = await prisma.teamMember.findUnique({
    where: { userId_teamId: { teamId, userId } },
  });
  return Boolean(isMember);
};
