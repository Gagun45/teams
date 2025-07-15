import { joinTeamByLink } from "@/lib/actions/team.actions";
import { BeatLoader } from "react-spinners";

const JoinPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const token = (await searchParams).token;
  if (!token) return <main>Missing token</main>;
  const joinLinkToken = typeof token === "string" ? token : token[0];
  const result = await joinTeamByLink(joinLinkToken);

  return (
    <main>
      <span>Error: {result.error}</span>
      <span>Success: {result.success}</span>
      <BeatLoader />
    </main>
  );
};
export default JoinPage;
