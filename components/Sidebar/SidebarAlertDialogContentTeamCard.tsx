import CardWrapper from "@/app/auth/_components/CardWrapper";
import type { TeamWithMembers } from "@/app/teams/join/JoinTeamCard";
import Image from "next/image";
import SidebarAlertDialogContentTeamCardJoinTeamButton from "./SidebarAlertDialogContentTeamCardJoinTeamButton";
import type { Dispatch, SetStateAction } from "react";

const SidebarAlertDialogContentTeamCard = ({
  team,
  joinLinkToken,
  setIsOpen,
}: {
  team: TeamWithMembers;
  joinLinkToken: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  return (
    <CardWrapper >
      <div className="flex gap-6">
        <div className="size-44 relative">
          <Image src={"https://github.com/shadcn.png"} alt="team image" fill />
        </div>
        <div className="flex flex-col">
          <h2 className="font-bold">{team.name}</h2>
          <span>Members: {team.members.length}</span>
        </div>
      </div>
      <SidebarAlertDialogContentTeamCardJoinTeamButton
        setIsOpen={setIsOpen}
        team={team}
        joinLinkToken={joinLinkToken}
      />
    </CardWrapper>
  );
};
export default SidebarAlertDialogContentTeamCard;
