"use client";

import { Bell, ChevronLeft, LogOut, Settings, User } from "lucide-react";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

const Headers = () => {
  const pathname = usePathname();
  const router = useRouter();

  const pageTitleMap: Record<string, string> = {
    "/dashboard": "Dashboard",
    "/dashboard/practice": "Practice",
    "/dashboard/leaderboard": "Leaderboard",
    "/dashboard/progress_report": "Progress Report",
    "/dashboard/profile": "Profile",
    "/dashboard/math_missions": "Math Missions",
    "/dashboard/practice/addition": "Addition",
    "/dashboard/practice/subtraction": "Subtraction",
    "/dashboard/practice/multiplication": "Multiplication",
    "/dashboard/practice/division": "Division",

    //admin
    "/admin": "Admin",
    "/admin/math_missions": "Math Missions",
    "/admin/time_challenges": "Time Challenges",
    "/admin/daily_practice": "Daily Practice",
    "/admin/users_information": "Users Information",
    "/admin/subscription": "Subscription",
  };

  let name = pageTitleMap[pathname] || "";
  if (!name) {
    // Handle dynamic question page
    if (pathname.startsWith("/dashboard/math_missions/")) {
      name = "Math Missions";
    } else if (pathname.startsWith("/dashboard/timed_challenges/")) {
      name = "Timed Challenges";
    } else if (pathname.startsWith("/admin/math_missions/")) {
      name = "Math Missions Questions";
    } else if (pathname.startsWith("/admin/time_challenges/")) {
      name = "Time Challenges Questions";
    } else {
      name = "";
    }
  }

  return (
    <div className={`flex items-center justify-between p-4  border-b ${pathname.includes("admin") ? "bg-gray-100 border-gray-100" : "bg-white/10 border-white/10"}`}>
      <div className="flex items-center gap-3">
        {pathname !== "/dashboard" &&
          pathname !== "/dashboard/math_missions" &&
          pathname !== "/admin" && (
            <div
              onClick={() => router.back()}
              className="w-10 h-10 flex items-center justify-center rounded-full bg-white text-green-500 hover:bg-green-500 hover:text-white cursor-pointer transition duration-300"
            >
              <ChevronLeft />
            </div>
          )}
        <div>
          <h1 className={`text-2xl font-bold mb-1 ${pathname.includes("admin") ? "text-green-500" : "text-white"}`}>{name}</h1>
          <p className={` text-sm md:text-base ${pathname.includes("admin") ? "text-green-500" : "text-purple-200"}`}>
            Here Is Your Analytics
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        { !pathname.includes("admin") && (
          <button
            className="bg-green-500/20 rounded-full h-10 w-10 flex items-center justify-center hover:bg-green-500 transition duration-300 cursor-pointer"
            aria-label="User menu"
          >
            <Settings className="h-6 w-6 text-white" />
          </button>
        )}
          <button
            className={`bg-green-500/20 rounded-full h-10 w-10 flex items-center justify-center hover:bg-green-500 transition duration-300 cursor-pointer ${pathname.includes("admin") ? "text-green-500 hover:text-white" : "text-white "}`}
            aria-label="User menu"
          >
            <Bell className="h-6 w-6" />
          </button>

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className={`bg-green-500/20 rounded-full h-10 w-10 flex items-center justify-center hover:bg-green-500 transition duration-300 cursor-pointer ${pathname.includes("admin") ? "text-green-500 hover:text-white" : "text-white"}`}
              aria-label="User menu"
            >
              <User className="h-6 w-6" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56" align="end" forceMount>
            <DropdownMenuLabel>
              <div className="flex flex-col space-y-1">
                <p className="text-sm font-medium leading-none">John Doe</p>
                <p className="text-xs text-muted-foreground">
                  john.doe@example.com
                </p>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer">
              <User className="mr-2 h-4 w-4" />
              Profile Settings
            </DropdownMenuItem>
            <DropdownMenuItem className="cursor-pointer">
              <Settings className="mr-2 h-4 w-4" />
              Account Settings
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-red-600 focus:text-red-600">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default Headers;
