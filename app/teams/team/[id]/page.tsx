import { auth } from "@/lib/auth";
import { getTeamById } from "@/lib/helper/team.helper";
import LeaveButton from "./LeaveButton";
import { redirect } from "next/navigation";
import TeamChat from "@/components/Team/TeamChat";
import SendMessage from "@/components/Team/SendMessage";

const TeamPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const team = await getTeamById(id);
  const session = await auth();
  if (!team) return null;
  const teamRole = team.members.find(
    (member) => member.userId === session?.user.id
  )?.teamRole;

  if (!teamRole) redirect("/");

  return (
    <main>
      <span>
        TeamPage {team.name}, teamRole: {teamRole}
      </span>
      <TeamChat team={team} />
      <SendMessage teamId={team.id} />
      {teamRole !== "owner" && <LeaveButton teamId={team.id} />}
    </main>
  );
};
export default TeamPage;
