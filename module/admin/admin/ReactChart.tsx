import React, { useState } from "react";
import ReactApexChart from "react-apexcharts";
import { ApexOptions } from "apexcharts";

const ReactChart = () => {
  // Function to get last 6 months names
  const getLastSixMonths = () => {
    const months = [];
    const date = new Date();
    for (let i = 5; i >= 0; i--) {
      const month = new Date(date.getFullYear(), date.getMonth() - i, 1);
      months.push(month.toLocaleString("default", { month: "short" }));
    }
    return months;
  };

  // Generate random data for the chart
  const generateRandomData = () => {
    return Array.from(
      { length: 6 },
      () => Math.floor(Math.random() * 100) + 20
    );
  };

  const [state, setState] = useState<{
    series: { name: string; data: number[] }[];
    options: ApexOptions;
  }>({
    series: [
      {
        name: "Active Users",
        data: [45, 52, 38, 61, 0, 55],
      },
      {
        name: "New Signups",
        data: [23, 34, 27, 44, 31, 39],
      },
      {
        name: "Premium Users",
        data: [12, 18, 15, 22, 17, 25],
      },
    ],
    options: {
      chart: {
        type: "bar",
        height: 350,
        stacked: true,
        toolbar: {
          show: true,
        },
        zoom: {
          enabled: true,
        },
      } as const,
      colors: ["#00FF00", "#0000FF", "#FF0000"],
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      xaxis: {
        categories: getLastSixMonths(),
        labels: {
          style: {
            fontSize: "12px",
          },
        },
      },
    },
  });

  return (
    <div className="p-4 rounded-lg bg-gradient-to-b from-[#1DE5B1] to-[#1BA570] shadow-[5px_5px_2px_0_#15614d] hover:brightness-110 transition-all duration-300 cursor-pointer ">
      <h1 className="text-2xl font-bold mb-4 text-white">Subscription Earn</h1>
      <ReactApexChart
        options={state.options}
        series={state.series}
        type="bar"
        height={350}
      />
    </div>
  );
};

export default ReactChart;
