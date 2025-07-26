"use client";

interface AdminButtonProps {
    label: string;
    icon: React.ReactNode;
    onClick: () => void;
}

function AdminButton({label, icon, onClick}: AdminButtonProps) {
    return (
        <button
        onClick={onClick}
        className="flex items-center justify-center whitespace-nowrap gap-2 w-44 h-14 rounded-full text-base md:text-lg font-semibold transition-all duration-300
         bg-gradient-to-b from-green-400 to-green-500 text-white shadow-[0_6px_0_0_rgba(34,197,94,0.5)] hover:brightness-110 cursor-pointer"
      >
        {icon} {label}
      </button>
    );
}

export default AdminButton;