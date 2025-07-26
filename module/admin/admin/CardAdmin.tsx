import { CalendarCheck } from "lucide-react";

function CardAdmin({ title, amount }: { title: string; amount: string }) {
  return (
    <div className="w-full rounded-xl px-10 py-5 flex flex-col items-start justify-center gap-3 text-white font-bold text-lg bg-gradient-to-b from-[#fdfbfb] to-[#e6e7e7] shadow-[0_6px_0_0_#157a9c71] hover:brightness-110 transition-all duration-300 cursor-pointer border border-gray-200 hover:border-[#157a9c] hover:shadow-[0_6px_0_0_#157a9c] hover:shadow-[#157a9c]">
     
      <div className="w-12 h-12 flex items-center justify-center rounded-md bg-green-100 text-green-500 hover:bg-green-500 hover:text-white cursor-pointer transition duration-300 border border-green-500">
        <CalendarCheck className="w-8 h-8" />
      </div>
      <h1 className="text-black/80">{title}</h1>
      <h1 className="text-3xl font-black text-green-600">{amount}</h1>
    </div>
  );
}

export default CardAdmin;
