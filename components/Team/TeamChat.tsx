"use client";

import { useEffect, useState, useTransition } from "react";
import TeamMessage from "./TeamMessage";
import type { User } from "@prisma/client";
import { Button } from "../ui/button";
import { getTeamMessages } from "@/lib/actions/team.actions";
import useCurrentUser from "@/hooks/useCurrentUser";
import Pusher from "pusher-js";
import SendMessage from "./SendMessage";
import LoadingButton from "../General/LoadingButton";

interface MessageInt {
  id: string;
  message: string;
  user: User;
}

interface Props {
  initialMessages: MessageInt[];
  totalCount: number;
  teamId: string;
}

const TeamChat = ({ initialMessages, totalCount, teamId }: Props) => {
  const [messages, setMessages] = useState(initialMessages);
  const [totalCountState, setTotalCountState] = useState(totalCount);
  const [isPending, startTransition] = useTransition();

  const user = useCurrentUser();
  useEffect(() => {
    if (!teamId || !user) return;
    const pusher = new Pusher("c95679ae0599cdb806b7", {
      cluster: "eu",
      authEndpoint: "/api/pusher/auth",
    });

    const channel = pusher.subscribe(`team-${teamId}`);

    channel.bind("new-team-message", (data: MessageInt) => {
      setMessages((prev) => [...prev, data]);
    });
    channel.bind("deleted-message", (data: { id: string }) => {
      setMessages((prev) => prev.filter((message) => message.id !== data.id));
      if (totalCountState === messages.length)
        setTotalCountState(messages.length - 1);
    });
    return () => pusher.unsubscribe(`team-${teamId}`);
  }, [teamId, user, setMessages, messages, totalCountState]);

  const handleLoadMore = () => {
    startTransition(async () => {
      const res = await getTeamMessages(teamId, messages.length);
      if (res.teamMessages) {
        setMessages((prev) => [...res.teamMessages.reverse(), ...prev]);
        setTotalCountState(res.totalCount);
      }
    });
  };
  return (
    <div className="w-full h-full border-2 gap-2 p-2 flex flex-col">
      {messages.length < totalCountState ? (
        isPending ? (
          <LoadingButton />
        ) : (
          <Button onClick={handleLoadMore} className="w-fit">
            Load more
          </Button>
        )
      ) : (
        <span>No more messages</span>
      )}
      <div className="h-120 flex flex-col overflow-auto gap-1">
        {messages.map((message) => (
          <TeamMessage key={message.id} message={message} />
        ))}
      </div>
      <SendMessage teamId={teamId} />
    </div>
  );
};
export default TeamChat;
