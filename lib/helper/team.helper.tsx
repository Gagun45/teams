"use server";

import { prisma } from "../db";

export const getOwnTeamsById = async (id: string) => {
  try {
    const ownTeams = await prisma.team.findMany({
      where: { creatorId: id },
      include: { members: true },
    });
    return ownTeams;
  } catch {
    return null;
  }
};

export const getAllTeams = async () => {
  try {
    const allTeams = await prisma.team.findMany({
      include: { members: true, creator: true },
    });
    return allTeams;
  } catch {
    return null;
  }
};
