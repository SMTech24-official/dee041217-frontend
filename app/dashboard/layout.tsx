"use client";

import Sidebar from "@/sheard/Sidebar";
import background from "@/assets/images/background.png";
import Headers from "@/sheard/Headers";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-screen flex flex-col md:flex-row text-white"
      style={{
        backgroundImage: `url(${background.src})`,
        backgroundAttachment: "fixed",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
      }}
    >
      <aside className="hidden md:flex md:w-64 flex-col justify-between bg-white/10 p-6 border-r border-white/10">
        <Sidebar />
      </aside>

      <main className="flex-1">
        <Headers />
        <div className="">{children}</div>
      </main>
    </div>
  );
}
