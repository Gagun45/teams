import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import type { TeamWithMembersAndOwner } from "@/lib/types";
import MemberCard from "./MemberCard";

interface Props {
  team: TeamWithMembersAndOwner;
}

const ViewAllMembersSheet = ({ team }: Props) => {
  return (
    <Sheet>
      <SheetTrigger className="underline cursor-pointer">(Manage)</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Team {team.name} members</SheetTitle>
          <SheetDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </SheetDescription>
        </SheetHeader>
        <div className="flex flex-col">
          {team.members.map((member) => (
            <MemberCard key={member.userId} member={member} />
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};
export default ViewAllMembersSheet;
