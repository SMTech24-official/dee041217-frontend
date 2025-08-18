"use client";

import { Crown, ChevronUp, ChevronDown } from "lucide-react";
import Image from "next/image";
import top from "@/assets/images/top.png";
import profile from "@/assets/images/leader_2.png";
import profile_1 from "@/assets/images/leader.png";
import profile_2 from "@/assets/images/leader_1.png";
import { useLeaderBoardQuery } from "@/redux/features/other/other.api";
import Spinner from "@/components/common/Spinner";
import { useState } from "react";
import Pagination from "@/components/common/Pagination";

export default function LeaderboardComponent() {
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isFetching } = useLeaderBoardQuery([
    { name: "limit", value: 10 },
    { name: "page", value: String(currentPage) },
  ]);

  const players = data?.data?.result || [];

  const topPlayers = players.slice(0, 3);

  const otherPlayers = players.slice(3);

  const metaData = {
    page: data?.data?.page,
    limit: data?.data?.limit,
    total: data?.data?.total,
  };

  if (isFetching) {
    return <Spinner />;
  }
  return (
    <div className="w-full md:w-7/12 mx-auto p-5 mt-48 sm:mt-0 h-full flex items-center justify-center flex-col gap-5 md:gap-10">
      <div className="relative z-10 p-6 pt-10 w-full">
        {/* Top 3 Players */}

        <div className="sm:flex justify-center items-end my-8">
          {topPlayers.map((player: any, idx: number) => (
            <div
              key={player.id}
              className={`flex flex-col items-center mx-4 ${
                idx === 0 ? "mb-20" : ""
              }`}
            >
              {idx === 0 && (
                <div className="mb-2">
                  <Image
                    width={400}
                    height={400}
                    src={top}
                    alt={player.fullName}
                    className="w-20 object-cover"
                  />
                </div>
              )}

              <div
                className={`relative rounded-full flex items-center justify-center mb-2 ${
                  idx === 0 ? "w-44 h-44" : "w-40 h-40"
                }`}
              >
                <Image
                  width={400}
                  height={400}
                  src={player?.avatar?.imageUrl}
                  alt={player.fullName}
                  className="w-full h-full rounded-full object-fill"
                />
              </div>

              <div className="text-center">
                <div className="font-semibold text-sm">{player.fullName}</div>
                <div className="text-xs opacity-80">
                  Level: {player.level} | Coin: {player.point}
                </div>
              </div>
            </div>
          ))}
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
                      Darrell Steward
                    </div>
                    <p className="text-gray-500 text-sm">
                      Level: 22 | Coin: 2000
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
      {metaData?.total > 10 && (
        <Pagination
          currentPage={metaData?.page}
          totalItem={metaData?.total}
          limit={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      )}
    </div>
  );
}
