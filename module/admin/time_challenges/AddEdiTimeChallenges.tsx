"use client";
import { Form, Input, Modal } from "antd";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Challenge } from ".";
import { toast } from "sonner";
import { useAddTimeMissionMutation, useUpdateTimeMissionMutation } from "@/redux/features/dashboard/dashboard.api";
interface Props {
  open: Challenge | string;
  setOpen: (open: Challenge | string) => void;
}
function AddEdiTimeChallenges({ open, setOpen }: Props) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [update] = useUpdateTimeMissionMutation();
  const [add] = useAddTimeMissionMutation();

  const handleAddEditUser = async (values: any) => {
    const toastId = toast.loading("Updating...");
    setIsLoading(true);

    try {
      if (open === "add") {
        await add({
          title: values.title,
          totalPoints: parseInt(values.totalPoints),
        }).unwrap();
      } else {
        await update({
          id: (open as Challenge).id,
          data: {
            title: values.title,
            totalPoints: parseInt(values.totalPoints),
          },
        }).unwrap();
      }

      toast.success(
        `Mission ${
          typeof open === "object" ? "updated" : "added"
        } successfully`,
        { id: toastId }
      );

      setIsLoading(false);
      setOpen("");

      form.resetFields();
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to update", { id: toastId });
    }
  };

  useEffect(() => {
    if (open && (open as Challenge)?.title) {
      form.setFieldsValue({ title: (open as Challenge)?.title });
    }
    if (open && (open as Challenge)?.timeLimit) {
      form.setFieldsValue({ timeLimit: (open as Challenge)?.timeLimit });
    }
    if (open && (open as Challenge)?.totalPoints) {
      form.setFieldsValue({ totalPoints: (open as Challenge)?.totalPoints });
    }
  }, [open]);

  return (
    <Modal
      title={
        <h2 className="text-xl font-semibold text-green-500">
          Add New Time Challenge
        </h2>
      }
      open={!!open}
      onCancel={() => {
        setOpen("");
        form.resetFields();
      }}
      centered
      width={600}
      footer={null}
    >
      <Form onFinish={handleAddEditUser} layout="vertical" form={form}>
        <Form.Item
          name="title"
          label={<h2 className="text-lg font-semibold">Challenge Name</h2>}
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Enter challenge name" className="h-12" />
        </Form.Item>
        <Form.Item
          name="timeLimit"
          label={<h2 className="text-lg font-semibold">Challenge Time</h2>}
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input placeholder="Enter challenge time" className="h-12" />
        </Form.Item>
        <Form.Item
          name="totalPoints"
          label={<h2 className="text-lg font-semibold">Challenge Points</h2>}
          rules={[{ required: true, message: "Please input your name!" }]}
        >
          <Input
            placeholder="Enter challenge points"
            className="h-12"
            type="number"
          />
        </Form.Item>
        <button
          type="submit"
          className={`w-full h-[50px] px-6 rounded-[10px] transition-all duration-300 ease-in-out font-semibold text-white flex items-center justify-center shadow-[0_6px_0_0_rgba(34,197,94,0.5)] bg-gradient-to-b from-[#4ade80] to-[#22c55e] hover:brightness-110 text-lg ${
            isLoading ? "cursor-not-allowed" : "cursor-pointer"
          }`}
          disabled={isLoading}
        >
          {isLoading ? (
            <span className="flex items-center gap-2">
              <Loader className="w-6 h-6 animate-spin" />
              Loading...
            </span>
          ) : (
            "Add Time Challenge"
          )}
        </button>
      </Form>
    </Modal>
  );
}

export default AddEdiTimeChallenges;
