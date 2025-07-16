import ErrorPage from "@/components/ErrorPage";
import SuccessPage from "@/components/SuccessPage";
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
  if (result.teamId) return <SuccessPage teamId={result.teamId} />;
  if (result.error) return <ErrorPage />;

  return (
    <main>
      <span>Error: {result?.error}</span>
      <BeatLoader />
    </main>
  );
};
export default JoinPage;
