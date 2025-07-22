import CardWrapper from "@/app/auth/_components/CardWrapper";
import type { Prisma } from "@prisma/client";
import Image from "next/image";
import JoinTeamButton from "./JoinTeamButton";

export type TeamWithMembers = Prisma.TeamGetPayload<{
  include: { members: true };
}>;

interface Props {
  team: TeamWithMembers;
  joinLinkToken: string;
}

const JoinTeamCard = ({ team, joinLinkToken }: Props) => {
  return (
    <CardWrapper>
      <div className="flex gap-6">
        <div className="size-44 relative">
          <Image src={"https://github.com/shadcn.png"} alt="team image" fill />
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold">{team.name}</h2>
          <span>Members: {team.members.length}</span>
        </div>
      </div>
      <JoinTeamButton team={team} joinLinkToken={joinLinkToken} />
    </CardWrapper>
  );
};
export default JoinTeamCard;
