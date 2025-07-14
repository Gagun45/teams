"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/auth.actions";
import { useSession } from "next-auth/react";

const LogoutButton = () => {
  const { update } = useSession();
  return (
    <DropdownMenuItem>
      <Button
        onClick={async () => {
          await logout();
          await update();
        }}
      >
        Logout
      </Button>
    </DropdownMenuItem>
  );
};
export default LogoutButton;
