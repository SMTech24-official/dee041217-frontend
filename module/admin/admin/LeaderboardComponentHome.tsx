"use client";
import top from "@/assets/images/top.png";
import profile from "@/assets/images/leader_2.png";
import profile_1 from "@/assets/images/leader.png";
import profile_2 from "@/assets/images/leader_1.png";
import Image from "next/image";
import Link from "next/link";
import ReactChart from "./ReactChart";

function LeaderboardComponentHome() {
  const topPlayers = [
    {
      id: 2,
      name: "Floyd Miles",
      level: 22,
      coins: 2000,
      avatar: profile_1,
      position: 2,
    },
    {
      id: 1,
      name: "Pasztor Kira",
      level: 22,
      coins: 3000,
      avatar: profile,
      position: 1,
    },
    {
      id: 3,
      name: "Theresa Webb",
      level: 22,
      coins: 2000,
      avatar: profile_2,
      position: 3,
    },
  ];
  return (
    <div className="col-span-1 p-5 border border-gray-200 rounded-lg">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold pb-5">Top Users</h1>
        <Link href="/admin/users_information" className="text-green-600 text-2xl hover:underline">
          See All
        </Link>
      </div>
      <div className="sm:flex justify-center items-end my-8">
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
              className={`relative rounded-full flex items-center justify-center mb-2 ${
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

            <div className="text-center">
              <div className="font-semibold text-sm">{player.name}</div>
              <div className="text-xs opacity-80">
                Level: {player.level} | Coin: {player.coins}
              </div>
            </div>
          </div>
        ))}
      </div>
      <ReactChart />
    </div>
  );
}

export default LeaderboardComponentHome;
