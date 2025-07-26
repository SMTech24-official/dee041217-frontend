"use client";
import { Form, Input, Modal, Select } from "antd";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Question } from ".";

interface Props {
  open: Question | string;
  setOpen: (open: Question | string) => void;
}
function AddEdiDailyPractice({ open, setOpen }: Props) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleAddEditUser = (values: any) => {
    console.log(values);

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setOpen("");
      form.resetFields();
    }, 2000);
  };

  useEffect(() => {
    if (typeof open === "object" && open !== null) {
      console.log(open);
      form.setFieldsValue(open);
    }
  }, [open]);

  return (
    <Modal
      title={
        <h2 className="text-xl font-semibold text-green-500">
          {typeof open === "object" ? "Edit Question" : "Add New Question"}
        </h2>
      }
      open={!!open}
      onCancel={() => {
        setOpen("");
        form.resetFields();
      }}
      centered
      width={800}
      footer={null}
    >
      <Form onFinish={handleAddEditUser} layout="vertical" form={form}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          <Form.Item
            name="questionType"
            label={<h2 className="text-lg font-semibold">Question Type</h2>}
            rules={[
              { required: true, message: "Please select question type!" },
            ]}
          >
            <Select
              placeholder="Select Question Type"
              options={[
                { label: "Simple", value: "Simple" },
                { label: "Story", value: "Story" },
              ]}
              style={{ height: "48px" }}
            />
          </Form.Item>

          <Form.Item
            name="questionTopic"
            label={<h2 className="text-lg font-semibold">Question Topic</h2>}
            rules={[
              { required: true, message: "Please select question topic!" },
            ]}
          >
            <Select
              placeholder="Select Question Topic"
              options={[
                { label: "Addition", value: "Addition" },
                { label: "Subtraction", value: "Subtraction" },
                { label: "Multiplication", value: "Multiplication" },
                { label: "Division", value: "Division" },
              ]}
              style={{ height: "48px" }}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="question"
          label={<h2 className="text-lg font-semibold">Add Question</h2>}
          rules={[{ required: true, message: "Please input your question!" }]}
        >
          <Input.TextArea placeholder="Enter your question" rows={4} />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          {["option1", "option2", "option3", "option4"].map((opt, i) => (
            <Form.Item
              key={opt}
              name={opt}
              label={<h2 className="text-lg font-semibold">Option {i + 1}</h2>}
              rules={[
                { required: true, message: `Please input option ${i + 1}!` },
              ]}
            >
              <Input placeholder={`Enter option ${i + 1}`} className="h-12" />
            </Form.Item>
          ))}

          <Form.Item
            name="answer"
            label={<h2 className="text-lg font-semibold">Answer</h2>}
            rules={[{ required: true, message: "Please input answer!" }]}
          >
            <Input placeholder="Enter answer" className="h-12" />
          </Form.Item>

          <Form.Item
            name="level"
            label={<h2 className="text-lg font-semibold">Level</h2>}
            rules={[{ required: true, message: "Please select level!" }]}
          >
            <Select
              placeholder="Select Level"
              options={[
                { label: "Easy", value: "Easy" },
                { label: "Medium", value: "Medium" },
                { label: "Hard", value: "Hard" },
              ]}
              style={{ height: "48px" }}
            />
          </Form.Item>
        </div>

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
            typeof open === "object" ? "Edit Question" : "Add New Question"
          )}
        </button>
      </Form>
    </Modal>
  );
}

export default AddEdiDailyPractice;
