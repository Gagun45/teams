import type z from "zod";
import type { loginSchema, newTeamSchema, registerSchema } from "./zod-schemas";
import type { Prisma } from "@prisma/client";

export type RegisterFormType = z.infer<typeof registerSchema>;
export type LoginFormType = z.infer<typeof loginSchema>;
export type NewTeamType = z.infer<typeof newTeamSchema>;

export type TeamWithMembersAndOwner = Prisma.TeamGetPayload<{
  include: { members: { include: { user: true } }; creator: true };
}>;

export type TeamWithMembersAndOwnerAndMessages = Prisma.TeamGetPayload<{
  include: {
    members: { include: { user: true } };
    creator: true;
    TeamMessage: { include: { user: true } };
  };
}>;

export type MembersWithUsers = Prisma.TeamGetPayload<{
  select: { members: { include: { user: true } } };
}>;
