"use client";

import { Button } from "@/components/ui/button";
import { deleteTeam } from "@/lib/actions/team.actions";
import { revalidateOwnTeamData } from "@/lib/helper/revalidate";
import { toast } from "sonner";

const DeleteTeam = ({ teamId }: { teamId: string }) => {
  const handleDeleteTeam = async () => {
    const result = await deleteTeam(teamId);
    if (result.success) {
      toast.success("Team deleted");
      await revalidateOwnTeamData();
    }
  };
  return (
    <Button variant={"destructive"} onClick={handleDeleteTeam}>
      Delete Team
    </Button>
  );
};
export default DeleteTeam;
