import { Divide } from "lucide-react";

const Spinner = () => {
  return (
    <div className="md:py-10 py-5 flex justify-center items-center">
      <div className="animate-spin">
        <Divide className="text-white" size={50} />
      </div>
    </div>
  );
};

export default Spinner;