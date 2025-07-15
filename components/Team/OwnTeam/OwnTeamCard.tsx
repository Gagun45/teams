import type { TeamWithMembersAndOwner } from "@/lib/types";
import Image from "next/image";
import ViewAllMembersSheet from "./ViewAllMembersSheet";

interface Props {
  team: TeamWithMembersAndOwner;
}

const OwnTeamCard = ({ team }: Props) => {
  return (
    <div className="flex items-center gap-4">
      <div className="size-36 relative">
        <Image src={"https://github.com/shadcn.png"} alt="team image" fill />
      </div>
      <div className="flex self-start flex-col">
        <span className="font-semibold">{team.name}</span>
        <span>
          Members: {team.members.length} <ViewAllMembersSheet team={team}/>
        </span>
      </div>
    </div>
  );
};
export default OwnTeamCard;
