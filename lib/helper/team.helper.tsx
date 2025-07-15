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

export const getTeamByJoinLinkToken = async (joinLinkToken: string) => {
  if (!joinLinkToken) return null;
  try {
    const team = await prisma.team.findFirstOrThrow({
      where: { joinLinkToken },
      include: { members: true },
    });
    return team;
  } catch {
    return null;
  }
};

export const getMyTeams = async () => {
  const session = await auth();
  const userId = session?.user.id;
  if (!userId) return [];
  const myTeams = await prisma.team.findMany({
    where: { members: { some: { userId } } },
  });
  return myTeams;
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
