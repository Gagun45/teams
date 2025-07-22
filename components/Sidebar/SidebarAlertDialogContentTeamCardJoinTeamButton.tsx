"use client";

import type { TeamWithMembers } from "@/app/teams/join/JoinTeamCard";
import { joinTeamByLink } from "@/lib/actions/team.actions";
import useCurrentUser from "@/hooks/useCurrentUser";
import { toast } from "sonner";
import { useTransition, type Dispatch, type SetStateAction } from "react";
import { Button } from "../ui/button";
import { BarLoader } from "react-spinners";
import { useRouter } from "next/navigation";

interface Props {
  team: TeamWithMembers;
  joinLinkToken: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const SidebarAlertDialogContentTeamCardJoinTeamButton = ({
  team,
  joinLinkToken,
  setIsOpen,
}: Props) => {
  const user = useCurrentUser();
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const isMember = team.members.some((member) => member.userId === user?.id);
  const onJoin = () =>
    startTransition(async () => {
      const result = await joinTeamByLink(joinLinkToken);
      if (result.teamId) {
        toast.success("You joined a team");
        setIsOpen(false);
        router.push(`/teams/team/${result.teamId}`);
      }
    });
  if (isPending) return <BarLoader />;
  if (isMember) return <span>Already a member of the team!</span>;

  return <Button onClick={onJoin}>Joind</Button>;
};
export default SidebarAlertDialogContentTeamCardJoinTeamButton;
