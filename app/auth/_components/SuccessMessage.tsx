import { CheckCircle2Icon } from "lucide-react";

const SuccessMessage = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <span className="flex items-center gap-1.5 text-green-800 font-semibold bg-green-200 p-1 rounded-sm">
      <CheckCircle2Icon className="size-5" />
      {message}
    </span>
  );
};
export default SuccessMessage;
