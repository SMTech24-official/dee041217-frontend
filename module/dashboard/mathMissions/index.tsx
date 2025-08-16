"use client";
import Image from "next/image";
import avatar_1 from "@/assets/images/math_1.png";
import avatar_2 from "@/assets/images/math_2.png";
import avatar_3 from "@/assets/images/math_3.png";
import avatar_4 from "@/assets/images/math_4.png";
import { Check, Lock } from "lucide-react";
import { useRouter } from "next/navigation";
import {
  useMathMissionQuery,
  useTimeMissionQuery,
} from "@/redux/features/math/math.api";
import Spinner from "@/components/common/Spinner";

function MathMissionsComponent({ type }: { type?: string }) {
  const { data, isFetching } = useMathMissionQuery(undefined);
  const { data: timeData, isFetching: timeFetching } =
    useTimeMissionQuery(undefined);
  const router = useRouter();
  const avatars = [avatar_1, avatar_2, avatar_3, avatar_4];

  const mathMissions = type ? timeData?.data?.result : data?.data?.result;

  // Define only 4 positions that will cycle repeatedly
  const basePlatformPositions = [
    { top: "10%", left: "20%", side: "left" },
    { top: "25%", left: "70%", side: "right" },
    { top: "40%", left: "25%", side: "left" },
    { top: "55%", left: "75%", side: "right" },
  ];

  // Calculate vertical offset for each group of 4 missions
  const getPositionForMission = (index: number) => {
    const positionIndex = index % 4;
    const groupIndex = Math.floor(index / 4);
    const basePosition = basePlatformPositions[positionIndex];
    return {
      top: `${Number.parseFloat(basePosition.top) + groupIndex * 60}%`,
      left: basePosition.left,
      side: basePosition.side,
    };
  };

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className="relative w-full max-w-5xl h-[250vh] mx-auto ">
      <svg className="absolute left-0 top-0 pointer-events-none w-full h-[250vh]">
        {mathMissions?.slice(0, -1).map((mission: any, index: number) => {
          const current = getPositionForMission(index);
          const next = getPositionForMission(index + 1);

          return (
            <line
              key={index}
              x1={current.left}
              y1={current.top}
              x2={next.left}
              y2={next.top}
              stroke="white"
              strokeWidth="4"
              strokeDasharray="20,10"
              opacity="0.8"
            />
          );
        })}
      </svg>

      {/* Mission platforms */}
      {mathMissions?.map((mission: any, index: number) => {
        const position = getPositionForMission(index);
        const avatar = avatars[index % avatars.length];
        // const status = mission.status;

        return (
          <div
            key={mission.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              top: position.top,
              left: position.left,
            }}
          >
            <div className="relative">
              {/* Main crystal platform */}
              <div className="relative w-[200px] h-[200px] md:w-[300px] md:h-[300px]">
                {/* Character avatar */}
                <div className="absolute z-10 top-0 left-1/2 transform -translate-x-1/2">
                  <div
                    onClick={() =>
                      router.push(
                        `/dashboard/${
                          type ? "timed_challenges" : "math_missions"
                        }/${mission.id}`
                      )
                    }
                  >
                    <Image
                      src={avatar || "/placeholder.svg"}
                      alt={mission.title}
                      width={500}
                      height={500}
                      className="drop-shadow-2xl group-hover:scale-110 transition-transform duration-300"
                    />

                    {/* Status indicator */}
                    {/* <div className="absolute top-14 right-0">
                      {status === "completed" && (
                        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center border-2 border-green-500">
                          <Check className="w-8 h-8 text-white" />
                        </div>
                      )}
                      {status === "locked" && (
                        <div className="w-10 h-10 bg-red-500 rounded-full flex items-center justify-center border-2 border-red-500">
                          <Lock className="w-8 h-8 text-white" />
                        </div>
                      )}
                      {status === "available" && (
                        <div className="w-8 h-8 bg-yellow-500 rounded-full animate-pulse border-2 border-yellow-500" />
                      )}
                    </div> */}
                  </div>
                </div>

                {/* Mission title */}
                <div
                  className={`absolute z-50 ${
                    position.side === "left"
                      ? "-right-5 md:right-[20%]"
                      : "-left-5 md:left-[20%]"
                  } top-1/2 `}
                >
                  <div
                    className={`bg-black/80 text-white text-sm font-bold px-4 py-2 rounded-lg backdrop-blur-sm border border-white/20 ${
                      status === "locked" ? "opacity-50" : ""
                    }`}
                  >
                    <div className="whitespace-nowrap">
                      {mission.title.toUpperCase()}
                    </div>
                    {/* Arrow pointing to platform */}
                    <div
                      className={`absolute top-1/2 transform -translate-y-1/2 ${
                        position.side === "left" ? "-left-2" : "-right-2"
                      }`}
                    >
                      <div
                        className={`w-0 h-0 border-t-4 border-b-4 border-transparent ${
                          position.side === "left"
                            ? "border-r-4 border-r-black/80"
                            : "border-l-4 border-l-black/80"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default MathMissionsComponent;
