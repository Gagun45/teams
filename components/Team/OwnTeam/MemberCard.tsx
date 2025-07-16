import type { TeamWithMembersAndOwner } from "@/lib/types";
import DeleteUser from "./DeleteUser";

interface Props {
  member: TeamWithMembersAndOwner["members"][number];
}

const MemberCard = ({ member }: Props) => {
  return (
    <div>
      {member.user.name} - {member.teamRole}
      {member.teamRole !== "owner" && (
        <DeleteUser teamId={member.teamId} userId={member.userId} />
      )}
    </div>
  );
};
export default MemberCard;
