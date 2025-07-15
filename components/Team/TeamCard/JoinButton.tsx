"use client";

import LoadingButton from "@/components/General/LoadingButton";
import { Button, buttonVariants } from "@/components/ui/button";
import useCurrentUser from "@/hooks/useCurrentUser";
import { joinTeam, leaveTeam } from "@/lib/helper/team.helper";
import type { TeamWithMembersAndOwner } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

interface Props {
  team: TeamWithMembersAndOwner;
}

const JoinButton = ({ team }: Props) => {
  const user = useCurrentUser();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const isOwner = team.members.some(
    (member) =>
      member.teamId === team.id &&
      member.userId === user?.id &&
      member.teamRole === "owner"
  );
  const isMember = team.members.some(
    (member) => member.teamId === team.id && member.userId === user?.id
  );

  const onJoin = async () => {
    startTransition(async () => {
      await joinTeam(team.id);
      router.refresh();
    });
  };

  const onLeave = async () => {
    startTransition(async () => {
      await leaveTeam(team.id);
      router.refresh();
    });
  };

  if (isPending) return <LoadingButton />;

  if (isOwner)
    return <span className={`${buttonVariants()} !bg-main`}>OWNER</span>;

  return isMember ? (
    <Button variant={"destructive"} onClick={onLeave}>
      Leave
    </Button>
  ) : (
    <Button variant={"default"} onClick={onJoin}>
      Join
    </Button>
  );
};
export default JoinButton;
