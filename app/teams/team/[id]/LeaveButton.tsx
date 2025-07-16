"use client";

import { Button } from "@/components/ui/button";
import { leaveTeam } from "@/lib/actions/team.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const LeaveButton = ({ teamId }: { teamId: string }) => {
  const router = useRouter();
  const handleLeave = async (teamId: string) => {
    const result = await leaveTeam(teamId);
    if (result.success) {
      toast.success("Team left");
      router.refresh();
    }
  };
  return (
    <Button onClick={() => handleLeave(teamId)} variant={"destructive"}>
      Leave the team
    </Button>
  );
};
export default LeaveButton;
