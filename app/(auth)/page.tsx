"use client";
import React from "react";
import text from "@/assets/images/auth_text.png";

import auth from "@/assets/images/auth_full (2).png";
import mobile from "@/assets/images/mobile.png";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

function AuthLayoutPage() {
  const router = useRouter();
  return (
    <div className="relative flex items-end flex-col w-full h-screen container mx-auto">
      <div className="absolute inset-0 w-full flex items-start justify-center pt-16 md:pt-12 lg:pt-16">
        <Image
          src={text}
          alt="auth_text"
          width={500}
          height={500}
          className="w-[300px] md:w-[220px] lg:w-[260px]"
        />
      </div>

      {/* Buttons */}
      <div className="absolute top-56 w-full flex flex-wrap justify-center gap-5 md:top-48 lg:top-56 z-10">
        <Button
          onClick={() => router.push("/login")}
          variant="default"
          className="w-[200px] md:w-[160px] lg:w-[180px] h-16 md:h-14 rounded-full text-lg md:text-base lg:text-lg font-bold text-white
               bg-gradient-to-b from-[#36d1dc] to-[#1e90b7]
               shadow-[0_6px_0_0_#157a9c] hover:brightness-110 transition-all duration-300 cursor-pointer"
        >
          Login
        </Button>

        <Button
          onClick={() => router.push("/register")}
          variant="default"
          className="w-[200px] md:w-[160px] lg:w-[180px] h-16 md:h-14 rounded-full text-lg md:text-base lg:text-lg font-bold text-white
               bg-gradient-to-b from-[#ff7e5f] to-[#eb3b5a]
               shadow-[0_6px_0_0_#c2334a] hover:brightness-110 transition-all duration-300 cursor-pointer"
        >
          Registration
        </Button>

        <Button
          onClick={() => router.push("/parent_login")}
          variant="default"
          className="w-[200px] md:w-[160px] lg:w-[180px] h-16 md:h-14 rounded-full text-lg md:text-base lg:text-lg font-bold text-white
               bg-gradient-to-b from-[#c471f5] to-[#fa71cd]
               shadow-[0_6px_0_0_#aa4bc7] hover:brightness-110 transition-all duration-300 cursor-pointer"
        >
          Parent Login
        </Button>
      </div>
      <div className="w-full h-[100vh] flex items-end">
        {/* Desktop Image (>=1024px) */}
        <div className="hidden md:block w-full">
          <Image
            src={auth}
            alt="auth_desktop"
            width={2000}
            height={2000}
            className="w-full object-fill bg-center h-[100vh] xl:h-fit"
          />
        </div>

        {/* Mobile Image (<1024px) */}
        <div className="block md:hidden w-full">
          <Image
            src={mobile}
            alt="auth_mobile"
            width={2000}
            height={2000}
            className="w-full object-fill h-full"
          />
        </div>
      </div>
    </div>
  );
}

export default AuthLayoutPage;
