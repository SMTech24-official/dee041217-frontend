"use client";
import {
  BarChart2,
  BookType,
  FileText,
  LayoutDashboard,
  LogOut,
  UserCog,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/images/auth_text.png";

function Sidebar() {
  const pathName = usePathname();
  return (
    <>
      <div>
        <Image
          src={logo}
          alt="logo"
          width={200}
          height={200}
          className="w-[150px] md:w-[120px] lg:w-[150px]"
        />
        <nav className="space-y-4 mt-5">
          {[
            {
              icon: <LayoutDashboard size={18} />,
              label: "Home",
              href: "/dashboard",
            },
            {
              icon: <FileText size={18} />,
              label: "Practice",
              href: "/dashboard/practice",
            },
            {
              icon: <BookType size={18} />,
              label: "Leaderboard",
              href: "/dashboard/leaderboard",
            },
            {
              icon: <BarChart2 size={18} />,
              label: "Progress Report",
              href: "/dashboard/progress_report",
            },
            {
              icon: <UserCog size={18} />,
              label: "Profile",
              href: "/dashboard/profile",
            },
          ].map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={pathName === item.href}
            />
          ))}
        </nav>
      </div>
      <SidebarItem
        icon={<LogOut size={18} />}
        label="Logout"
        textColor="text-red-500"
      />
    </>
  );
}

function SidebarItem({
  icon,
  label,
  href = "#",
  textColor = "text-white",
  active = false,
}: {
  icon: React.ReactNode;
  label: string;
  href?: string;
  textColor?: string;
  active?: boolean;
}) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 px-4 py-2 h-14 rounded-full text-base md:text-lg font-semibold transition-all duration-300
          ${
            active
              ? "bg-gradient-to-b from-green-400 to-green-500 text-white shadow-[0_6px_0_0_rgba(34,197,94,0.5)] hover:brightness-110"
              : `hover:bg-white/10 ${textColor || "text-white"}`
          }
        `}
    >
      {icon}
      <span className="truncate">{label}</span>
    </Link>
  );
}
export default Sidebar;
