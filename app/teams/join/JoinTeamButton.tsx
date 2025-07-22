"use client";

import useCurrentUser from "@/hooks/useCurrentUser";
import type { TeamWithMembers } from "./JoinTeamCard";
import { Button, buttonVariants } from "@/components/ui/button";
import { joinTeamByLink } from "@/lib/actions/team.actions";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import LoadingButton from "@/components/General/LoadingButton";
import { revalidateLayout } from "@/lib/helper/revalidate";
import Link from "next/link";

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
  if (!user) return null;
  if (isPending) return <LoadingButton />;
  if (isMember)
    return (
      <>
        <span className="font-semibold text-lg">
          You are already a member of the team!
        </span>
        <Link
          className={buttonVariants({ variant: "link" })}
          href={`/teams/team/${team.id}`}
        >
          Go to team page
        </Link>
      </>
    );
  return <Button onClick={onJoin}>Join the team</Button>;
};
export default JoinTeamButton;
