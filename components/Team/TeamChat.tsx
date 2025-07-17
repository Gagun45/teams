"use client";

import { useEffect, useState } from "react";
import TeamMessage from "./TeamMessage";
import type { User } from "@prisma/client";
import { Button } from "../ui/button";
import { getTeamMessages } from "@/lib/actions/team.actions";
import useCurrentUser from "@/hooks/useCurrentUser";
import Pusher from "pusher-js";

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

  const handleLoadMore = async () => {
    const res = await getTeamMessages(teamId, messages.length);
    if (res.teamMessages) {
      setMessages((prev) => [...res.teamMessages.reverse(), ...prev]);
      setTotalCountState(res.totalCount);
    }
  };
  return (
    <div className="w-full h-full border-2 flex flex-col">
      {messages.length < totalCountState ? (
        <Button onClick={handleLoadMore}>Load more</Button>
      ) : (
        <span>No more messages</span>
      )}
      <div>Total Count: {totalCountState}</div>
      {messages.map((message) => {
        return <TeamMessage key={message.id} message={message} />;
      })}
    </div>
  );
};
export default TeamChat;
