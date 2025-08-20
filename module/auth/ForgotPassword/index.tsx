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
import { toast } from "sonner";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader } from "lucide-react";
import { useSendOtpMutation } from "@/redux/features/auth/authApi";
const formSchema = z.object({
  email: z.string().email("Invalid email address"),
});
const ForgotPasswordComponent = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [reSendOtp] = useSendOtpMutation();
  const router = useRouter();
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Processing...");

    try {
      await reSendOtp(data).unwrap();

      toast.success("Process success", { id: toastId });

      router.push(`/verification?email=${data.email}&type=forgot`);
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to Process", { id: toastId });
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
        Forgot Password
      </h1>
      <p>Enter your email here. Give valid email to reset your password</p>

      <div className="w-full md:w-xl mx-auto">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-6 w-full max-w-lg mx-auto"
          >
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
                "Send Verification Code"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
};

export default ForgotPasswordComponent;
