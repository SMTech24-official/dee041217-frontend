"use client";

import Image from "next/image";
import text from "@/assets/images/auth_text.png";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
const formSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

type FormValues = z.infer<typeof formSchema>;

function ResetPasswordComponent() {
  const router = useRouter();
  const email = useSearchParams().get("email");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showPassword, setShowPassword] = useState<{
    newPassword: boolean;
    confirmPassword: boolean;
  }>({
    newPassword: false,
    confirmPassword: false,
  });
  const [reset] = useResetPasswordMutation();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: FormValues) => {
    const toastId = toast.loading("Reseating...");

    if (data.newPassword !== data.confirmPassword) {
      return toast.error("Wrong Confirm Password", { id: toastId });
    }

    try {
      await reset({ email: email!, password: data.confirmPassword }).unwrap();

      toast.success("Reset success", { id: toastId });

      router.push("/login");
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to Reset", { id: toastId });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full pt-12 gap-5 h-screen">
      <Image
        src={text}
        alt="auth_text"
        width={500}
        height={500}
        className="w-[300px] md:w-[220px] lg:w-[360px]"
      />
      <h1 className="text-2xl md:text-5xl font-bold text-shadow-xl text-shadow-[0_6px_0_0_#157a9c]">
        Reset Password
      </h1>
      <p>Please enter your new password and confirm it below.</p>

      <div className="w-full md:w-xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-lg mx-auto"
          >
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={showPassword.newPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        {...field}
                        className="h-12 bg-white text-black pr-10 text-lg"
                      />
                      <button
                        type="button"
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            newPassword: !showPassword.newPassword,
                          })
                        }
                        tabIndex={-1} // prevent focus
                      >
                        {showPassword.newPassword ? (
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
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={
                          showPassword.confirmPassword ? "text" : "password"
                        }
                        placeholder="Enter your password"
                        {...field}
                        className="h-12 bg-white text-black pr-10 text-lg"
                      />
                      <button
                        type="button"
                        className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 cursor-pointer"
                        onClick={() =>
                          setShowPassword({
                            ...showPassword,
                            confirmPassword: !showPassword.confirmPassword,
                          })
                        }
                        tabIndex={-1} // prevent focus
                      >
                        {showPassword.confirmPassword ? (
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

            <Button
              type="submit"
              className={`w-full h-16 md:h-14 rounded-full text-lg md:text-base lg:text-lg font-bold text-white
                 bg-gradient-to-b from-[#ff7e5f] to-[#eb3b5a]
                 shadow-[0_6px_0_0_#c2334a] hover:brightness-110 transition-all duration-300 ${
                   isLoading
                     ? "opacity-50 cursor-not-allowed"
                     : "cursor-pointer"
                 }`}
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <Loader className="mr-1 h-12 w-12 animate-spin" /> Loading...
                </>
              ) : (
                "Change Password"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}

export default ResetPasswordComponent;
