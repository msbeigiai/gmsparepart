import { SquareArrowRight } from "lucide-react";
import { Button } from "./ui/button";

interface ProceedToPayProps {
  url: string;
}

const handleProceedToPay = () => {
  console.log("PAYING...");
};

const ProceedToPay = ({ url }: ProceedToPayProps) => {
  return (
    <div>
      <Button variant={"default"} size={"lg"} onClick={handleProceedToPay}>
        Proceed to pay
        <SquareArrowRight />
      </Button>
    </div>
  );
};

export default ProceedToPay;
