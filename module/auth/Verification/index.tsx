"use client";

import Image from "next/image";
import text from "@/assets/images/auth_text.png";
import { useForm, Controller } from "react-hook-form";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import {
  useSendOtpMutation,
  useVerifyOtpMutation,
} from "@/redux/features/auth/authApi";

const formSchema = z.object({
  code: z.string().min(4, "Verification code must be 6 characters"),
});

type FormData = z.infer<typeof formSchema>;

function VerificationComponent() {
  const router = useRouter();
  const email = useSearchParams().get("email");
  const type = useSearchParams().get("type");
  const [verify] = useVerifyOtpMutation();
  const [reSendOtp] = useSendOtpMutation();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      code: "",
    },
  });

  const onSubmit = async (data: FormData) => {
    const toastId = toast.loading("Verifying...");

    const code = parseInt(data.code);

    try {
      await verify({ email: email!, otp: code }).unwrap();

      toast.success("Verification success", { id: toastId });

      if (type === "forgot") {
        router.push(`/reset_password?email=${email}`);
      } else {
        router.push("/login");
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to Verify", { id: toastId });
    }
  };

  const handleReSubmit = async () => {
    const toastId = toast.loading("Resending...");

    try {
      await reSendOtp({ email: email! }).unwrap();

      toast.success("Resend success", { id: toastId });
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to Resend", { id: toastId });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center w-full pt-12 gap-5 px-4 h-screen">
      <Image
        src={text}
        alt="auth_text"
        width={360}
        height={100}
        className="w-[300px] md:w-[220px] lg:w-[360px]"
      />

      <h1 className="text-2xl md:text-5xl font-bold text-shadow-xl text-shadow-[0_6px_0_0_#157a9c]">
        Enter Verification Code
      </h1>
      <p className="text-center text-base  max-w-md">
        Please check your email and enter the 4-digit verification code we sent.
      </p>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm flex flex-col items-center gap-6"
      >
        <Controller
          name="code"
          control={control}
          render={({ field }) => (
            <InputOTP
              maxLength={6}
              value={field.value}
              onChange={field.onChange}
            >
              <InputOTPGroup className="w-full flex gap-2">
                <InputOTPSlot
                  index={0}
                  className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-[#ff7e5f] rounded-xl text-xl text-center bg-white text-black"
                />
                <InputOTPSlot
                  index={1}
                  className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-[#ff7e5f] rounded-xl text-xl text-center bg-white text-black"
                />
                <InputOTPSlot
                  index={2}
                  className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-[#ff7e5f] rounded-xl text-xl text-center bg-white text-black"
                />
                <InputOTPSlot
                  index={3}
                  className="w-12 h-12 sm:w-14 sm:h-14 border-2 border-[#ff7e5f] rounded-xl text-xl text-center bg-white text-black"
                />
              </InputOTPGroup>
            </InputOTP>
          )}
        />
        {errors.code && (
          <p className="text-red-500 text-sm -mt-4 ">{errors.code.message}</p>
        )}

        <Button
          type="submit"
          className="w-full h-16 md:h-14 rounded-full text-lg font-bold text-white
                 bg-gradient-to-b from-[#36d1dc] to-[#1e90b7]
                shadow-[0_6px_0_0_#157a9c] hover:brightness-110 transition-all duration-300 cursor-pointer"
        >
          Apply Code
        </Button>
        <Button
          type="button"
          className="w-full h-16 md:h-14 rounded-full text-lg font-bold text-white
                bg-gradient-to-b from-[#ff7e5f] to-[#eb3b5a]
                shadow-[0_6px_0_0_#c2334a] hover:brightness-110 transition-all duration-300 cursor-pointer"
          onClick={handleReSubmit}
        >
          Send Email Again
        </Button>
      </form>
    </div>
  );
}

export default VerificationComponent;
