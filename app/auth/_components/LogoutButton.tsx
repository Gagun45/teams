"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";

const LogoutButton = () => {
  return (
    <DropdownMenuItem>
      <Button
        onClick={async () => {
          await signOut();
        }}
      >
        Logout
      </Button>
    </DropdownMenuItem>
  );
};
export default LogoutButton;
