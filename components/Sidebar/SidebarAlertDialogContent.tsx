"use client";

import type { TeamWithMembers } from "@/app/teams/join/JoinTeamCard";
import { getTeamByJoinLinkToken } from "@/lib/helper/team.helper";
import {
  useCallback,
  useEffect,
  useState,
  useTransition,
  type Dispatch,
  type SetStateAction,
} from "react";
import { BeatLoader } from "react-spinners";
import { useDebounce } from "use-debounce";
import SidebarAlertDialogContentTeamCard from "./SidebarAlertDialogContentTeamCard";

const SidebarAlertDialogContent = ({
  setIsOpen,
}: {
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const [link, setLink] = useState("");
  const [debouncedLink] = useDebounce(link, 500);
  const [team, setTeam] = useState<TeamWithMembers | null>(null);
  const [isPending, startTransition] = useTransition();
  const fetchTeam = useCallback(() => {
    startTransition(async () => {
      const result = await getTeamByJoinLinkToken(debouncedLink);
      setTeam(result);
    });
  }, [debouncedLink]);
  useEffect(() => {
    if (!debouncedLink) return;
    fetchTeam();
  }, [debouncedLink, fetchTeam]);
  return (
    <div className="flex flex-col gap-4 ">
      <span>Enter a link:</span>
      <input
        value={link}
        onChange={(e) => setLink(e.target.value)}
        className="border-1 rounded-md px-1"
      />
      {isPending && <BeatLoader />}
      {debouncedLink && !team && !isPending && <span>Team not found</span>}
      {team && debouncedLink && (
        <SidebarAlertDialogContentTeamCard
          setIsOpen={setIsOpen}
          team={team}
          joinLinkToken={debouncedLink}
        />
      )}
    </div>
  );
};
export default SidebarAlertDialogContent;
