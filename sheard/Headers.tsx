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
  };

  const name = pageTitleMap[pathname] || "";

  return (
    <div className="flex items-center justify-between border-b border-white/10 p-4 bg-white/10">
      <div className="flex items-center gap-3">
        {pathname !== "/dashboard" && (
          <div
            onClick={() => router.back()}
            className="w-10 h-10 flex items-center justify-center rounded-full bg-white hover-white/20 cursor-pointer transition duration-300"
          >
            <ChevronLeft style={{ color: "green" }} />
          </div>
        )}
        <div>
          <h1 className="text-white text-2xl font-bold mb-1">{name}</h1>
          <p className="text-purple-200 text-sm md:text-base">
            Here Is Your Analytics
          </p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {[Settings, Bell].map((Icon, idx) => (
          <button
            key={idx}
            className="bg-green-500/20 rounded-full h-10 w-10 flex items-center justify-center hover:bg-green-500 transition duration-300 cursor-pointer"
            aria-label={Icon.name}
          >
            <Icon className="h-6 w-6 text-white" />
          </button>
        ))}

        {/* Profile Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="bg-green-500/20 rounded-full h-10 w-10 flex items-center justify-center hover:bg-green-500 transition duration-300 cursor-pointer"
              aria-label="User menu"
            >
              <User className="h-6 w-6 text-white" />
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
