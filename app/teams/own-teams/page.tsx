import { auth } from "@/lib/auth";
import { getOwnTeamsById } from "@/lib/helper/team.helper";

const OwnTeams = async () => {
  const session = await auth();
  if (!session) return null;

  const user = session.user;

  const ownTeams = await getOwnTeamsById(user.id);

  return (
    <div>
      {ownTeams?.map((team) => (
        <span key={team.name}>
          {team.name}, members:{" "}
          {team.members.map((member) => (
            <span key={member.id}>{member.name}</span>
          ))}
        </span>
      ))}
    </div>
  );
};
export default OwnTeams;
