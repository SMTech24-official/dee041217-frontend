"use client";

import Image from "next/image";
import group from "@/assets/images/Group.svg";
import group1 from "@/assets/images/Group (1).svg";
import group2 from "@/assets/images/Group (2).svg";
import group3 from "@/assets/images/Group (3).svg";
import { Play } from "lucide-react";
import Link from "next/link";

export default function PracticeComponent() {
  const categories = [
    {
      id: "addition",
      title: "Addition",
      description:
        "Boost Your Kid's Math Skills with Fun Addition Quizzes and More!",
      icon: group,
      color: "from-cyan-50 to-cyan-50",
      iconBg: "bg-cyan-500",
      playColor: "text-cyan-500",
      shadowColor: "#06b6d4", // cyan-500
    },
    {
      id: "subtraction",
      title: "Subtraction",
      description:
        "Master Subtraction and More with Fun, Interactive Math Quizzes!",
      icon: group1,
      color: "from-orange-50 to-red-50",
      iconBg: "bg-red-500",
      playColor: "text-red-500",
      shadowColor: "#ef4444", // red-500
    },
    {
      id: "multiplication",
      title: "Multiplication",
      description:
        "Supercharge Your Kid's Multiplication Skills with Fun and Engaging Quizzes!",
      icon: group2,
      color: "from-amber-50 to-orange-50",
      iconBg: "bg-orange-500",
      playColor: "text-orange-500",
      shadowColor: "#f97316", // orange-500
    },
    {
      id: "division",
      title: "Division",
      description: "Make Division Fun and Easy with Engaging Math Quizzes!",
      icon: group3,
      color: "from-emerald-50 to-green-50",
      iconBg: "bg-green-500",
      playColor: "text-green-500",
      shadowColor: "#22c55e", // green-500
    },
  ];

  return (
    <div className="w-full md:w-7/12 mx-auto p-5 md:h-[calc(100vh-100px)] flex items-center justify-center flex-col gap-5 md:gap-10">
      {categories.map((category) => {
        return (
          <div
            key={category.id}
            className={`bg-gradient-to-r ${category.color} border-0 transition-all duration-300 cursor-pointer rounded-3xl overflow-hidden hover:brightness-110 w-full`}
            style={{
              boxShadow: `0 6px 0 0 ${category.shadowColor}`,
            }}
          >
            <Link href={`/dashboard/practice/${category.id}`} className="flex items-center justify-between p-6">
              <div className="flex items-center gap-4">
                <Image src={category.icon} alt="icon" width={50} height={50} />
                <div>
                  <h3 className="text-xl font-bold text-black mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-black leading-relaxed max-w-md">
                    {category.description}
                  </p>
                </div>
              </div>
              <div className={`${category.playColor}`}>
                <Play className="h-8 w-8 fill-current" />
              </div>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
