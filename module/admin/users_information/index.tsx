"use client";
import { EllipsisVertical, Pencil, Plus, Trash2 } from "lucide-react";
import AdminButton from "@/components/ui/AdminButton";
import { useEffect, useRef, useState } from "react";
import TableComponent from "@/sheard/TableComponent";
import { Modal, Pagination } from "antd";
import Link from "next/link";
import LeaderboardComponent from "./leaderboard";

type User = {
  id: string;
  user_id: string;
  name: string;
  email: string;
};

function UsersInformationComponent() {
  const [open, setOpen] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const [isOpen, setIsOpen] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserDelete, setSelectedUserDelete] = useState<User | null>(
    null
  );

  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      user_id: "USR1001",
      name: "Arif Hossain",
      email: "arif.hossain@example.com",
    },
    {
      id: "2",
      user_id: "USR1002",
      name: "Nusrat Jahan",
      email: "nusrat.jahan@example.com",
    },
    {
      id: "3",
      user_id: "USR1003",
      name: "Sajid Rahman",
      email: "sajid.rahman@example.com",
    },
    {
      id: "4",
      user_id: "USR1004",
      name: "Mim Akter",
      email: "mim.akter@example.com",
    },
    {
      id: "5",
      user_id: "USR1005",
      name: "Tarek Aziz",
      email: "tarek.aziz@example.com",
    },
    {
      id: "6",
      user_id: "USR1006",
      name: "Rafiul Islam",
      email: "rafiul.islam@example.com",
    },
    {
      id: "7",
      user_id: "USR1007",
      name: "Shirin Akhter",
      email: "shirin.akhter@example.com",
    },
    {
      id: "8",
      user_id: "USR1008",
      name: "Jamil Khan",
      email: "jamil.khan@example.com",
    },
    {
      id: "9",
      user_id: "USR1009",
      name: "Ayesha Siddiqua",
      email: "ayesha.siddiqua@example.com",
    },
    {
      id: "10",
      user_id: "USR1010",
      name: "Fahim Reza",
      email: "fahim.reza@example.com",
    },
    {
      id: "11",
      user_id: "USR1011",
      name: "Lamia Haque",
      email: "lamia.haque@example.com",
    },
    {
      id: "12",
      user_id: "USR1012",
      name: "Tanjil Mahmud",
      email: "tanjil.mahmud@example.com",
    },
    {
      id: "13",
      user_id: "USR1013",
      name: "Sadia Islam",
      email: "sadia.islam@example.com",
    },
    {
      id: "14",
      user_id: "USR1014",
      name: "Nazmul Huda",
      email: "nazmul.huda@example.com",
    },
    {
      id: "15",
      user_id: "USR1015",
      name: "Raisa Anjum",
      email: "raisa.anjum@example.com",
    },
    {
      id: "16",
      user_id: "USR1016",
      name: "Tanvir Hasan",
      email: "tanvir.hasan@example.com",
    },
    {
      id: "17",
      user_id: "USR1017",
      name: "Elita Karim",
      email: "elita.karim@example.com",
    },
    {
      id: "18",
      user_id: "USR1018",
      name: "Morsalin Rafi",
      email: "morsalin.rafi@example.com",
    },
    {
      id: "19",
      user_id: "USR1019",
      name: "Shahida Parveen",
      email: "shahida.parveen@example.com",
    },
    {
      id: "20",
      user_id: "USR1020",
      name: "Noman Faruq",
      email: "noman.faruq@example.com",
    },
    {
      id: "21",
      user_id: "USR1021",
      name: "Mahira Sultana",
      email: "mahira.sultana@example.com",
    },
    {
      id: "22",
      user_id: "USR1022",
      name: "Rubel Hossain",
      email: "rubel.hossain@example.com",
    },
    {
      id: "23",
      user_id: "USR1023",
      name: "Sohana Rahman",
      email: "sohana.rahman@example.com",
    },
    {
      id: "24",
      user_id: "USR1024",
      name: "Zubair Ahmed",
      email: "zubair.ahmed@example.com",
    },
    {
      id: "25",
      user_id: "USR1025",
      name: "Ruma Begum",
      email: "ruma.begum@example.com",
    },
    {
      id: "26",
      user_id: "USR1026",
      name: "Imran Kabir",
      email: "imran.kabir@example.com",
    },
    {
      id: "27",
      user_id: "USR1027",
      name: "Farzana Yasmin",
      email: "farzana.yasmin@example.com",
    },
    {
      id: "28",
      user_id: "USR1028",
      name: "Hasan Ali",
      email: "hasan.ali@example.com",
    },
    {
      id: "29",
      user_id: "USR1029",
      name: "Nadiya Khan",
      email: "nadiya.khan@example.com",
    },
    {
      id: "30",
      user_id: "USR1030",
      name: "Shuvo Chowdhury",
      email: "shuvo.chowdhury@example.com",
    },
  ]);

  const handlePaginationChange = (page: number) => {
    setPage(page);
  };

  const index = (page - 1) * limit;
  const paginatedUsers = users.slice(index, index + limit);
  const total = users.length;

  const handleBlockUser = () => {
    if (selectedUser) {
      // Handle block action
      setSelectedUser(null);
    }
  };

  const handleDeleteUser = () => {
    if (selectedUserDelete) {
      // Handle delete action
      setSelectedUserDelete(null);
    }
  };
  console.log(selectedUser);
  return (
    <div className="rounded-lg border border-gray-100 grid grid-cols-1 md:grid-cols-3 gap-4 p-5">
      <div className="col-span-2 border border-gray-200 rounded-lg">
        <div>
          <div className="flex items-center justify-between p-5">
            <h1 className="text-2xl font-bold">All Users Information</h1>
          </div>
          <TableComponent headers={["User ID", "Name", "Email", "Action"]}>
            {paginatedUsers?.map((user, index) => (
              <tr key={index} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4">{user?.user_id}</td>
                <td className="p-4">{user?.name}</td>
                <td className="p-4">{user?.email}</td>
                <td className="p-4 w-32">
                  <div
                    className="flex items-center gap-2 relative cursor-pointer w-fit"
                    ref={dropdownRef}
                  >
                    <button
                      className="text-gray-500 bg-gray-100 rounded-full p-2 hover:bg-gray-500 hover:text-white transition-all duration-300"
                      title="Menu"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsOpen(isOpen === user?.id ? "" : user?.id);
                      }}
                    >
                      <EllipsisVertical />
                    </button>

                    <div
                      className={`absolute right-8 bg-white shadow-lg rounded-md p-1 min-w-[120px] border border-gray-200 z-50 transition-all duration-200 ease-out ${
                        isOpen === user?.id
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95 pointer-events-none"
                      } ${
                        user?.id ===
                        paginatedUsers[paginatedUsers.length - 1]?.id
                          ? "bottom-10 origin-bottom-right"
                          : "top-10 origin-top-right"
                      }`}
                    >
                      <button
                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                        title="Block"
                        onClick={() => {
                          setSelectedUser(user);
                          setIsOpen("");
                        }}
                      >
                        <span className="mr-2 w-2 h-2 rounded-full bg-green-500"></span>
                        Block
                      </button>
                      <button
                        className="flex items-center w-full px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md transition-colors duration-200"
                        title="Delete"
                        onClick={() => {
                          setSelectedUserDelete(user);
                          setIsOpen("");
                        }}
                      >
                        <span className="mr-2 w-2 h-2 rounded-full bg-red-500"></span>
                        Delete
                      </button>
                    </div>
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
        </div>
        <Modal
          title={
            <span className="text-lg font-semibold">Confirm User Block</span>
          }
          open={!!selectedUser}
          onOk={handleBlockUser}
          onCancel={() => setSelectedUser(null)}
          okText="Confirm Block"
          okButtonProps={{
            danger: true,
            className:
              "h-12 bg-red-500 hover:bg-red-600 text-white cursor-pointer",
          }}
          cancelButtonProps={{
            className: "h-12 border-gray-300 hover:bg-gray-50 cursor-pointer",
          }}
          cancelText="Cancel"
          centered
          width={600}
          footer={[
            <button
              key="cancel"
              onClick={() => setSelectedUser(null)}
              className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>,
            <button
              key="block"
              onClick={handleBlockUser}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-500 hover:bg-red-600 ml-2 transition-colors cursor-pointer"
            >
              Confirm Block
            </button>,
          ]}
        >
          <div className="py-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <svg
                  className="h-5 w-5 text-red-500"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Block User Confirmation
                </h3>
                <div className="mt-2 text-sm text-gray-500">
                  <p>Are you sure you want to block this user?</p>
                  <p className="mt-2 font-medium">
                    User: {selectedUser?.name || "Unknown"}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Modal>

        <Modal
          title={
            <span className="text-lg font-semibold">Confirm User Deletion</span>
          }
          open={!!selectedUserDelete}
          onOk={handleDeleteUser}
          onCancel={() => setSelectedUserDelete(null)}
          okText="Confirm Delete"
          okButtonProps={{
            danger: true,
            className:
              "h-12 bg-red-600 hover:bg-red-700 text-white cursor-pointer",
          }}
          cancelButtonProps={{
            className: "h-12 border-gray-300 hover:bg-gray-50 cursor-pointer",
          }}
          cancelText="Cancel"
          centered
          width={600}
          footer={[
            <button
              key="cancel"
              onClick={() => setSelectedUserDelete(null)}
              className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>,
            <button
              key="delete"
              onClick={handleDeleteUser}
              className="px-4 py-2 rounded-md text-sm font-medium text-white bg-red-600 hover:bg-red-700 ml-2 transition-colors cursor-pointer"
            >
              Confirm Delete
            </button>,
          ]}
        >
          <div className="py-4">
            <div className="flex items-start">
              <div className="flex-shrink-0 pt-0.5">
                <svg
                  className="h-5 w-5 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                  />
                </svg>
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-gray-900">
                  Delete User Confirmation
                </h3>
                <div className="mt-2 text-sm text-gray-500">
                  <p>
                    This action cannot be undone. Are you sure you want to
                    permanently delete this user?
                  </p>
                  <div className="mt-3 p-3 bg-red-50 rounded-md">
                    <p className="font-medium text-red-800">
                      User: {selectedUserDelete?.name || "Unknown"}
                    </p>
                    <p className="text-red-700 mt-1">
                      ID: {selectedUserDelete?.user_id || "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal>
      </div>
      <LeaderboardComponent/>
    </div>
  );
}

export default UsersInformationComponent;
