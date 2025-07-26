import { Pencil, Trash2 } from "lucide-react";
import React from "react";
import TableComponent from "./TableComponent";
import { Pagination } from "antd";
import { Question } from "@/module/admin/daily_practice";
interface Props {
  data: Question[];
  page: number;
  limit: number;
  total: number;
  index: number;
  handlePaginationChange: (page: number) => void;
  setOpen: (open: Question | string) => void;
  setDeleteMissions: (deleteMissions: Question | string) => void;
}

function QuestionsTable({
  data,
  page,
  limit,
  total,
  index,
  handlePaginationChange,
  setOpen,
  setDeleteMissions
}: Props) {
  return (
    <>
      <TableComponent
        headers={[
          "QNo",
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
        {data?.map((question, index) => (
          <tr key={index} className="border-b hover:bg-gray-100">
            <td className="px-6 py-4">{question?.QNo}</td>
            <td className="p-4">{question?.Question}</td>
            <td className="p-4">{question?.Option1}</td>
            <td className="p-4">{question?.Option2}</td>
            <td className="p-4">{question?.Option3}</td>
            <td className="p-4">{question?.Option4}</td>
            <td className="p-4">{question?.Answer}</td>
            <td className="p-4">
              <div
                className={`px-3 py-1 rounded-full font-medium w-fit border-dotted border-2 ${
                  question?.Level === "Easy"
                    ? "bg-green-50 border-green-500 text-green-500"
                    : question?.Level === "Medium"
                    ? "bg-yellow-50 border-yellow-500 text-yellow-500"
                    : "bg-red-50 border-red-500 text-red-500"
                }`}
              >
                {question?.Level}
              </div>
            </td>
            <td className="p-4">
              <div
                className={`px-3 py-1 rounded-full font-medium w-fit border-dotted border-2 ${
                  question?.Type === "Simple"
                    ? "bg-green-50 border-green-500 text-green-500"
                    : question?.Type === "Story"
                    ? "bg-blue-50 border-blue-500 text-blue-500"
                    : "bg-red-50 border-red-500 text-red-500"
                }`}
              >
                {question?.Type}
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
          Showing {index + 1} to {Math.min(index + limit, total)} of {total}{" "}
          entries
        </p>

        <Pagination
          current={page}
          pageSize={limit}
          total={total}
          onChange={handlePaginationChange}
          className="custom-pagination"
        />
      </div>
    </>
  );
}

export default QuestionsTable;
