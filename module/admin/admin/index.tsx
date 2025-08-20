"use client";
import CardAdmin from "./CardAdmin";
import UsersInformationComponent from "../users_information";
import LeaderboardComponent from "../users_information/leaderboard";
import { useOverViewQuery } from "@/redux/features/dashboard/dashboard.api";

function AdminComponent() {
  const { data } = useOverViewQuery(undefined);
  const overView = data?.data;
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {[
          { title: "Total Active Users", amount: overView?.activeUsers },
          { title: "Total Paid Users", amount: "0" },
          { title: "Total Users", amount: overView?.totalUsers },
        ].map((item, index) => (
          <CardAdmin key={index} title={item.title} amount={item.amount} />
        ))}
      </div>
      <div className="rounded-lg border border-gray-100 grid grid-cols-1 xl:grid-cols-3 gap-4 p-5">
        <div className="col-span-2 border border-gray-200 rounded-lg">
          <UsersInformationComponent from="dashboard" />
        </div>
        <LeaderboardComponent />
      </div>
    </div>
  );
}

export default AdminComponent;
