"use client";
import { useState } from "react";
import top from "@/assets/images/top.png";
import Image from "next/image";
import { useLeaderBoardQuery } from "@/redux/features/other/other.api";

function LeaderboardComponent() {
  const [selected, setSelected] = useState<string>("Today");


  const { data } = useLeaderBoardQuery([
    { name: "limit", value: 7 },
  ]);

  const players = data?.data?.result || [];

  const topPlayers = players.slice(0, 3);

  const otherPlayers = players.slice(3);

  return (
    <div className="col-span-1 p-5 border border-gray-200 rounded-lg">
      <h1 className="md:text-2xl text-xl font-bold pb-5">User Leaderboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 items-center gap-2 p-5 border border-gray-200 rounded-lg bg-gray-50">
        {["Today", "This Week", "All Time"].map((item, index) => (
          <button
            key={index}
            onClick={() => setSelected(item)}
            className={`px-4 py-2 h-12 rounded-md text-lg font-medium transition-all duration-300 cursor-pointer ${
              selected === item
                ? "bg-gradient-to-b from-[#ff7e5f] to-[#eb3b5a] shadow-[0_6px_0_0_#c2334a] text-white  "
                : "bg-gradient-to-b from-[#ff7f5f25] to-[#eb3b5b7c] shadow-[0_6px_0_0_#eb3b5ba9] hover:brightness-110 text-[#f74a1f] "
            }`}
          >
            {item}
          </button>
        ))}
      </div>
      <div className="relative z-10 p-6 pt-10 w-full">
        {/* Top 3 Players */}
        <div className="flex md:gap-5 gap-2 justify-evenly md:mb-0 mb-2">
          <div className="sm:flex justify-center items-end my-8">
            <div className={`flex flex-col items-center mx-4 `}>
              <div
                className={`relative rounded-full flex items-center justify-center mb-2 md:w-24 w-12 md:h-24 h-12`}
              >
                <Image
                  width={400}
                  height={400}
                  src={topPlayers[1]?.avatar?.imageUrl}
                  alt={topPlayers[1]?.fullName}
                  className="w-full h-full rounded-full object-fill"
                />
              </div>

              <div className="text-center">
                <div className="font-semibold text-sm">
                  {topPlayers[1]?.fullName}
                </div>
                <div className="text-xs opacity-80">
                  Level: {topPlayers[1]?.level} | Coin: {topPlayers[1]?.point}
                </div>
              </div>
            </div>
          </div>

          <div className="sm:flex justify-center items-end md:mb-28">
            <div className={`flex flex-col items-center mx-4 `}>
              <div className="mb-2">
                <Image
                  width={400}
                  height={400}
                  src={top}
                  alt={topPlayers[0]?.fullName}
                  className="w-12 object-cover"
                />
              </div>

              <div
                className={`relative rounded-full flex items-center justify-center mb-2 md:w-28 w-16 md:h-28 h-16`}
              >
                <Image
                  width={400}
                  height={400}
                  src={topPlayers[0]?.avatar?.imageUrl}
                  alt={topPlayers[0]?.fullName}
                  className="w-full h-full rounded-full object-fill"
                />
              </div>

              <div className="text-center">
                <div className="font-semibold text-sm">
                  {topPlayers[0]?.fullName}
                </div>
                <div className="text-xs opacity-80">
                  Level: {topPlayers[0]?.level} | Coin: {topPlayers[0]?.point}
                </div>
              </div>
            </div>
          </div>

          <div className="sm:flex justify-center items-end my-8">
            <div className={`flex flex-col items-center mx-4 `}>
              <div
                className={`relative rounded-full flex items-center justify-center mb-2 md:w-24 w-12 md:h-24 h-12`}
              >
                <Image
                  width={400}
                  height={400}
                  src={topPlayers[2]?.avatar?.imageUrl}
                  alt={topPlayers[2]?.fullName}
                  className="w-full h-full rounded-full object-fill"
                />
              </div>

              <div className="text-center">
                <div className="font-semibold text-sm">
                  {topPlayers[2]?.fullName}
                </div>
                <div className="text-xs opacity-80">
                  Level: {topPlayers[2]?.level} | Coin: {topPlayers[2]?.point}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Leaderboard Panel */}
        <div className="bg-white/95 space-y-4 backdrop-blur-sm rounded-3xl p-6 mx-4 shadow-2xl w-full">
          {otherPlayers.map((entry: any, index: number) => (
            <div key={entry.rank} className="bg-white p-4 rounded-xl ">
              <div className="flex items-center justify-between ">
                <div className="flex gap-3">
                  <Image
                    width={400}
                    height={400}
                    src={entry?.avatar?.imageUrl}
                    alt={entry?.fullName}
                    className="w-14 h-14 rounded-full object-fill"
                  />
                  <div>
                    <div className="font-semibold text-gray-800 text-lg">
                      {entry?.fullName}
                    </div>
                    <p className="text-gray-500 text-sm">
                      Level: {entry?.level} | Coin: {entry?.point}
                    </p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-2xl font-bold text-gray-800 mr-2">
                    #{index + 4}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}

export default LeaderboardComponent;
