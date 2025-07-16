"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PuffLoader } from "react-spinners";
import { toast } from "sonner";

const SuccessPage = ({ teamId }: { teamId: string }) => {
  const router = useRouter();
  useEffect(() => {
    toast.success("You joined a team");
  }, []);
  useEffect(() => {
    if (!teamId) return;

    router.push(`/teams/team/${teamId}`);
    router.refresh();
  }, [router, teamId]);
  return (
    <main>
      <PuffLoader />
    </main>
  );
};
export default SuccessPage;
