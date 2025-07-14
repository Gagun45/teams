import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ShirtIcon } from "lucide-react";
import Link from "next/link";

interface Props {
  image?: string;
  name: string;
  membersLength: number;
  owner: string;
}

const TeamCard = ({ membersLength, name, image, owner }: Props) => {
  return (
    <Card className="w-54 pb-1">
      <CardHeader>
        <CardTitle>
          <p>{name}</p>
          <p className="text-sm font-normal">Members: {membersLength}</p>
        </CardTitle>
        <CardDescription>Owner: {owner}</CardDescription>
      </CardHeader>
      <CardContent>
        <Avatar className="aspect-square size-36 mx-auto rounded-none">
          <AvatarImage src={image} />
          <AvatarFallback className="rounded-md bg-main">
            <ShirtIcon className="size-full" />
          </AvatarFallback>
        </Avatar>
      </CardContent>
      <CardFooter className="mt-auto">
        <Link
          className={`${buttonVariants({
            variant: "link",
          })} ml-auto font-semibold`}
          href={"#"}
        >
          More...
        </Link>
      </CardFooter>
    </Card>
  );
};
export default TeamCard;
