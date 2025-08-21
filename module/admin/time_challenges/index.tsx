"use client";
import { Pencil, Plus, Trash2 } from "lucide-react";
import AdminButton from "@/components/ui/AdminButton";
import { useState } from "react";
import TableComponent from "@/sheard/TableComponent";
import { Pagination } from "antd";
import Link from "next/link";
import AddEdiTimeChallenges from "./AddEdiTimeChallenges";
import DeleteModal from "@/sheard/DeleteModal";
import { toast } from "sonner";
import Spinner from "@/components/common/Spinner";
import MyPagination from "@/components/common/MyPagination";
import {
  useDeleteTimeMissionMutation,
  useTimeMissionsQuery,
} from "@/redux/features/dashboard/dashboard.api";

export type Challenge = {
  id: string;
  title: string;
  totalPlayers: number;
  totalPoints: number;
  totalQuestions: number;
  timeLimit: string;
  status: "ACTIVE" | "INACTIVE";
};

function TimeChallengesComponent() {
  const [currentPage, setCurrentPage] = useState(1);
  const [open, setOpen] = useState<Challenge | string>("");
  const [deleteMissions, setDeleteMissions] = useState<Challenge | string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [deleteMission] = useDeleteTimeMissionMutation();

  const { data, isFetching } = useTimeMissionsQuery([
    { name: "limit", value: 10 },
    { name: "page", value: String(currentPage) },
  ]);

  const handleDeleteMissions = async (id: string) => {
    const toastId = toast.loading("Updating...");
    setIsLoading(true);
    console.log(id);
    try {
      await deleteMission(id).unwrap();

      toast.success(`Mission deleted successfully`, { id: toastId });
      setIsLoading(false);
      setDeleteMissions("");
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to update", { id: toastId });
    }
  };

  const missions = data?.data?.result;

  const metaData = {
    page: data?.data?.page,
    limit: data?.data?.limit,
    total: data?.data?.total,
  };

  if (isFetching) {
    return <Spinner />;
  }
  return (
    <div className="rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between p-5">
        <h1 className="md:text-2xl text-xl font-bold">All Time Challenges</h1>
        <AdminButton
          label="Add Challenge"
          icon={<Plus className="w-6 h-6" />}
          onClick={() => setOpen("add")}
        />
      </div>
      <TableComponent
        headers={[
          "Challenge Name",
          "Total Played",
          "Points",
          "Total Questions",
          "Time",
          "Status",
          "Action",
        ]}
      >
        {missions?.map((mission: any) => (
          <tr key={mission?.id} className="border-b hover:bg-gray-100">
            <td className="px-6 py-4">
              <Link
                href={`/admin/time_challenges/${mission?.id}?name=${mission?.title}`}
                className="hover:text-green-500 cursor-pointer transition duration-300 ease-in-out hover:underline"
              >
                {mission?.title}
              </Link>
            </td>
            <td className="p-4">{mission?.totalPlayers}</td>
            <td className="p-4">{mission?.totalPoints}</td>
            <td className="p-4">{mission?.totalQuestions}</td>
            <td className="p-4">{mission?.timeLimit}</td>
            <td className="p-4">
              <div
                className={`px-3 py-1 rounded-full font-medium w-fit border-dotted border-2 ${
                  mission?.status === "ACTIVE"
                    ? "bg-green-50 border-green-500 text-green-500"
                    : "bg-red-50 border-red-500 text-red-500"
                }`}
              >
                {mission?.status}
              </div>
            </td>
            <td className="p-4 w-32">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOpen(mission)}
                  className="text-green-500 bg-green-50 rounded-full p-2 hover:bg-green-500 hover:text-white cursor-pointer transition-all duration-300"
                  title="Update"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setDeleteMissions(mission)}
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

      {/* Add Edit Modal */}
      <AddEdiTimeChallenges open={open} setOpen={setOpen} />

      {/* Delete Modal */}
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

export default TimeChallengesComponent;
