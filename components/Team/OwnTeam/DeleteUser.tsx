"use client";

import { Button } from "@/components/ui/button";
import { deleteUserFromTeam } from "@/lib/actions/team.actions";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const DeleteUser = ({ teamId, userId }: { teamId: string; userId: string }) => {
  const router = useRouter();
  const handleDelete = async () => {
    const result = await deleteUserFromTeam(teamId, userId);
    if (result.success) {
      toast.success("User removed");
      router.refresh();
    }
  };
  return <Button onClick={handleDelete}>DeleteUser</Button>;
};
export default DeleteUser;
