import React from "react";
import Image from "next/image";
import { Archive, Calculator, ClockPlus, Play } from "lucide-react";

import mathBlue from "@/assets/icons/bialy_mission_1.png";
import mathGreen from "@/assets/icons/bialy_mission_2.png";
import mathRed from "@/assets/icons/bialy_mission_3.png";
import mathYellow from "@/assets/icons/bialy_mission_4.png";
import Link from "next/link";

function DashboardHomeComponent() {
  const dailyMissionData = [
    {
      id: 1,
      title: "Solve 05 Math Questions",
      limit: 5,
      description: "By PowerMath Defenders",
      icon: mathGreen,
      color:
        "from-green-50 to-green-50 hover:from-green-200 hover:to-green-100",
      iconBg: "text-green-500",
      rewards: "500",
      time: "10:00",
      shadowColor: "shadow-[0_6px_0_0_rgba(34,197,94,0.2)]",
    },
    {
      id: 2,
      title: "Solve 10 Math Questions",
      limit: 10,
      description: "By PowerMath Defenders",
      icon: mathBlue,
      color: "from-blue-50 to-blue-50 hover:from-blue-200 hover:to-blue-100",
      iconBg: "text-blue-500",
      rewards: "500",
      time: "10:00",
      shadowColor: "shadow-[0_6px_0_0_rgba(21,122,156,0.2)]",
    },
    {
      id: 3,
      title: "Solve 15 Math Questions",
      limit: 15,
      description: "By PowerMath Defenders",
      icon: mathRed,
      color: "from-red-50 to-red-50 hover:from-red-200 hover:to-red-100",
      iconBg: "text-red-500",
      rewards: "500",
      time: "10:00",
      shadowColor: "shadow-[0_6px_0_0_rgba(239,68,68,0.2)]",
    },
    {
      id: 4,
      title: "Solve 20 Math Questions",
      limit: 20,
      description: "By PowerMath Defenders",
      icon: mathYellow,
      color:
        "from-yellow-50 to-yellow-50 hover:from-yellow-200 hover:to-yellow-100",
      iconBg: "text-yellow-500",
      rewards: "500",
      time: "10:00",
      shadowColor: "shadow-[0_6px_0_0_rgba(249,115,22,0.2)]",
    },
  ];

  return (
    <div className="max-w-5xl mx-auto w-full space-y-5 h-[calc(100vh-12rem)]">
      {/* Top Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-6">
        {/* Timed Challenges */}
        <Link
          href="/dashboard/timed_challenges"
          className="w-full h-40 rounded-xl flex flex-col items-center justify-center gap-3 text-white font-bold text-lg bg-gradient-to-b from-green-400 to-green-500 shadow-[0_6px_0_0_rgba(34,197,94,0.5)] hover:brightness-110 transition-all duration-300 cursor-pointer"
        >
          <ClockPlus className="w-14 h-14" />
          <h1 className="text-xl text-center px-16">Timed Challenges</h1>
        </Link>

        {/* Math Missions */}
        <Link
          href="/dashboard/math_missions"
          className="w-full h-40 rounded-xl flex flex-col items-center justify-center gap-3 text-white font-bold text-lg bg-gradient-to-b from-[#36d1dc] to-[#1e90b7] shadow-[0_6px_0_0_#157a9c] hover:brightness-110 transition-all duration-300 cursor-pointer"
        >
          <Calculator className="w-14 h-14" />
          <h1 className="text-xl text-center px-16">Math Missions</h1>
        </Link>

        {/* Rewards */}
        <div className="w-full h-40 rounded-xl flex flex-col items-center justify-center gap-3 text-white font-bold text-lg bg-gradient-to-b from-[#ff7e5f] to-[#eb3b5a] shadow-[0_6px_0_0_#c2334a] hover:brightness-110 transition-all duration-300 cursor-pointer">
          <Archive className="w-14 h-14" />
          <h1 className="text-xl text-center px-16">Rewards</h1>
        </div>
      </div>

      {/* Daily Challenges Section */}
      <div className="bg-white rounded-4xl mb-6">
        <h1 className="text-2xl font-bold text-black/80 p-6">
          Daily Challenge
        </h1>
        <div className="p-5 space-y-4">
          {dailyMissionData.map((mission) => (
            <Link 
            href={`/dashboard/random?limit=${mission.limit}`}
              key={mission.id}
              className={`p-6 bg-gradient-to-r ${mission.color} ${mission.shadowColor} rounded-3xl flex items-center justify-between transition-all duration-300 cursor-pointer`}
            >
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded bg-white flex items-center justify-center p-1">
                  <Image
                    src={mission.icon}
                    alt={mission.title}
                    width={50}
                    height={50}
                  />
                </div>
                <div>
                  <h1 className="text-lg font-bold text-black/80">
                    {mission.title}
                  </h1>
                  <p className="text-sm text-black/60">{mission.description}</p>
                </div>
              </div>
              <div className={`${mission.iconBg}`}>
                <Play className="h-8 w-8 fill-current" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default DashboardHomeComponent;
