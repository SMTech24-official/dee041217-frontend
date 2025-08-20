import { Divide } from "lucide-react";
import { usePathname } from "next/navigation";

const Spinner = () => {
  const params = usePathname();
  const isAdmin = params.startsWith("/admin");
  return (
    <div className="md:py-10 py-5 flex justify-center items-center">
      <div className="animate-spin">
        <Divide
          className={isAdmin ? "text-[#00de5c]" : "text-white"}
          size={50}
        />
      </div>
    </div>
  );
};

export default Spinner;
