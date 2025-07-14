"use client";

import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { logout } from "@/lib/auth.actions";

const LogoutButton = () => {
  return (
    <DropdownMenuItem>
      <Button onClick={async () => await logout()}>
        Logout
      </Button>
    </DropdownMenuItem>
  );
};
export default LogoutButton;
