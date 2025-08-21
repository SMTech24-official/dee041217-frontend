"use client";
import { EllipsisVertical, Loader } from "lucide-react";
import { useRef, useState } from "react";
import TableComponent from "@/sheard/TableComponent";
import { Modal, Pagination } from "antd";
import LeaderboardComponent from "./leaderboard";
import { toast } from "sonner";
import {
  useAllUserQuery,
  useBlockUserMutation,
} from "@/redux/features/dashboard/dashboard.api";
import Spinner from "@/components/common/Spinner";
import MyPagination from "@/components/common/MyPagination";

type User = {
  id: string;
  user_id: string;
  fullName: string;
  email: string;
  status: string;
};

function UsersInformationComponent({
  from,
}: {
  from: "user-list" | "dashboard";
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [isOpen, setIsOpen] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const { data, isFetching } = useAllUserQuery([
    { name: "limit", value: 10 },
    { name: "page", value: String(currentPage) },
  ]);

  const [updateStatus] = useBlockUserMutation();

  const handleBlockUser = async (id: string, status: string) => {
    const toastId = toast.loading("Updating...");

    const userStatus = status === "ACTIVE" ? "INACTIVE" : "ACTIVE";

    try {
      await updateStatus({
        id,
        data: { status: userStatus },
      }).unwrap();

      toast.success("Update success", { id: toastId });
      setSelectedUser(null);
    } catch (err: any) {
      toast.error(err.data?.message || "Failed to update", { id: toastId });
    }
  };

  if (isFetching) {
    return <Spinner />;
  }

  const userData = data?.data?.result;

  const metaData = {
    page: data?.data?.page,
    limit: data?.data?.limit,
    total: data?.data?.total,
  };

  return (
    <div
      className={`rounded-lg border border-gray-100 ${
        from === "user-list" ? "grid grid-cols-1 xl:grid-cols-3" : ""
      } gap-4 p-5`}
    >
      <div className="col-span-2 border border-gray-200 rounded-lg">
        <div>
          <div className="flex items-center justify-between p-5">
            <h1 className="md:text-2xl text-xl font-bold">
              All Users Information
            </h1>
          </div>
          <TableComponent
            headers={["User ID", "Name", "Email", "Status", "Action"]}
          >
            {userData?.map((user: any) => (
              <tr key={user.id} className="border-b hover:bg-gray-100">
                <td className="px-6 py-4">#{user?.id.slice(-5)}</td>
                <td className="p-4">{user?.fullName}</td>
                <td className="p-4">{user?.email}</td>
                <td className="p-4">
                  <span
                    className={
                      "px-2 py-1 text-xs font-medium rounded-full " +
                      (user?.status === "ACTIVE"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800")
                    }
                  >
                    {user?.status}
                  </span>
                </td>
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
                      className={`absolute right-8 bg-white shadow-lg rounded-md p-1 min-w-[120px] border border-gray-200 z-50 transition-all duration-200 ease-out bottom-10 origin-bottom-right ${
                        isOpen === user?.id
                          ? "opacity-100 scale-100"
                          : "opacity-0 scale-95 pointer-events-none"
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
                        <span
                          className={`mr-2 w-2 h-2 rounded-full  ${
                            user?.status === "ACTIVE"
                              ? "bg-red-500"
                              : "bg-green-500"
                          }`}
                        ></span>
                        {user?.status === "ACTIVE" ? "Block" : "Unblock"}
                      </button>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </TableComponent>
          <div className="p-4 w-full md:flex justify-between items-center space-y-4 md:space-y-0">
            <MyPagination
              currentPage={metaData?.page}
              totalItem={metaData?.total}
              limit={10}
              onPageChange={(page) => setCurrentPage(page)}
            />
          </div>
        </div>

        <Modal
          title={
            <span className="text-lg font-semibold">
              Confirm User{" "}
              {selectedUser?.status === "ACTIVE" ? "Block" : "Unblock"}
            </span>
          }
          open={!!selectedUser}
          onCancel={() => {
            setSelectedUser(null);
          }}
          centered
          width={600}
          footer={null}
        >
          <div className="py-4 space-y-4">
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
              <div className="ml-3 bg-red-50 p-4 rounded-md w-full">
                <h3 className="text-lg font-medium text-gray-900">
                  {selectedUser?.status === "ACTIVE" ? "Block" : "Unblock"} User
                  Confirmation
                </h3>
                <div className="mt-2 text-sm text-gray-500">
                  <p>
                    Are you sure you want to{" "}
                    {selectedUser?.status === "ACTIVE" ? "block" : "unblock"}{" "}
                    this user?
                  </p>
                  <p className="mt-2 font-medium">
                    User: {selectedUser?.fullName || "Unknown"}
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <button
                key="cancel"
                onClick={() => setSelectedUser(null)}
                className="px-4 py-2 border rounded-md text-sm font-medium hover:bg-gray-50 transition-colors cursor-pointer"
              >
                Cancel
              </button>
              <button
                key="block"
                onClick={() =>
                  handleBlockUser(selectedUser?.id!, selectedUser?.status!)
                }
                className={`px-4 py-2 rounded-md text-sm font-medium text-white ml-2 transition-colors cursor-pointer ${selectedUser?.status === "ACTIVE" ? "bg-red-500" : "bg-green-500"}`}
              >
                Confirm{" "}
                {selectedUser?.status === "ACTIVE" ? "Block" : "Unblock"}
              </button>
            </div>
          </div>
        </Modal>
      </div>

      {from === "user-list" && <LeaderboardComponent />}
    </div>
  );
}

export default UsersInformationComponent;
