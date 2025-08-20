"use client";
import {
  BarChart2,
  BookText,
  BookType,
  CalendarCheck,
  FileText,
  LayoutDashboard,
  LogOut,
  UserCheck,
  UserCog,
  Users,
} from "lucide-react";
import Link from "next/link";
import React from "react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import logo from "@/assets/images/auth_text.png";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { logout, selectCurrentUser } from "@/redux/features/auth/authSlice";
import { removeCookie } from "@/utils/cookies";

function Sidebar() {
  const pathName = usePathname();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const role = useAppSelector(selectCurrentUser)?.role || "USER";

  const sidebarItems = [
    {
      icon: <LayoutDashboard size={18} />,
      label: "Home",
      href: "/dashboard",
      roles: ["USER"],
      color: "text-black md:text-white",
    },
    {
      icon: <FileText size={18} />,
      label: "Practice",
      href: "/dashboard/practice",
      roles: ["USER"],
      color: "text-black md:text-white",
    },
    {
      icon: <BookType size={18} />,
      label: "Leaderboard",
      href: "/dashboard/leaderboard",
      roles: ["USER"],
      color: "text-black md:text-white",
    },
    {
      icon: <BarChart2 size={18} />,
      label: "Progress Report",
      href: "/dashboard/progress_report",
      roles: ["USER", "PARENT"],
      color: "text-black md:text-white",
    },
    {
      icon: <UserCog size={18} />,
      label: "Profile",
      href: "/dashboard/profile",
      roles: ["USER", "PARENT"],
      color: "text-black md:text-white",
    },
    // ADMIN
    {
      icon: <LayoutDashboard size={18} />,
      label: "Dashboard",
      href: "/admin",
      roles: ["ADMIN"],
      color: "text-black",
    },
    {
      icon: <FileText size={18} />,
      label: "Math Missions",
      href: "/admin/math_missions",
      roles: ["ADMIN"],
      color: "text-black",
    },
    {
      icon: <BookText size={18} />,
      label: "Time Challenges",
      href: "/admin/time_challenges",
      roles: ["ADMIN"],
      color: "text-black",
    },
    {
      icon: <CalendarCheck size={18} />,
      label: "Daily Practice",
      href: "/admin/daily_practice",
      roles: ["ADMIN"],
      color: "text-black",
    },
    {
      icon: <Users size={18} />,
      label: "Users Info",
      href: "/admin/users_information",
      roles: ["ADMIN"],
      color: "text-black",
    },
    {
      icon: <UserCheck size={18} />,
      label: "Subscription",
      href: "/admin/subscription",
      roles: ["ADMIN"],
      color: "text-black",
    },
  ].filter((item) => item.roles.includes(role));

  const activeMenu = (path: string) => {
    const exactMatch = pathName === path;

    const subMenuMatchMap: Record<string, string[]> = {
      "/admin/time_challenges": [
        "/admin/time_challenges",
        "/admin/time_challenges/",
      ],
      "/admin/math_missions": ["/admin/math_missions", "/admin/math_missions/"],
      "/dashboard": [
        "/dashboard/timed_challenges",
        "/dashboard/timed_challenges/",
        "/dashboard/math_missions",
        "/dashboard/math_missions/",
      ],
      "/dashboard/practice": ["/dashboard/practice", "/dashboard/practice/"],
    };

    const subMenus = subMenuMatchMap[path] || [];

    const isSubMenu = subMenus.some((subPath) => pathName.startsWith(subPath));

    return exactMatch || isSubMenu;
  };

  const handleLogOut = () => {
    dispatch(logout());
    removeCookie("token");
    router.push("/");
  };

  return (
    <>
      <div>
        <div className="flex items-center justify-center">
          <Image
            src={logo}
            alt="logo"
            width={200}
            height={200}
            className="w-[150px] md:w-[120px] lg:w-[150px]"
          />
        </div>
        <nav className="space-y-4 mt-5">
          {sidebarItems.map((item) => (
            <SidebarItem
              key={item.label}
              icon={item.icon}
              label={item.label}
              href={item.href}
              active={activeMenu(item.href)}
              textColor={item?.color}
            />
          ))}
        </nav>
        <button
          onClick={handleLogOut}
          className="flex gap-3 items-center  font-medium text-base cursor-pointer text-red-500 ml-4 mt-4"
        >
          <LogOut size={18} /> Logout
        </button>
      </div>
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
              : `hover:bg-white/10 ${textColor || "text-white md:text-black"}`
          }
        `}
    >
      {icon}
      <span className="truncate">{label}</span>
    </Link>
  );
}
export default Sidebar;
