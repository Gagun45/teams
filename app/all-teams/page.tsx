import TeamCard from "@/components/Team/TeamCard/TeamCard";
import { getAllTeams } from "@/lib/helper/team.helper";

const ProtectedPage = async () => {
  const allTeams = await getAllTeams();
  return (
    <main>
      <div className="flex gap-4 flex-wrap">
        {allTeams?.map((team) => (
          <TeamCard
            key={team.id}
            membersLength={team.members.length}
            name={team.name}
            owner={team.creator.name}
          />
        ))}
      </div>
    </main>
  );
};
export default ProtectedPage;
