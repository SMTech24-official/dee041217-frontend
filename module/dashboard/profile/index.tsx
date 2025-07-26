"use client";
import Link from "next/link";
import Image from "next/image";
import profile from "@/assets/images/profile.png";
import { ClockPlus, Calculator, Archive } from "lucide-react";


function ProfileComponent() {
  const levelBadges = [
    {
      level: 1,
      unlocked: true,
    },
    {
      level: 2,
      unlocked: false,
    },
    {
      level: 3,
      unlocked: false,
    },
    {
      level: 4,
      unlocked: false,
    },
    {
      level: 5,
      unlocked: false,
    },
    {
      level: 6,
      unlocked: false,
    },
    {
      level: 7,
      unlocked: false,
    },
  ];
  const gradients = [
    "#22c55e", // green-500
    "#3b82f6", // blue-500
    "#f97316", // orange-500
    "#e11d48", // rose-600
    "#a855f7", // purple-500
    "#0ea5e9", // sky-500
    "#facc15", // yellow-400
    "#14b8a6", // teal-500
    "#8b5cf6", // violet-500
    "#f43f5e", // pink-500
    "#ec4899", // fuchsia-500
    "#10b981", // emerald-500
    "#6366f1", // indigo-500
    "#84cc16", // lime-500
    "#eab308", // amber-500
    "#06b6d4", // cyan-500
    "#d946ef", // purple-400
    "#f59e0b", // orange-400
    "#0f766e", // teal-700
    "#1e3a8a", // blue-900
  ];

  return (
    <div className="w-full xl:w-7/12 mx-auto p-5  flex items-center justify-center flex-col gap-5 md:gap-10">
      <div className="flex items-center justify-center bg-gradient-to-b from-[#36d1dc] to-[#1e90b7] shadow-[0_6px_0_0_#157a9c] rounded-full p-2 w-44 h-44">
        <Image src={profile} alt="profile" width={100} height={100} />
      </div>
      <div className="backdrop-blur-sm w-full">
        <div className="relative h-10 bg-white/30 rounded-full overflow-hidden">
          <div
            className="absolute left-0 top-0 h-full bg-gradient-to-r from-orange-400 to-red-500 rounded-full transition-all duration-500"
            style={{ width: "93.75%" }}
          />
          <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-xl text-white font-semibold">
            Next Level
          </span>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 w-full">
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
      <div className="bg-white/95 backdrop-blur-sm rounded-3xl p-6 mx-4 shadow-2xl w-full">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Level Badges</h2>
        <div className="flex justify-between flex-wrap items-center">
          {levelBadges.map((badge, index) => {
            const gradient = gradients[index % gradients.length];
            return (
              <div key={badge.level} className="flex flex-col items-center">
                <div className="relative">
                  <svg
                    width="92"
                    height="96"
                    viewBox="0 0 92 96"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M38.2674 5.80914C41.1019 3.06702 42.5192 1.69596 44.1432 1.18016C45.5723 0.726251 47.107 0.726251 48.5362 1.18016C50.1602 1.69596 51.5775 3.06702 54.412 5.80914L54.7054 6.09301C56.2023 7.54115 56.9508 8.26521 57.8267 8.73921C58.6026 9.15909 59.4486 9.43396 60.3231 9.55033C61.3103 9.68169 62.3414 9.53585 64.4037 9.24416L64.8079 9.18698C68.7129 8.63465 70.6653 8.35848 72.2824 8.89576C73.7054 9.36858 74.947 10.2706 75.8364 11.4779C76.847 12.8498 77.1877 14.792 77.8691 18.6765L77.9397 19.0787C78.2995 21.1301 78.4795 22.1558 78.9095 23.0541C79.2904 23.8499 79.8132 24.5695 80.4523 25.1777C81.1738 25.8642 82.0937 26.3523 83.9335 27.3285L84.2942 27.5198C87.778 29.3682 89.5199 30.2925 90.5123 31.6776C91.3856 32.8965 91.8599 34.3561 91.8698 35.8556C91.8811 37.5595 91.0151 39.3311 89.2831 42.8742L89.1038 43.241C88.1891 45.1122 87.7318 46.0478 87.5517 47.0273C87.3921 47.8949 87.3921 48.7844 87.5517 49.6521C87.7318 50.6316 88.1891 51.5672 89.1038 53.4384L89.2831 53.8051C91.0151 57.3483 91.8811 59.1199 91.8698 60.8238C91.8599 62.3233 91.3856 63.7828 90.5123 65.0018C89.5199 66.3869 87.778 67.3111 84.2942 69.1596L83.9335 69.3509C82.0937 70.3271 81.1738 70.8152 80.4523 71.5017C79.8132 72.1099 79.2904 72.8295 78.9095 73.6252C78.4795 74.5236 78.2995 75.5493 77.9397 77.6007L77.8691 78.0028C77.1877 81.8874 76.847 83.8296 75.8364 85.2015C74.947 86.4087 73.7054 87.3108 72.2824 87.7836C70.6653 88.3209 68.7128 88.0447 64.8079 87.4924L64.4037 87.4352C62.3414 87.1435 61.3103 86.9977 60.3231 87.129C59.4486 87.2454 58.6026 87.5203 57.8267 87.9402C56.9508 88.4142 56.2023 89.1382 54.7054 90.5864L54.412 90.8702C51.5775 93.6124 50.1602 94.9834 48.5362 95.4992C47.107 95.9531 45.5723 95.9531 44.1432 95.4992C42.5192 94.9834 41.1019 93.6124 38.2674 90.8702L37.974 90.5864C36.477 89.1382 35.7286 88.4142 34.8527 87.9402C34.0768 87.5203 33.2308 87.2454 32.3563 87.129C31.3691 86.9977 30.338 87.1435 28.2757 87.4352L27.8715 87.4924C23.9665 88.0447 22.014 88.3209 20.397 87.7836C18.974 87.3108 17.7324 86.4087 16.843 85.2015C15.8323 83.8296 15.4916 81.8874 14.8102 78.0028L14.7397 77.6007C14.3799 75.5493 14.1999 74.5236 13.7699 73.6252C13.389 72.8295 12.8662 72.1099 12.2271 71.5017C11.5056 70.8152 10.5857 70.3271 8.74585 69.3509L8.38521 69.1596C4.90138 67.3111 3.15947 66.3869 2.16707 65.0018C1.29374 63.7828 0.819497 62.3233 0.80956 60.8238C0.798267 59.1199 1.66426 57.3483 3.39626 53.8051L3.57556 53.4384C4.49024 51.5672 4.94758 50.6316 5.12771 49.6521C5.28728 48.7844 5.28728 47.8949 5.12771 47.0273C4.94758 46.0478 4.49024 45.1122 3.57556 43.241L3.39626 42.8742C1.66426 39.3311 0.798267 37.5595 0.809559 35.8556C0.819497 34.3561 1.29374 32.8965 2.16707 31.6776C3.15947 30.2925 4.90138 29.3683 8.38521 27.5198L8.74586 27.3285C10.5857 26.3523 11.5056 25.8642 12.2271 25.1777C12.8662 24.5695 13.389 23.8499 13.7699 23.0541C14.1999 22.1558 14.3799 21.1301 14.7397 19.0787L14.8102 18.6765C15.4916 14.792 15.8323 12.8498 16.843 11.4779C17.7324 10.2706 18.974 9.36858 20.397 8.89576C22.014 8.35848 23.9665 8.63465 27.8715 9.18698L28.2757 9.24416C30.338 9.53585 31.3691 9.68169 32.3563 9.55033C33.2308 9.43396 34.0768 9.15909 34.8527 8.73921C35.7286 8.26521 36.477 7.54115 37.974 6.09301L38.2674 5.80914Z"
                      fill={gradient}
                    />
                  </svg>
                  <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 font-black text-white text-lg drop-shadow-lg">
                    {badge.level}
                  </span>
                </div>
                <div className={`font-semibold mt-2`} style={{ color: gradient }}>LEVEL</div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export default ProfileComponent;
