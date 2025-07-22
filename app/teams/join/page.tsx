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
  const pageHeader = <h1 className="font-bold text-center text-4xl mb-12">Join a team</h1>;
  if (!team)
    return (
      <main className="text-center">
        {pageHeader}
        <span className="font-semibold text-2xl">
          No team found. Please check the join link
        </span>
      </main>
    );
  return (
    <main>
      {pageHeader}
      <JoinTeamCard team={team} joinLinkToken={joinLinkToken} />
    </main>
  );
};
export default JoinPage;
