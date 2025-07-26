"use client";

import Sidebar from "@/sheard/Sidebar";
import Headers from "@/sheard/Headers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Desktop Sidebar */}
      <aside className="hidden md:flex md:w-64 flex-col justify-between bg-gray-100 p-6 border-r border-gray-100">
        <Sidebar/>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        {/* Topbar */}
        <Headers />
        <div className="overflow-y-auto p-5">{children}</div>
      </main>
    </div>
  );
}
