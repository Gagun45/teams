"use client";

import LogoutButton from "@/app/auth/_components/LogoutButton";
import Pusher from "pusher-js";
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
import { useEffect } from "react";
import { toast } from "sonner";
import {
  revalidateLayout,
  revalidateOwnTeamData,
} from "@/lib/helper/revalidate";

const UserButton = () => {
  const user = useCurrentUser();
  useEffect(() => {
    const pusher = new Pusher("c95679ae0599cdb806b7", {
      cluster: "eu",
    });

    const channel = pusher.subscribe("all-users");

    channel.bind("new-not", (data: { message: string }) => {
      toast.success(data.message);
    });
    return () => pusher.unsubscribe("all-users");
  }, []);
  useEffect(() => {
    if (!user) return;
    console.log(user.id);
    const pusher = new Pusher("c95679ae0599cdb806b7", {
      cluster: "eu",
      authEndpoint: "/api/pusher/auth",
    });

    const channel = pusher.subscribe(`private-user-${user.id}`);

    channel.bind("private-notification", (data: { message: string }) => {
      revalidateOwnTeamData();
      toast.success(data.message);
    });
    channel.bind("deleted-team", async () => {
      await revalidateLayout();
      toast.success("Team Deleted");
    });
    return () => pusher.unsubscribe(`private-user-${user.id}`);
  }, [user]);
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
