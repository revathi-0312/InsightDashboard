import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const BarChart = ({ data = [] }) => {

  if (!data.length) return <p>No data available</p>;

  const categories = [...new Set(data.map(item => item.category))];

  const chartData = {
    labels: categories,
    datasets: [
      {
        label: "Sales by Category",
        data: categories.map(cat =>
          data
            .filter(item => item.category === cat)
            .reduce((sum, item) => sum + item.amount, 0)
        ),
        backgroundColor: "#4f46e5"
      }
    ]
  };

  return <Bar data={chartData} options={{ maintainAspectRatio: false }} />;
};

export default BarChart;