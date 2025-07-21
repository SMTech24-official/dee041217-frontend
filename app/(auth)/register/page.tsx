// app/(auth)/login/page.tsx
"use client";

import Image from "next/image";
import text from "@/assets/images/auth_text.png";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(3, "Full name must be at least 3 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

function RegisterPage() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("✅ Submitted Data:", data);
    setIsLoading(true);
    setTimeout(() => {
      toast.success("Register successful");
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="">
      <div className="flex flex-col items-center justify-center w-full pt-12 gap-5 h-screen">
        <Image
          src={text}
          alt="auth_text"
          width={500}
          height={500}
          className="w-[300px] md:w-[220px] lg:w-[360px]"
        />
        <h1 className="text-2xl md:text-5xl font-bold text-shadow-xl text-shadow-[0_6px_0_0_#157a9c]">
          Create An Account
        </h1>
        <p className="text-lg font-medium mt-1">
          Start your journey in powermath defenders fun way
        </p>
        <div className="w-full md:w-xl mx-auto">
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-6 w-full max-w-lg mx-auto"
            >
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your full name"
                        {...field}
                        className="h-12 bg-white text-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        placeholder="Enter your email"
                        {...field}
                        className="h-12 bg-white text-black"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <div className="relative">
                        <Input
                          type={showPassword ? "text" : "password"}
                          placeholder="Enter your password"
                          {...field}
                          className="h-12 bg-white text-black pr-10 text-lg"
                        />
                        <button
                          type="button"
                          className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500"
                          onClick={() => setShowPassword(!showPassword)}
                          tabIndex={-1} // prevent focus
                        >
                          {showPassword ? (
                            <EyeOff size={20} />
                          ) : (
                            <Eye size={20} />
                          )}
                        </button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <h1>
                By continuing, you confirm that you are 6 years or older and
                agree to our{" "}
                <Link href="/terms" className="text-[#ff7e5f] hover:underline">
                  Terms & Conditions
                </Link>{" "}
                and{" "}
                <Link
                  href="/privacy"
                  className="text-[#ff7e5f] hover:underline"
                >
                  Privacy Policy
                </Link>
                .
              </h1>
              <Button
                type="submit"
                className={`w-full h-16 md:h-14 rounded-full text-lg md:text-base lg:text-lg font-bold text-white
               bg-gradient-to-b from-[#ff7e5f] to-[#eb3b5a]
               shadow-[0_6px_0_0_#c2334a] hover:brightness-110 transition-all duration-300 ${
                 isLoading ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
               }`}
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader className="mr-1 h-12 w-12 animate-spin" />{" "}
                    Loading...
                  </>
                ) : (
                  "Register"
                )}
              </Button>
              <h1 className="text-center text-lg font-medium mt-1">
                Already have an account?{" "}
                <Link href="/login" className="text-[#ff7e5f] hover:underline">
                  Log In
                </Link>
              </h1>
            </form>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default RegisterPage;
