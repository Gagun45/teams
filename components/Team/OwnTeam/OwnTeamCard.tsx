import type { TeamWithMembersAndOwner } from "@/lib/types";
import Image from "next/image";
import ViewAllMembersSheet from "./ViewAllMembersSheet";
import JoinLink from "./JoinLink";
import DeleteTeam from "./DeleteTeam";

interface Props {
  team: TeamWithMembersAndOwner;
}

const BASE_URL = process.env.BASE_URL;

const OwnTeamCard = ({ team }: Props) => {
  const joinLink = `${BASE_URL}/teams/join?token=${team.joinLinkToken}`;
  return (
    <div className="flex items-center gap-4">
      <div className="size-36 relative">
        <Image src={"https://github.com/shadcn.png"} alt="team image" fill />
      </div>
      <div className="flex self-start flex-col">
        <span className="font-semibold">{team.name}</span>
        <span>
          Members: {team.members.length} <ViewAllMembersSheet team={team} />
        </span>
        <DeleteTeam teamId={team.id} />
        <JoinLink joinLink={joinLink} />
      </div>
    </div>
  );
};
export default OwnTeamCard;
