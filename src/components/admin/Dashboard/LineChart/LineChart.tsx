import Chart from "chart.js/auto";
import { useEffect, useRef } from "react";

import { useGetBookingChartQuery } from "@/services/admin/transaction";

type Props = {
  month: String;
  totalBookingAmount: String;
  totalDepositAmount: String;
};

const LineChart = () => {
  const chartRef = useRef<any>();
  const chartObj = useRef<any>();
  const { data: lineData } = useGetBookingChartQuery();
  const createLineChart = (el: any) => {
    chartObj.current = new Chart(el, {
      type: "line",
      data: {
        labels: lineData?.map((row: Props) => row.month),
        datasets: [
          {
            label: "Deposit",
            data: lineData?.map((row: Props) => row.totalDepositAmount),
            tension: 0.4,
            borderColor: "#18A0FB",
            backgroundColor: "#18A0FB",
          },
          {
            label: "Booking",
            data: lineData?.map((row: Props) => row.totalBookingAmount),
            tension: 0.4,
            borderColor: "#FF860A",
            backgroundColor: "#FF860A",
          },
        ],
      },
    });
  };

  useEffect(() => {
    const el = chartRef.current;
    // const el = document.getElementById("chart");
    if (chartObj.current) chartObj.current.destroy();
    createLineChart(el);

    return () => chartObj.current.destroy();
  }, [chartObj.current]);
  return <canvas ref={chartRef} className="w-full"></canvas>;
};

export default LineChart;
