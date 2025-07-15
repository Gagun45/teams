import { auth } from "@/lib/auth";
import { getTeamById } from "@/lib/helper/team.helper";

const TeamPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const team = await getTeamById(id);
  const session = await auth();
  const teamRole = team?.members.find(
    (member) => member.userId === session?.user.id
  )?.teamRole;

  return (
    <main>
      TeamPage {team?.name}, teamRole: {teamRole}{" "}
    </main>
  );
};
export default TeamPage;
