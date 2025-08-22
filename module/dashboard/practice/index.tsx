"use client";

import Image from "next/image";
import group from "@/assets/images/Group.svg";
import group1 from "@/assets/images/Group (1).svg";
import group2 from "@/assets/images/Group (2).svg";
import group3 from "@/assets/images/Group (3).svg";
import { Play } from "lucide-react";
import Link from "next/link";
import { useAllTopicQuery } from "@/redux/features/other/other.api";
import Spinner from "@/components/common/Spinner";

export default function PracticeComponent() {
  const { data, isFetching } = useAllTopicQuery(undefined);

  const flattedData = data?.data?.filter(
    (item: any) => item.title !== "General"
  );

  const categories = flattedData?.map((item: any) => {
    return {
      id: item.id,
      title: item.title,
      description: item.description,
      icon:
        item.title === "Division"
          ? group3
          : item.title === "Multiplication"
          ? group2
          : item.title === "Subtraction"
          ? group1
          : group,
      color:
        item.title === "Division"
          ? "from-emerald-50 to-green-50"
          : item.title === "Multiplication"
          ? "from-amber-50 to-orange-50"
          : item.title === "Subtraction"
          ? "from-orange-50 to-red-50"
          : "from-cyan-50 to-cyan-50",
      iconBg:
        item.title === "Division"
          ? "bg-green-500"
          : item.title === "Multiplication"
          ? "bg-orange-500"
          : item.title === "Subtraction"
          ? "bg-red-500"
          : "bg-cyan-500",
      playColor:
        item.title === "Division"
          ? "text-green-500"
          : item.title === "Multiplication"
          ? "text-orange-500"
          : item.title === "Subtraction"
          ? "text-red-500"
          : "text-cyan-500",
      shadowColor:
        item.title === "Division"
          ? "#22c55e"
          : item.title === "Multiplication"
          ? "#f97316"
          : item.title === "Subtraction"
          ? "#ef4444"
          : "#06b6d4",
    };
  });

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <div className="w-full md:w-7/12 mx-auto p-5 h-full flex items-center justify-center flex-col gap-5 md:gap-10 mt-10">
      {categories.map((category: any) => {
        return (
          <div
            key={category.id}
            className={`bg-gradient-to-r ${category.color} border-0 transition-all duration-300 cursor-pointer rounded-3xl overflow-hidden hover:brightness-110 w-full`}
            style={{
              boxShadow: `0 6px 0 0 ${category.shadowColor}`,
            }}
          >
            <Link
              href={{
                pathname: `/dashboard/practice/${category.id}`,
                query: { name: `${category.title}` },
              }}
              className="flex items-center justify-between p-6"
            >
              <div className="flex items-center gap-4">
                <Image src={category.icon} alt="icon" width={50} height={50} />
                <div>
                  <h3 className="text-xl font-bold text-black mb-1">
                    {category.title}
                  </h3>
                  <p className="text-sm text-black leading-relaxed">
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
