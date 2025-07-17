"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import type { TeamWithMembers } from "./JoinTeamCard";
import { Button } from "@/components/ui/button";
import { joinTeamByLink } from "@/lib/actions/team.actions";
import { toast } from "sonner";
import { revalidateLayout } from "@/lib/helper/revalidate";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import LoadingButton from "@/components/General/LoadingButton";

interface Props {
  team: TeamWithMembers;
  joinLinkToken: string;
}

const JoinTeamButton = ({ team, joinLinkToken }: Props) => {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();
  const onJoin = async () => {
    startTransition(async () => {
      const result = await joinTeamByLink(joinLinkToken);
      if (result.teamId) {
        toast.success("You joined a team!");
        await revalidateLayout();
        router.push(`/teams/team/${result.teamId}`);
      }
    });
  };
  const user = useCurrentUser();
  const isMember = team.members.some((member) => member.userId === user?.id);
  if (!user) return <></>;
  if (isMember) return <span>You are already member of the team!</span>;
  if (isPending) return <LoadingButton />;
  return <Button onClick={onJoin}>Join the team</Button>;
};
export default JoinTeamButton;
