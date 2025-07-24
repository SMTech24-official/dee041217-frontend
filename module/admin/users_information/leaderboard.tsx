"use client";
import { useState } from "react";
import top from "@/assets/images/top.png";
import profile from "@/assets/images/leader_2.png";
import profile_1 from "@/assets/images/leader.png";
import profile_2 from "@/assets/images/leader_1.png";
import leader_down from "@/assets/icons/leader_down.png";
import Image from "next/image";

function LeaderboardComponent() {
  const [selected, setSelected] = useState<string>("Today");
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
  const users = [
    {
      id: "1",
      name: "John Doe",
      level: 18,
      coins: 1500,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      position: 1,
    },
    {
      id: "2",
      name: "Jane Smith",
      level: 20,
      coins: 1800,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      position: 2,
    },
    {
      id: "3",
      name: "Theresa Webb",
      level: 22,
      coins: 2000,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      position: 3,
    },
    {
      id: "4",
      name: "Robert Johnson",
      level: 15,
      coins: 1200,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      position: 4,
    },
    {
      id: "5",
      name: "Emily Davis",
      level: 25,
      coins: 2500,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      position: 5,
    },
    {
      id: "6",
      name: "Michael Wilson",
      level: 12,
      coins: 900,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      position: 6,
    },
    {
      id: "7",
      name: "Sarah Brown",
      level: 19,
      coins: 1700,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      position: 7,
    },
    {
      id: "8",
      name: "David Taylor",
      level: 21,
      coins: 1900,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      position: 8,
    },
    {
      id: "9",
      name: "Jessica Anderson",
      level: 17,
      coins: 1400,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      position: 9,
    },
    {
      id: "10",
      name: "Thomas Martinez",
      level: 23,
      coins: 2100,
      avatar:
        "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8dXNlcnxlbnwwfHwwfHx8MA%3D%3D",
      position: 10,
    },
  ];
  return (
    <div className="col-span-1 p-5 border border-gray-200 rounded-lg">
      <h1 className="text-2xl font-bold pb-5">User Leaderboard</h1>
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
      <div className="flex justify-center items-end my-8">
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
      <div className="space-y-2 max-h-[300px] overflow-y-auto custom-scrollbar">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between gap-2 border border-gray-200 rounded-2xl p-2 bg-gray-50 cursor-pointer"
          >
            <div className="flex items-center gap-2">
              <div className="w-12 h-12 rounded-full overflow-hidden">
                <Image
                  width={400}
                  height={400}
                  src={user.avatar}
                  alt={user.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex flex-col">
                <div className="font-semibold">{user.name}</div>
                <div className="text-xs opacity-80">
                  Level: {user.level} | Coin: {user.coins}
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-semibold">#{user.position}</h1>
              <Image
                width={400}
                height={400}
                src={leader_down}
                alt={user.name}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default LeaderboardComponent;
