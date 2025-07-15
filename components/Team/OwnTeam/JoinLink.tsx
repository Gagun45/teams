"use client";

import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const JoinLink = ({ joinLink }: { joinLink: string }) => {
  const [show, setShow] = useState(false);
  const handleCopy = async () => {
    await navigator.clipboard.writeText(joinLink);
    toast.success("Copied!");
  };
  return (
    <span className="flex gap-4 flex-wrap text-wrap break-all">
      <span
        onClick={() => {
          setShow((prev) => !prev);
        }}
      >
        {show ? "Hide" : "Show"}
      </span>
      {show ? `${joinLink}` : "join link"}
      <Button className="size-6" onClick={handleCopy}>
        <Copy />
      </Button>
    </span>
  );
};
export default JoinLink;
