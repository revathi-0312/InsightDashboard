import { Pie } from "react-chartjs-2";

const PieChart = ({ data = [] }) => {

  if (!data.length) return null;

  const statusCounts = {};

  data.forEach(item => {
    statusCounts[item.status] =
      (statusCounts[item.status] || 0) + 1;
  });

  const chartData = {
    labels: Object.keys(statusCounts),
    datasets: [
      {
        data: Object.values(statusCounts),
        backgroundColor: ["#10b981", "#f59e0b", "#ef4444"]
      }
    ]
  };

  return <Pie data={chartData} options={{ maintainAspectRatio: false }} />
};

export default PieChart;