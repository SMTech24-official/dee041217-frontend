"use client";

import Image from "next/image";
import top from "@/assets/images/top.png";
import { useLeaderBoardQuery } from "@/redux/features/other/other.api";
import Spinner from "@/components/common/Spinner";
import { useState } from "react";
import Pagination from "@/components/common/MyPagination";

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
        <div className="flex md:gap-5 gap-2 justify-evenly md:mb-0 mb-2">
          <div className="sm:flex justify-center items-end my-8">
            <div className={`flex flex-col items-center mx-4 `}>
              <div
                className={`relative rounded-full flex items-center justify-center mb-2 md:w-40 w-12 md:h-40 h-12`}
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
                  className="w-20 object-cover"
                />
              </div>

              <div
                className={`relative rounded-full flex items-center justify-center mb-2 md:w-40 w-16 md:h-40 h-16`}
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
                className={`relative rounded-full flex items-center justify-center mb-2 md:w-40 w-12 md:h-40 h-12`}
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
