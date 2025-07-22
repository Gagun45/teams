"use client";

import LoadingButton from "@/components/General/LoadingButton";
import { Button } from "@/components/ui/button";
import { leaveTeam } from "@/lib/actions/team.actions";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

const LeaveButton = ({ teamId }: { teamId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const handleLeave = (teamId: string) =>
    startTransition(async () => {
      const result = await leaveTeam(teamId);
      if (result.success) {
        toast.success("Team left");
        router.refresh();
      }
    });
  if (isPending) return <LoadingButton />;
  return (
    <Button onClick={() => handleLeave(teamId)} variant={"destructive"}>
      Leave the team
    </Button>
  );
};
export default LeaveButton;
