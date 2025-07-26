"use client";
import { Form, Input, Modal, Select } from "antd";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Subscription } from ".";
import { toast } from "sonner";
interface Props {
  open: Subscription | string;
  setOpen: (open: Subscription | string) => void;
}
function AddEditSubscription({ open, setOpen }: Props) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleAddEditUser = (values: any) => {
    console.log(values);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOpen("");
      toast.success(`Subscription ${typeof open === "object" ? "updated" : "added"} successfully`);
      form.resetFields();
    }, 2000);
  };

  useEffect(() => {
    if (typeof open === "object" && open !== null) {
      console.log(open);
      form.setFieldsValue({
        No: open.No,
        SubscriptionName: open.SubscriptionName,
        Price: open.Price,
        Status: open.Status,
      });
    }
  }, [open]);

  return (
    <Modal
      title={
        <h2 className="text-xl font-semibold text-green-500">
          {typeof open === "object"
            ? "Edit Subscription"
            : "Add New Subscription"}
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
          name="No"
          label={<h2 className="text-lg font-semibold">No</h2>}
          rules={[{ required: true, message: "Please input your no!" }]}
        >
          <Input placeholder="Enter no" className="h-12" />
        </Form.Item>
        <Form.Item
          name="SubscriptionName"
          label={<h2 className="text-lg font-semibold">Subscription Name</h2>}
          rules={[
            { required: true, message: "Please select subscription name!" },
          ]}
        >
          <Input placeholder="Enter subscription name" className="h-12" />
        </Form.Item>

        <Form.Item
          name="Price"
          label={<h2 className="text-lg font-semibold">Price</h2>}
          rules={[{ required: true, message: "Please enter price!" }]}
        >
          <Input placeholder="Enter price" className="h-12" />
        </Form.Item>

        <Form.Item
          name="Status"
          label={<h2 className="text-lg font-semibold">Status</h2>}
          rules={[{ required: true, message: "Please select status!" }]}
        >
          <Select
            placeholder="Select Status"
            options={[
              { label: "Active", value: "Active" },
              { label: "Inactive", value: "Inactive" },
            ]}
            style={{ height: "48px" }}
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
          ) : typeof open === "object" ? (
            "Edit Subscription"
          ) : (
            "Add New Subscription"
          )}
        </button>
      </Form>
    </Modal>
  );
}

export default AddEditSubscription;
