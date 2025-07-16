"use client";

import type { TeamWithMembersAndOwnerAndMessages } from "@/lib/types";
import TeamMessage from "./TeamMessage";
import useTeamChat from "@/hooks/useTeamChat";

const TeamChat = ({ team }: { team: TeamWithMembersAndOwnerAndMessages }) => {
  const messages = useTeamChat(team);

  return (
    <div className="w-full h-full border-2 flex flex-col">
      {messages.map((message) => {
        return <TeamMessage key={message.id} message={message} />;
      })}
    </div>
  );
};
export default TeamChat;
