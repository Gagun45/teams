import { TriangleAlertIcon } from "lucide-react";

const ErrorMessage = ({ message }: { message: string }) => {
  if (!message) return null;
  return (
    <span className="flex items-center gap-1.5 text-destructive font-semibold bg-red-200 p-1 rounded-sm">
      <TriangleAlertIcon className="size-5" />
      {message}
    </span>
  );
};
export default ErrorMessage;
