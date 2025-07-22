"use client";
import { useState, useTransition } from "react";
import { Button } from "../ui/button";
import { sendMessage } from "@/lib/actions/team.actions";
import LoadingButton from "../General/LoadingButton";

const SendMessage = ({ teamId }: { teamId: string }) => {
  const [isPending, startTransition] = useTransition();
  const [message, setMessage] = useState("");
  const handleOnSend = async () => {
    startTransition(async () => {
      const result = await sendMessage(teamId, message);
      if (result.success) {
        setMessage("");
      }
    });
  };
  return (
    <div className="flex gap-4">
      <input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        className="border-1 p-1 w-full max-w-lg rounded-md"
      />
      {isPending ? (
        <LoadingButton />
      ) : (
        <Button onClick={handleOnSend}>Send</Button>
      )}
    </div>
  );
};
export default SendMessage;
