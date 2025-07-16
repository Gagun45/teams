import { auth } from "@/lib/auth";
import { getTeamById } from "@/lib/helper/team.helper";
import LeaveButton from "./LeaveButton";
import { redirect } from "next/navigation";

const TeamPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const team = await getTeamById(id);
  const session = await auth();
  const teamRole = team?.members.find(
    (member) => member.userId === session?.user.id
  )?.teamRole;

  if (!teamRole) redirect("/");

  if (!team) return null;

  return (
    <main>
      TeamPage {team?.name}, teamRole: {teamRole}{" "}
      {teamRole !== "owner" && <LeaveButton teamId={team.id} />}
    </main>
  );
};
export default TeamPage;
