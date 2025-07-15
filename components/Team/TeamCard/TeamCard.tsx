import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShirtIcon } from "lucide-react";
import Link from "next/link";
import type { TeamWithMembersAndOwner } from "@/lib/types";

interface Props {
  team: TeamWithMembersAndOwner;
}

const TeamCard = ({ team }: Props) => {
  return (
    <Card className="w-54">
      <CardHeader>
        <CardTitle>
          <Link
            className="hover:underline line-clamp-1"
            href={`/teams/team/${team.id}`}
          >
            {team.name}
          </Link>
        </CardTitle>
        <CardDescription className="flex flex-col">
          <span className="text-sm font-normal">
            Members: {team.members.length}
          </span>
          <span className="line-clamp-1">Owner: {team.creator.name}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Avatar className="aspect-square h-36 w-full mx-auto rounded-md">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback className="rounded-md bg-main">
            <ShirtIcon className="size-full" />
          </AvatarFallback>
        </Avatar>
      </CardContent>
    </Card>
  );
};
export default TeamCard;
