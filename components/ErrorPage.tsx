"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { PuffLoader } from "react-spinners";
import { toast } from "sonner";

const ErrorPage = () => {
  const router = useRouter();
  useEffect(() => {
    toast.error("Failed to join a team");
    router.push("/");
  }, [router]);

  return (
    <main>
      <PuffLoader />
    </main>
  );
};
export default ErrorPage;
