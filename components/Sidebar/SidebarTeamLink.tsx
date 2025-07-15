import Link from "next/link";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Image from "next/image";
import type { Team } from "@prisma/client";

interface Props {
  team: Team;
}

const SidebarTeamLink = ({ team }: Props) => {
  return (
    <Link
      href={`/teams/team/${team.id}`}
      className="size-12 lg:size-16 relative hover:scale-[1.2] rounded-full overflow-hidden duration-100"
    >
      <Tooltip>
        <TooltipTrigger asChild>
          <Image src="/discord.png" alt="TeamLogo" fill />
        </TooltipTrigger>
        <TooltipContent align="center" side="right">
          {team.name}
        </TooltipContent>
      </Tooltip>
    </Link>
  );
};
export default SidebarTeamLink;
