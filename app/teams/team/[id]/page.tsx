import { auth } from "@/lib/auth";
import { getTeamById } from "@/lib/helper/team.helper";
import LeaveButton from "./LeaveButton";
import { redirect } from "next/navigation";
import TeamChat from "@/components/Team/TeamChat";

const TeamPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const team = await getTeamById(id);
  const session = await auth();
  const teamRole = team?.members.find(
    (member) => member.userId === session?.user.id
  )?.teamRole;

  if (!team) return redirect("/");
  if (!teamRole) redirect("/");

  const initialMessages = team.TeamMessage.map((tmessage) => ({
    id: tmessage.id,
    message: tmessage.message,
    user: tmessage.user,
  })).reverse();

  const totalCount = team._count.TeamMessage;

  return (
    <main>
      <span>
        TeamPage {team.name}, teamRole: {teamRole}
      </span>
      <TeamChat
        initialMessages={initialMessages}
        totalCount={totalCount}
        teamId={team.id}
      />
      {teamRole !== "owner" && <LeaveButton teamId={team.id} />}
    </main>
  );
};
export default TeamPage;
