"use client";
import { Pencil, Plus, Trash2 } from "lucide-react";
import AdminButton from "@/components/ui/AdminButton";
import { useState } from "react";
import TableComponent from "@/sheard/TableComponent";
import { Pagination } from "antd";
import Link from "next/link";
import AddEdiTimeChallenges from "./AddEdiTimeChallenges";
import DeleteModal from "@/sheard/DeleteModal";

export type Challenge = {
  id: string;
  missionName: string;
  totalPlayed: number;
  totalQuestions: number;
  time: string;
  status: "Active" | "Inactive";
};

function TimeChallengesComponent() {
  const [open, setOpen] = useState<Challenge | string>("");

  const [deleteMissions, setDeleteMissions] = useState<Challenge | string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const [missions, setMissions] = useState<Challenge[]>([
    {
      id: "1",
      missionName: "Jungle Quiz Adventure",
      totalPlayed: 124,
      totalQuestions: 10,
      status: "Active",
      time: "5 min",
    },
    {
      id: "2",
      missionName: "Time Travel Trivia",
      totalPlayed: 89,
      totalQuestions: 15,
      status: "Active",
      time: "7 min",
    },
    {
      id: "3",
      missionName: "Underwater Wonders",
      totalPlayed: 77,
      totalQuestions: 8,
      status: "Inactive",
      time: "4 min",
    },
    {
      id: "4",
      missionName: "Space Explorer Challenge",
      totalPlayed: 142,
      totalQuestions: 12,
      status: "Active",
      time: "6 min",
    },
    {
      id: "5",
      missionName: "Wildlife Safari Quiz",
      totalPlayed: 56,
      totalQuestions: 10,
      status: "Inactive",
      time: "5 min",
    },
    {
      id: "6",
      missionName: "Ancient Egypt Quest",
      totalPlayed: 95,
      totalQuestions: 14,
      status: "Active",
      time: "7 min",
    },
    {
      id: "7",
      missionName: "Pirate Treasure Hunt",
      totalPlayed: 130,
      totalQuestions: 9,
      status: "Active",
      time: "5 min",
    },
    {
      id: "8",
      missionName: "Dino Discovery",
      totalPlayed: 101,
      totalQuestions: 11,
      status: "Inactive",
      time: "6 min",
    },
    {
      id: "9",
      missionName: "Brain Boost Marathon",
      totalPlayed: 215,
      totalQuestions: 20,
      status: "Active",
      time: "10 min",
    },
    {
      id: "10",
      missionName: "Solar System Sprint",
      totalPlayed: 80,
      totalQuestions: 10,
      status: "Active",
      time: "5 min",
    },
    {
      id: "11",
      missionName: "World Landmark Race",
      totalPlayed: 98,
      totalQuestions: 13,
      status: "Inactive",
      time: "6 min",
    },
    {
      id: "12",
      missionName: "Puzzle Island",
      totalPlayed: 67,
      totalQuestions: 9,
      status: "Inactive",
      time: "5 min",
    },
    {
      id: "13",
      missionName: "Mystery of the Pyramids",
      totalPlayed: 112,
      totalQuestions: 10,
      status: "Active",
      time: "5 min",
    },
    {
      id: "14",
      missionName: "Robot Lab Escape",
      totalPlayed: 145,
      totalQuestions: 12,
      status: "Active",
      time: "6 min",
    },
    {
      id: "15",
      missionName: "Haunted Mansion Trivia",
      totalPlayed: 79,
      totalQuestions: 8,
      status: "Inactive",
      time: "4 min",
    },
    {
      id: "16",
      missionName: "Color World Quiz",
      totalPlayed: 120,
      totalQuestions: 10,
      status: "Active",
      time: "5 min",
    },
    {
      id: "17",
      missionName: "Jungle Math Dash",
      totalPlayed: 150,
      totalQuestions: 10,
      status: "Active",
      time: "5 min",
    },
    {
      id: "18",
      missionName: "Spelling Bee Blitz",
      totalPlayed: 88,
      totalQuestions: 15,
      status: "Inactive",
      time: "7 min",
    },
    {
      id: "19",
      missionName: "Castle Logic Challenge",
      totalPlayed: 92,
      totalQuestions: 11,
      status: "Active",
      time: "6 min",
    },
    {
      id: "20",
      missionName: "Magic School Trivia",
      totalPlayed: 73,
      totalQuestions: 10,
      status: "Inactive",
      time: "5 min",
    },
    {
      id: "21",
      missionName: "Ocean Depths Quiz",
      totalPlayed: 107,
      totalQuestions: 13,
      status: "Active",
      time: "6 min",
    },
    {
      id: "22",
      missionName: "Sky High History",
      totalPlayed: 96,
      totalQuestions: 10,
      status: "Active",
      time: "5 min",
    },
    {
      id: "23",
      missionName: "Gadget Masterd",
      totalPlayed: 66,
      totalQuestions: 12,
      status: "Inactive",
      time: "6 min",
    },
    {
      id: "24",
      missionName: "Rainforest Run",
      totalPlayed: 125,
      totalQuestions: 14,
      status: "Active",
      time: "7 min",
    },
    {
      id: "25",
      missionName: "Volcano Blast Trivia",
      totalPlayed: 82,
      totalQuestions: 9,
      status: "Active",
      time: "5 min",
    },
    {
      id: "26",
      missionName: "Puzzle Pyramid",
      totalPlayed: 109,
      totalQuestions: 11,
      status: "Inactive",
      time: "6 min",
    },
    {
      id: "27",
      missionName: "City Explorer",
      totalPlayed: 133,
      totalQuestions: 13,
      status: "Active",
      time: "6 min",
    },
    {
      id: "28",
      missionName: "Ice Age Adventure",
      totalPlayed: 59,
      totalQuestions: 10,
      status: "Inactive",
      time: "5 min",
    },
    {
      id: "29",
      missionName: "Moonlight Quiz",
      totalPlayed: 140,
      totalQuestions: 12,
      status: "Active",
      time: "6 min",
    },
    {
      id: "29",
      missionName: "Treasure Trail Trivia",
      totalPlayed: 103,
      totalQuestions: 10,
      status: "Active",
      time: "5 min",
    },
  ]);

  const handlePaginationChange = (page: number) => {
    setPage(page);
  };

  const handleDeleteMissions = (id: string) => {
    console.log(id);
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setDeleteMissions("");
    }, 2000);
  };

  const index = (page - 1) * limit;
  const paginatedMissions = missions.slice(index, index + limit);
  const total = missions.length;

  console.log(open);
  return (
    <div className="rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-2xl font-bold">All Time Challenges</h1>
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
          "Total Questions",
          "Time",
          "Status",
          "Action",
        ]}
      >
        {paginatedMissions?.map((mission, index) => (
          <tr key={index} className="border-b hover:bg-gray-100">
            <td className="px-6 py-4">
              <Link
                href={`/admin/time_challenges/${mission?.id}?name=${mission?.missionName}`}
                className="hover:text-green-500 cursor-pointer transition duration-300 ease-in-out hover:underline"
              >
                {mission?.missionName}
              </Link>
            </td>
            <td className="p-4">{mission?.totalPlayed}</td>
            <td className="p-4">{mission?.totalQuestions}</td>
            <td className="p-4">{mission?.time}</td>
            <td className="p-4">
              <div
                className={`px-3 py-1 rounded-full font-medium w-fit border-dotted border-2 ${
                  mission?.status === "Active"
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
      <div className="p-4 w-full flex justify-between items-center">
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

      {/* Add Edit Modal */}
      <AddEdiTimeChallenges open={open} setOpen={setOpen} />

      {/* Delete Modal */}
      <DeleteModal
        open={deleteMissions ? "add" : ""}
        setOpen={() => setDeleteMissions("")}
        name={
          typeof deleteMissions === "object"
            ? deleteMissions?.missionName || ""
            : ""
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
