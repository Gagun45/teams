"use server";

import { auth } from "../auth";
import { prisma } from "../db";
import { getTeamByJoinLinkToken } from "../helper/team.helper";
import { pusher } from "../pusher/pusher";
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

    await pusher.trigger("all-users", "new-not", {
      message: "New Team Created PUUUUSHER",
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
  const owner = await prisma.user.findFirst({
    where: { createdTeams: { some: { id: team.id } } },
  });
  await pusher.trigger(`private-user-${owner?.id}`, "private-notification", {
    message: "Member joined your team",
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
    const owner = await prisma.user.findFirst({
      where: { createdTeams: { some: { id: teamId } } },
    });
    await pusher.trigger(`private-user-${owner?.id}`, "private-notification", {
      message: "Member left from your team",
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
    await pusher.trigger(`private-user-${userId}`, "private-notification", {
      message: "You were removed from team",
    });
    return { success: "User removed" };
  } catch {
    return { error: "Something went wrong" };
  }
};

export const sendMessage = async (teamId: string, message: string) => {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) return { error: "Authorized only" };
    const userId = user.id;
    const newMessage = await prisma.teamMessage.create({
      data: { message, teamId, userId },
      include: { user: true },
    });
    await pusher.trigger(`team-${teamId}`, "new-team-message", {
      id: newMessage.id,
      message: newMessage.message,
      user: newMessage.user,
    });
    return { success: "Message sent" };
  } catch {
    return { error: "Something went wrong" };
  }
};

export const deleteMessage = async (messageId: string) => {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) return { error: "Authorized only" };
    const userId = user.id;
    const deletedMessage = await prisma.teamMessage.update({
      where: { id: messageId, userId },
      data: { softDeleted: true },
    });
    await pusher.trigger(`team-${deletedMessage.teamId}`, "deleted-message", {
      id: deletedMessage.id,
    });
    return { success: "Message deleted" };
  } catch {
    return { error: "Something went wrong" };
  }
};

export const getTeamMessages = async (teamId: string, skip: number) => {
  const take = 4;
  try {
    const session = await auth();
    const user = session?.user;
    if (!user) return { error: "Authorized only" };
    const userId = user.id;
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { members: true },
    });

    if (!team?.members.some((member) => member.userId === userId))
      return { error: "Access denied" };

    const [teamMessages, totalCount] = await Promise.all([
      prisma.teamMessage.findMany({
        where: { teamId, softDeleted: false },
        include: { user: true },
        orderBy: { createdAt: "desc" },
        skip,
        take,
      }),
      prisma.teamMessage.count({ where: { teamId, softDeleted: false } }),
    ]);
    return { teamMessages, totalCount };
  } catch {
    return { error: "Something went wrong" };
  }
};

export const deleteTeam = async (teamId: string) => {
  try {
    const session = await auth();
    const userId = session?.user.id;
    if (!userId) return { error: "Authorized only" };
    const team = await prisma.team.findUnique({
      where: { id: teamId },
      include: { members: { include: { user: true } } },
    });

    if (!team) return { error: "Team not found" };
    if (
      team.members.find((member) => member.userId === userId)?.teamRole !==
      "owner"
    )
      return { error: "Access denied" };

    const deletedTeam = await prisma.team.delete({
      where: { id: teamId },
      include: { members: true },
    });

    await Promise.all(
      deletedTeam.members.map(async (member) => {
        pusher.trigger(`private-user-${member.userId}`, "deleted-team", {});
      })
    );

    return { success: "Team, team members, teammessages deleted" };
  } catch {
    return { error: "Something went wrong" };
  }
};
