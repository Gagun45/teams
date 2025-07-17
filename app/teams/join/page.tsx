import { getTeamByJoinLinkToken } from "@/lib/helper/team.helper";
import JoinTeamCard from "./JoinTeamCard";

const JoinPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const token = (await searchParams).token;
  if (!token) return <main>Missing token</main>;
  const joinLinkToken = typeof token === "string" ? token : token[0];
  const team = await getTeamByJoinLinkToken(joinLinkToken);
  if (!team) return <span>No team found</span>;
  return (
    <main>
      <JoinTeamCard team={team} joinLinkToken={joinLinkToken} />
    </main>
  );
};
export default JoinPage;
