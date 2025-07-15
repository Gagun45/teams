import { getTeamById } from "@/lib/helper/team.helper";

const TeamPage = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const team = await getTeamById(id);

  return <main>TeamPage {team?.members[0].userId} </main>;
};
export default TeamPage;
