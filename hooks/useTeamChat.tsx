import type { User } from "@prisma/client";
import { useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import type { TeamWithMembersAndOwnerAndMessages } from "@/lib/types";
import Pusher from "pusher-js";

const useTeamChat = (team: TeamWithMembersAndOwnerAndMessages) => {
  const [messages, setMessages] = useState<
    { id: string; message: string; user: User }[]
  >([]);
  const user = useCurrentUser();
  useEffect(() => {
    if (!team || !user) return;
    setMessages(
      team.TeamMessage.map((message) => ({
        id: message.id,
        message: message.message,
        user: message.user,
      }))
    );
    const pusher = new Pusher("c95679ae0599cdb806b7", {
      cluster: "eu",
      authEndpoint: "/api/pusher/auth",
    });

    const channel = pusher.subscribe(`team-${team.id}`);

    channel.bind(
      "new-team-message",
      (data: { id: string; message: string; user: User }) => {
        setMessages((prev) => [...prev, data]);
      }
    );
    channel.bind("deleted-message", (data: { id: string }) => {
      setMessages((prev) => prev.filter((message) => message.id !== data.id));
    });
    return () => pusher.unsubscribe(`team-${team.id}`);
  }, [team, user]);
  return messages;
};
export default useTeamChat;
