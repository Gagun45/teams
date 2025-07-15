import OwnTeamCard from "@/components/Team/OwnTeam/OwnTeamCard";
import { auth } from "@/lib/auth";
import { getOwnTeamsById } from "@/lib/helper/team.helper";

const OwnTeams = async () => {
  const session = await auth();
  if (!session) return null;

  const user = session.user;

  const ownTeams = await getOwnTeamsById(user.id);

  return (
    <main>
      <div className="flex flex-col">
        {ownTeams?.map((team) => (
          <OwnTeamCard key={team.id} team={team}/>
        ))}
      </div>
    </main>
  );
};
export default OwnTeams;
