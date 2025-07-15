"use client";

import LogoutButton from "@/app/auth/_components/LogoutButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import useCurrentUser from "@/hooks/useCurrentUser";
import { UserCircle2Icon } from "lucide-react";
import Link from "next/link";

const UserButton = () => {
  const user = useCurrentUser();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="cursor-pointer">
        <Avatar>
          <AvatarImage src="/user.png" className="bg-secondary" />
          <AvatarFallback className="bg-main">
            <UserCircle2Icon className="size-full" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>My Account</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={"/teams/all"}>All teams</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/teams/new"}>Create Team</Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={"/teams/own"}>Own teams</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <LogoutButton />
        <DropdownMenuSeparator />

        <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default UserButton;
