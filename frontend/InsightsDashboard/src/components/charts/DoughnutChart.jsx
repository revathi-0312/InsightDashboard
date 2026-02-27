import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DoughnutChart = () => {
  const chartData = { // renamed from 'data' to 'chartData'
    labels: ["Electronics", "Clothing", "Books", "Furniture"],
    datasets: [
      {
        data: [40, 30, 15, 15],
        backgroundColor: ["#6366f1", "#ec4899", "#f59e0b", "#14b8a6"],
      },
    ],
  };

  return <Doughnut data={chartData} options={{ maintainAspectRatio: false }} />;
};

export default DoughnutChart;