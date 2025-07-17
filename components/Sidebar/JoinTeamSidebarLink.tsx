import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { PlusCircleIcon } from "lucide-react";

const JoinTeamSidebarLink = () => {
  return (
    <div className="size-12 hover:scale-[1.2] rounded-full overflow-hidden duration-100">
      <Tooltip>
        <TooltipTrigger asChild>
          <PlusCircleIcon className="size-full text-secondary" />
        </TooltipTrigger>
        <TooltipContent align="center" side="right">
          Join a team
        </TooltipContent>
      </Tooltip>
    </div>
  );
};
export default JoinTeamSidebarLink;
