import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const AreaChart = () => {
  const data = {
    labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
    datasets: [
      {
        label: "Growth",
        data: [5000, 8000, 12000, 15000],
        backgroundColor: "rgba(34,197,94,0.3)",
        borderColor: "#22c55e",
        fill: true,
        tension: 0.4
      }
    ]
  };

  return <Line data={data} options={{ maintainAspectRatio: false }} />;
};

export default AreaChart;