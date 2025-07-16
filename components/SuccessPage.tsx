"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { toast } from "sonner";

const SuccessPage = ({ teamId }: { teamId: string }) => {
  const router = useRouter();
  useEffect(() => {
    toast.success("You joined a team");
  }, []);
  useEffect(() => {
    if (!teamId) return;
    const timerId = setTimeout(() => {
      router.push(`/teams/team/${teamId}`);
      router.refresh();
    }, 3000);
    return () => clearTimeout(timerId);
  }, [router, teamId]);
  return <main>Redirecting to teampage after 3 secs</main>;
};
export default SuccessPage;
