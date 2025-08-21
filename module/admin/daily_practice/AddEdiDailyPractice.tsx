"use client";
import { Form, Input, Modal, Select } from "antd";
import { Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { Question } from ".";
import { toast } from "sonner";
import {
  useAddMathQuestionMutation,
  useUpdateMathQuestionMutation,
} from "@/redux/features/question/question";
import { useAllTopicQuery } from "@/redux/features/other/other.api";
import { useParams } from "next/navigation";

interface Props {
  open: Question | string;
  setOpen: (open: Question | string) => void;
}

function AddEdiDailyPractice({ open, setOpen }: Props) {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);
  const { question } = useParams();
  const [update] = useUpdateMathQuestionMutation();
  const [add] = useAddMathQuestionMutation();
  const { data } = useAllTopicQuery(undefined);

  const handleAddEditUser = async (values: any) => {
    const toastId = toast.loading("Saving...");
    setIsLoading(true);

    try {
      if (open === "add") {
        await add({
          title: values.title,
          option1: values.option1,
          option2: values.option2,
          option3: values.option3,
          option4: values.option4,
          correctAnswer: values.correctAnswer,
          point: parseInt(values.point),
          type: values.type,
          difficulty: values.difficulty.toUpperCase(),
          topicId: values.topicId,
          mathMissionId: question,
        }).unwrap();
      } else {
        await update({
          id: (open as Question).id,
          data: {
            title: values.title,
            option1: values.option1,
            option2: values.option2,
            option3: values.option3,
            option4: values.option4,
            correctAnswer: values.correctAnswer,
            point: parseInt(values.point),
            type: values.type,
            difficulty: values.difficulty.toUpperCase(),
            topicId: values.topicId,
          },
        }).unwrap();
      }

      toast.success(
        `Question ${
          typeof open === "object" ? "updated" : "added"
        } successfully`,
        { id: toastId }
      );

      setOpen("");
      form.resetFields();
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to save", { id: toastId });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (typeof open === "object" && open !== null) {
      form.setFieldsValue({
        title: open.title,
        option1: open.option1,
        option2: open.option2,
        option3: open.option3,
        option4: open.option4,
        correctAnswer: open.correctAnswer,
        point: open.point,
        type: open.type,
        difficulty: open.difficulty,
        topicId: open.topic?.id,
      });
    }
  }, [open, form]);

  const options = data?.data?.map((item: any) => {
    return { label: item?.title, value: item?.id };
  });
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
            name="type"
            label="Question Type"
            rules={[
              { required: true, message: "Please select question type!" },
            ]}
          >
            <Select
              placeholder="Select Type"
              options={[{ label: "MCQ", value: "MCQ" }]}
              style={{ height: "48px" }}
            />
          </Form.Item>

          <Form.Item
            name="topicId"
            label="Question Topic"
            rules={[
              { required: true, message: "Please select question topic!" },
            ]}
          >
            <Select
              placeholder="Select Topic"
              options={options}
              style={{ height: "48px" }}
            />
          </Form.Item>
        </div>

        <Form.Item
          name="title"
          label="Question"
          rules={[{ required: true, message: "Please input your question!" }]}
        >
          <Input.TextArea placeholder="Enter your question" rows={4} />
        </Form.Item>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-4">
          {["option1", "option2", "option3", "option4"].map((opt, i) => (
            <Form.Item
              key={opt}
              name={opt}
              label={`Option ${i + 1}`}
              rules={[
                { required: true, message: `Please input option ${i + 1}!` },
              ]}
            >
              <Input placeholder={`Enter option ${i + 1}`} className="h-12" />
            </Form.Item>
          ))}

          <Form.Item
            name="correctAnswer"
            label="Correct Answer"
            rules={[
              { required: true, message: "Please input the correct answer!" },
            ]}
          >
            <Input placeholder="Enter correct answer" className="h-12" />
          </Form.Item>

          <Form.Item
            name="difficulty"
            label="Difficulty"
            rules={[{ required: true, message: "Please select difficulty!" }]}
          >
            <Select
              placeholder="Select Difficulty"
              options={[
                { label: "Easy", value: "EASY" },
                { label: "Medium", value: "MEDIUM" },
                { label: "Hard", value: "HARD" },
              ]}
              style={{ height: "48px" }}
            />
          </Form.Item>

          <Form.Item
            name="point"
            label="Points"
            rules={[{ required: true, message: "Please input points!" }]}
          >
            <Input type="number" placeholder="Enter points" className="h-12" />
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
          ) : typeof open === "object" ? (
            "Update Question"
          ) : (
            "Add New Question"
          )}
        </button>
      </Form>
    </Modal>
  );
}

export default AddEdiDailyPractice;
