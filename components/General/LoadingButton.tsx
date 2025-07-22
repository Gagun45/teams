import { Button } from "../ui/button";
import { RingLoader } from "react-spinners";

const LoadingButton = () => {
  return (
    <Button className="w-fit">
      <RingLoader size={"24px"} color="green" />
    </Button>
  );
};
export default LoadingButton;
