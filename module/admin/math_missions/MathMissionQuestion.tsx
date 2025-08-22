"use client";
import { Plus } from "lucide-react";
import AdminButton from "@/components/ui/AdminButton";
import { useEffect, useState } from "react";
import QuestionsTable from "@/sheard/QuestionsTable";
import { useSearchParams } from "next/navigation";
import DeleteModal from "@/sheard/DeleteModal";
import AddEdiDailyPractice from "../daily_practice/AddEdiDailyPractice";
import { toast } from "sonner";
import { useDeleteMathQuestionMutation } from "@/redux/features/question/question";

export type Question = {
  id: string;
  title: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correctAnswer: string;
  difficulty: "EASY" | "MEDIUM" | "HARD";
  topic: {
    id: string;
    title: string;
  };
  point: number;
  type: string;
};

function MathMissionQuestion({ id }: { id: string }) {
  const challengeName = useSearchParams().get("name");
  const [open, setOpen] = useState<Question | string>("");
  const [deleteMissions, setDeleteMissions] = useState<Question | string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [deleteQuestion] = useDeleteMathQuestionMutation();

  const handleDeleteMissions = async (id: string) => {
    const toastId = toast.loading("Deleting...");
    setIsLoading(true);
    try {
      await deleteQuestion(id).unwrap();

      toast.success(`Question deleted successfully`, { id: toastId });
      setIsLoading(false);
      setDeleteMissions("");
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to delete", { id: toastId });
    }
  };


  return (
    <div className="rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-2xl font-bold">{challengeName}</h1>
        <AdminButton
          label="Add Question"
          icon={<Plus className="w-6 h-6" />}
          onClick={() => setOpen("add")}
        />
      </div>
      <QuestionsTable
        id={id}
        setOpen={setOpen}
        setDeleteMissions={setDeleteMissions}
      />
      
      <AddEdiDailyPractice open={open} setOpen={setOpen} />

      <DeleteModal
        open={deleteMissions ? "add" : ""}
        setOpen={() => setDeleteMissions("")}
        name={
          typeof deleteMissions === "object" ? deleteMissions?.title || "" : ""
        }
        handleDelete={() =>
          typeof deleteMissions === "object" &&
          deleteMissions &&
          handleDeleteMissions(deleteMissions.id)
        }
        isLoading={isLoading}
      />
    </div>
  );
}

export default MathMissionQuestion;
