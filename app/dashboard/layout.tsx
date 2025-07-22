"use client";

import { useState } from "react";
import Image from "next/image";
import logo from "@/assets/images/auth_text.png";
import Sidebar from "@/sheard/Sidebar";
import { Button } from "@/components/ui/button";
import { Sheet, SheetTrigger, SheetContent } from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import Headers from "@/sheard/Headers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Mobile Navbar */}
      <div className="md:hidden p-4 flex justify-between items-center bg-[#25174B]">
        <Image
          src={logo}
          alt="logo"
          width={150}
          height={60}
          className="w-[150px]"
        />
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="text-white" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="bg-[#25174B] w-64 p-6 border-r border-white/10"
          >
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col justify-between bg-white/10 p-6 border-r border-white/10">
        <Sidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Topbar */}
        <Headers />
        <div className="overflow-y-auto scroll-none">{children}</div>
      </main>
    </div>
  );
}
