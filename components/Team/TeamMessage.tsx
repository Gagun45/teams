import useCurrentUser from "@/hooks/useCurrentUser";
import type { User } from "@prisma/client";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { UserCircle2Icon } from "lucide-react";
import { Button } from "../ui/button";
import { deleteMessage } from "@/lib/actions/team.actions";

interface Props {
  message: {
    id: string;
    message: string;
    user: User;
  };
}

const TeamMessage = ({ message }: Props) => {
  const user = useCurrentUser();
  const isMyMessage = user?.id === message.user.id;
  return (
    <span
      key={message.id}
      className={`${!isMyMessage && "ml-auto flex-row-reverse"} flex gap-4`}
    >
      <Avatar>
        {isMyMessage ? (
          <AvatarImage src="https://github.com/shadcn.png" />
        ) : (
          <AvatarImage src="/user.png" className="bg-secondary" />
        )}

        <AvatarFallback className="bg-main">
          <UserCircle2Icon className="size-full" />
        </AvatarFallback>
      </Avatar>
      <span>{message.message}</span>
      {isMyMessage && (
        <Button
          variant={"destructive"}
          onClick={() => deleteMessage(message.id)}
        >
          Delete
        </Button>
      )}
    </span>
  );
};
export default TeamMessage;
