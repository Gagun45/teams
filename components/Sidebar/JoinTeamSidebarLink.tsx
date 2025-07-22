"use client";

import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import { PlusCircleIcon } from "lucide-react";
import SidebarAlertDialogContent from "./SidebarAlertDialogContent";
import { useState } from "react";
import { Button } from "../ui/button";

const JoinTeamSidebarLink = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="size-12 hover:scale-[1.2] flex items-center justify-center duration-100">
      <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
        <AlertDialogTrigger className="size-full">
          <Tooltip>
            <TooltipTrigger asChild>
              <PlusCircleIcon className="size-full text-secondary" />
            </TooltipTrigger>
            <TooltipContent align="center" side="right">
              Join a team
            </TooltipContent>
          </Tooltip>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader className="flex-row justify-between">
            <AlertDialogTitle>Join team</AlertDialogTitle>
            <AlertDialogTrigger asChild>
              <Button>X</Button>
            </AlertDialogTrigger>
          </AlertDialogHeader>
          <AlertDialogDescription>
            After entering a join link the team information will be shown
          </AlertDialogDescription>
          <SidebarAlertDialogContent setIsOpen={setIsOpen} />
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
export default JoinTeamSidebarLink;
