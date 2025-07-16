import type { User } from "@prisma/client";
import { useCallback, useEffect, useState } from "react";
import useCurrentUser from "./useCurrentUser";
import Pusher from "pusher-js";
import { getTeamMessages } from "@/lib/actions/team.actions";

const useTeamChatMessages = (teamId: string) => {
  const [messages, setMessages] = useState<
    { id: string; message: string; user: User }[]
  >([]);
  const user = useCurrentUser();
  const fetchMessages = useCallback(async () => {
    if (!teamId) return;
    const messages = await getTeamMessages(teamId);
    if (messages.teamMessages) setMessages(messages.teamMessages.reverse());
  }, [teamId]);
  useEffect(() => {
    fetchMessages();
  }, [fetchMessages]);
  useEffect(() => {
    if (!teamId || !user) return;
    const pusher = new Pusher("c95679ae0599cdb806b7", {
      cluster: "eu",
      authEndpoint: "/api/pusher/auth",
    });

    const channel = pusher.subscribe(`team-${teamId}`);

    channel.bind(
      "new-team-message",
      (data: { id: string; message: string; user: User }) => {
        setMessages((prev) => [...prev, data]);
      }
    );
    channel.bind("deleted-message", (data: { id: string }) => {
      setMessages((prev) => prev.filter((message) => message.id !== data.id));
    });
    return () => pusher.unsubscribe(`team-${teamId}`);
  }, [teamId, user]);
  return messages;
};
export default useTeamChatMessages;
