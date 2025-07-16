"use client";

import { Button } from "@/components/ui/button";
import { leaveTeam } from "@/lib/actions/team.actions";
import { useRouter } from "next/navigation";

const LeaveButton = ({ teamId }: { teamId: string }) => {
  const router = useRouter();
  const handleLeave = async (teamId: string) => {
    const result = await leaveTeam(teamId);
    if (result.success) router.refresh();

  };
  return (
    <Button onClick={() => handleLeave(teamId)} variant={"destructive"}>
      Leave the team
    </Button>
  );
};
export default LeaveButton;
