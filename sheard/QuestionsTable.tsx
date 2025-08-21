import { Pencil, Trash2 } from "lucide-react";
import React, { useState } from "react";
import TableComponent from "./TableComponent";
import { Pagination } from "antd";
import { Question } from "@/module/admin/daily_practice";
import { useMathQuestionsQuery } from "@/redux/features/question/question";
import Spinner from "@/components/common/Spinner";
import MyPagination from "@/components/common/MyPagination";
interface Props {
  id: string;
  setOpen: (open: Question | string) => void;
  setDeleteMissions: (deleteMissions: Question | string) => void;
}

function QuestionsTable({ id, setOpen, setDeleteMissions }: Props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data: allData, isFetching } = useMathQuestionsQuery([
    { name: "mathMissionId", value: id },
    { name: "limit", value: 10 },
    { name: "page", value: String(currentPage) },
  ]);

  const data = allData?.data?.allQuestions;

  const metaData = {
    page: allData?.data?.page,
    limit: allData?.data?.limit,
    total: allData?.data?.total,
  };

  if (isFetching) {
    return <Spinner />;
  }

  return (
    <>
      <TableComponent
        headers={[
          "Q-Id",
          "Question",
          "Option1",
          "Option2",
          "Option3",
          "Option4",
          "Answer",
          "Level",
          "Type",
          "Action",
        ]}
      >
        {data?.map((question: any) => (
          <tr key={question?.id} className="border-b hover:bg-gray-100">
            <td className="px-6 py-4">Q-{question?.id.slice(-5)}</td>
            <td className="p-4">{question?.title}</td>
            <td className="p-4">{question?.option1}</td>
            <td className="p-4">{question?.option2}</td>
            <td className="p-4">{question?.option3}</td>
            <td className="p-4">{question?.option4}</td>
            <td className="p-4">{question?.correctAnswer}</td>
            <td className="p-4">
              <div
                className={`px-3 py-1 rounded-full font-medium w-fit border-dotted border-2 ${
                  question?.difficulty === "EASY"
                    ? "bg-green-50 border-green-500 text-green-500"
                    : question?.difficulty === "MEDIUM"
                    ? "bg-yellow-50 border-yellow-500 text-yellow-500"
                    : "bg-red-50 border-red-500 text-red-500"
                }`}
              >
                {question?.difficulty}
              </div>
            </td>
            <td className="p-4">
              <div
                className={`px-3 py-1 rounded-full font-medium w-fit border-dotted border-2 ${
                  question?.topic?.title === "Division"
                    ? "bg-green-50 border-green-500 text-green-500"
                    : question?.topic?.title === "Addition"
                    ? "bg-blue-50 border-blue-500 text-blue-500"
                    : question?.topic?.title === "Subtraction"
                    ? "bg-red-50 border-yellow-500 text-yellow-500"
                    : "bg-red-50 border-red-500 text-red-500"
                }`}
              >
                {question?.topic?.title}
              </div>
            </td>
            <td className="p-4 w-32">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOpen(question)}
                  className="text-green-500 bg-green-50 rounded-full p-2 hover:bg-green-500 hover:text-white cursor-pointer transition-all duration-300"
                  title="Update"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setDeleteMissions(question)}
                  className="text-red-500 bg-red-50 rounded-full p-2 hover:bg-red-500 hover:text-white cursor-pointer transition-all duration-300"
                  title="Delete"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </TableComponent>
      <div className="p-4 w-full md:flex justify-between items-center space-y-4 md:space-y-0">
        <p className="text-sm text-green-500 font-semibold">
          Showing {metaData?.page} to {metaData?.limit} of {metaData?.total}{" "}
          entries
        </p>
        <MyPagination
          currentPage={metaData?.page}
          totalItem={metaData?.total}
          limit={10}
          onPageChange={(page) => setCurrentPage(page)}
        />
      </div>
    </>
  );
}

export default QuestionsTable;
