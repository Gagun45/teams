import { Button } from "../ui/button";
import {RingLoader } from "react-spinners";

const LoadingButton = () => {
  return (
    <Button>
      <RingLoader size={'24px'} color='green' /> Loading...
    </Button>
  );
};
export default LoadingButton;
