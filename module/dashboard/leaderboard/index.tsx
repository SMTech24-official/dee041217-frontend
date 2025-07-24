"use client";

import { Crown, ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import top from "@/assets/images/top.png";
import profile from "@/assets/images/leader_2.png";
import profile_1 from "@/assets/images/leader.png";
import profile_2 from "@/assets/images/leader_1.png";

export default function LeaderboardComponent() {
  const topPlayers = [
    {
      id: 2,
      name: "Floyd Miles",
      level: 22,
      coins: 2000,
      avatar: profile_1,
      bgColor: "bg-purple-500",
      position: 2,
    },
    {
      id: 1,
      name: "Pasztor Kira",
      level: 22,
      coins: 3000,
      avatar: profile,
      bgColor: "bg-yellow-400",
      position: 1,
    },
    {
      id: 3,
      name: "Theresa Webb",
      level: 22,
      coins: 2000,
      avatar: profile_2,
      bgColor: "bg-teal-500",
      position: 3,
    },
  ];

  const leaderboardEntries = [
    { rank: 4, trend: "up" },
    { rank: 5, trend: "down" },
    { rank: 6, trend: "up" },
    { rank: 7, trend: "up" },
  ];

  return (
    <div className="w-full md:w-7/12 mx-auto p-5 md:h-[calc(100vh-100px)] flex items-center justify-center flex-col gap-5 md:gap-10">
      <div className="relative z-10 p-6 pt-20 w-full">
        {/* Top 3 Players */}
        <div className="flex justify-center items-end mb-8">
          {topPlayers.map((player) => (
            <div
              key={player.id}
              className={`flex flex-col items-center mx-4 ${
                player.position === 1 ? "mb-20" : ""
              }`}
            >
              {player.position === 1 && (
                <div className="mb-2">
                  <Image
                    width={400}
                    height={400}
                    src={top}
                    alt={player.name}
                    className="w-full h-full rounded-full object-cover"
                  />
                </div>
              )}

              <div
                className={`relative rounded-full flex items-center justify-center mb-2 shadow-lg ${
                  player.position === 1 ? "w-40 h-44" : "w-32 h-36"
                }`}
              >
                <Image
                  width={400}
                  height={400}
                  src={player.avatar}
                  alt={player.name}
                  className="w-full h-full rounded-full object-fill"
                />
              </div>

              <div className="text-center text-white">
                <div className="font-semibold text-sm">{player.name}</div>
                <div className="text-xs opacity-80">
                  Level: {player.level} | Coin: {player.coins}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Leaderboard Panel */}
        <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 mx-4 shadow-2xl">
          {leaderboardEntries.map((entry, index) => (
            <div key={entry.rank}>
              {entry.rank === 4 && (
                <div className="bg-teal-50 rounded-2xl p-4 mb-4 border-2 border-dashed border-teal-300">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800 text-lg">
                        Darrell Steward
                      </div>
                      <div className="text-teal-600 text-sm">
                        Level: 22 | Coin: 2000
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-800 mr-2">
                        #{entry.rank}
                      </span>
                      <ChevronUp className="w-5 h-5 text-teal-600" />
                    </div>
                  </div>
                </div>
              )}

              {entry.rank !== 4 && (
                <div
                  className={`p-4 rounded-2xl mb-4 ${
                    index % 2 === 1 ? "bg-gray-50" : "bg-white"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800 text-lg">
                        Darrell Steward
                      </div>
                      <div className="text-gray-500 text-sm">
                        Level: 22 | Coin: 2000
                      </div>
                    </div>
                    <div className="flex items-center">
                      <span className="text-2xl font-bold text-gray-800 mr-2">
                        #{entry.rank}
                      </span>
                      {entry.trend === "up" ? (
                        <ChevronUp className="w-5 h-5 text-teal-600" />
                      ) : (
                        <ChevronDown className="w-5 h-5 text-red-500" />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
