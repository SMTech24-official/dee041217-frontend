"use client";
import { Pencil, Plus, Trash2 } from "lucide-react";
import AdminButton from "@/components/ui/AdminButton";
import { useState } from "react";
import TableComponent from "@/sheard/TableComponent";
import { Pagination } from "antd";
import AddEditSubscription from "./AddEditSubscription";
import DeleteModal from "@/sheard/DeleteModal";
import { toast } from "sonner";

export type Subscription = {
  No: string;
  SubscriptionName: string;
  Price: number;
  Status: "Active" | "Inactive";
};

function SubscriptionComponent() {
  const [open, setOpen] = useState<Subscription | string>("");

  const [deleteMissions, setDeleteMissions] = useState<Subscription | string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const limit = 10;

  const [subscriptions, setSubscriptions] = useState<Subscription[]>([
    { No: "A1B2", SubscriptionName: "Basic Plan", Price: 5, Status: "Active" },
    { No: "C3D4", SubscriptionName: "Standard Plan", Price: 10, Status: "Active" },
    { No: "E5F6", SubscriptionName: "Premium Plan", Price: 15, Status: "Active" },
    { No: "G7H8", SubscriptionName: "Family Plan", Price: 20, Status: "Inactive" },
    { No: "I9J0", SubscriptionName: "Student Plan", Price: 4, Status: "Active" },
    { No: "K1L2", SubscriptionName: "Pro Plan", Price: 25, Status: "Active" },
    { No: "M3N4", SubscriptionName: "Annual Basic", Price: 50, Status: "Active" },
    { No: "O5P6", SubscriptionName: "Annual Premium", Price: 150, Status: "Inactive" },
    { No: "Q7R8", SubscriptionName: "Trial Plan", Price: 0, Status: "Active" },
    { No: "S9T0", SubscriptionName: "Enterprise Plan", Price: 99, Status: "Active" },
    { No: "U1V2", SubscriptionName: "Kids Plan", Price: 6, Status: "Active" },
    { No: "W3X4", SubscriptionName: "Custom Plan A", Price: 12, Status: "Inactive" },
    { No: "Y5Z6", SubscriptionName: "Custom Plan B", Price: 18, Status: "Active" },
    { No: "A7B8", SubscriptionName: "Weekend Plan", Price: 3, Status: "Inactive" },
    { No: "C9D0", SubscriptionName: "Holiday Plan", Price: 7, Status: "Active" },
    { No: "E1F2", SubscriptionName: "Limited Plan", Price: 2, Status: "Inactive" },
    { No: "G3H4", SubscriptionName: "Ultimate Plan", Price: 30, Status: "Active" },
    { No: "I5J6", SubscriptionName: "Global Plan", Price: 40, Status: "Active" },
    { No: "K7L8", SubscriptionName: "Couples Plan", Price: 9, Status: "Active" },
    { No: "M9N0", SubscriptionName: "Loyalty Plan", Price: 8, Status: "Inactive" },
    { No: "O1P2", SubscriptionName: "Monthly Basic", Price: 5, Status: "Active" },
    { No: "Q3R4", SubscriptionName: "Monthly Plus", Price: 11, Status: "Active" },
    { No: "S5T6", SubscriptionName: "Monthly Pro", Price: 20, Status: "Inactive" },
    { No: "U7V8", SubscriptionName: "Monthly Elite", Price: 35, Status: "Active" },
    { No: "W9X0", SubscriptionName: "Student Premium", Price: 6, Status: "Active" },
    { No: "Y1Z2", SubscriptionName: "Teacher Plan", Price: 8, Status: "Inactive" },
    { No: "A3B4", SubscriptionName: "NGO Plan", Price: 2, Status: "Active" },
    { No: "C5D6", SubscriptionName: "Freelancer Plan", Price: 13, Status: "Active" },
    { No: "E7F8", SubscriptionName: "Small Business", Price: 60, Status: "Active" },
    { No: "G9H0", SubscriptionName: "Corporate Plan", Price: 200, Status: "Inactive" }
  ]);

  const handlePaginationChange = (page: number) => {
    setPage(page);
  };

  const handleDeleteMissions = (id: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setSubscriptions((prev) => prev.filter((item) => item.No !== id));
      toast.success("Subscription deleted successfully");
      setDeleteMissions("");
    }, 2000);
  };
  const index = (page - 1) * limit;
  const paginatedSubscriptions = subscriptions.slice(index, index + limit);
  const total = subscriptions.length;

  console.log(open);
  return (
    <div className="rounded-lg shadow-sm border border-gray-100">
      <div className="flex items-center justify-between p-5">
        <h1 className="text-2xl font-bold">All Subscriptions Plan</h1>
        <AdminButton
          label="Subscription"
          icon={<Plus className="w-6 h-6" />}
          onClick={() => setOpen('add')}
        />
      </div>
      <TableComponent
        headers={[
          "No",
          "Subscription Name",
          "Price",
          "Status",
          "Action",
        ]}
      >
        {paginatedSubscriptions?.map((subscription, index) => (
          <tr key={index} className="border-b hover:bg-gray-100">
            <td className="px-6 py-4">{subscription?.No}</td>
            <td className="p-4">{subscription?.SubscriptionName}</td>
            <td className="p-4">{subscription?.Price}</td>
            <td className="p-4">
              <div
                className={`px-3 py-1 rounded-full font-medium w-fit border-dotted border-2 ${
                  subscription?.Status === "Active"
                    ? "bg-green-50 border-green-500 text-green-500"
                    : "bg-red-50 border-red-500 text-red-500"
                }`}
              >
                {subscription?.Status}
              </div>
            </td>
            <td className="p-4 w-32">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setOpen(subscription)}
                  className="text-green-500 bg-green-50 rounded-full p-2 hover:bg-green-500 hover:text-white cursor-pointer transition-all duration-300"
                  title="Update"
                >
                  <Pencil className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setDeleteMissions(subscription)}
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
      <AddEditSubscription open={open} setOpen={setOpen} />

      <DeleteModal
        open={deleteMissions ? "add" : ""}
        setOpen={() => setDeleteMissions("")}
        name={
          typeof deleteMissions === "object"
            ? deleteMissions?.SubscriptionName || ""
            : ""
        }
        handleDelete={() =>
          typeof deleteMissions === "object" &&
          deleteMissions &&
          handleDeleteMissions(deleteMissions.No)
        }
        isLoading={isLoading}
      />
    </div>
  );
}

export default SubscriptionComponent;
