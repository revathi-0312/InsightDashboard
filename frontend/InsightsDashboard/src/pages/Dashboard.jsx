import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import LineChart from "../components/charts/LineChart";
import BarChart from "../components/charts/BarChart";
import PieChart from "../components/charts/PieChart";
import DoughnutChart from "../components/charts/DoughnutChart";
import AreaChart from "../components/charts/AreaChart";
import "../index.css";

const CATEGORIES = ["All", "Electronics", "Clothing", "Books", "Furniture"];
const STATUSES = ["All", "Completed", "Pending", "Cancelled"];

const Dashboard = () => {
  const navigate = useNavigate();

  // ── State ───────────────────────────────────────────────
  const [authChecked, setAuthChecked] = useState(false);
  const [sales, setSales] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Filters
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // ── Auth check ──────────────────────────────────────────
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) navigate("/login");
    else setAuthChecked(true);
  }, [navigate]);

  // ── Fetch sales with filters ────────────────────────────
  const fetchSales = useCallback(async () => {
    setLoading(true);
    setError("");
    try {
      const params = {};
      if (categoryFilter !== "All") params.category = categoryFilter;
      if (statusFilter !== "All") params.status = statusFilter;
      if (fromDate) params.from = fromDate;
      if (toDate) params.to = toDate;

      const res = await axiosInstance.get("/analytics/sales", { params });
      setSales(res.data);
    } catch (err) {
      setError(err.response?.data?.message || "Failed to load data");
      // Fallback dummy data so charts still render
      setSales([
        { category: "Electronics", amount: 12000, status: "Completed", date: "2024-03-01" },
        { category: "Clothing", amount: 8000, status: "Pending", date: "2024-06-15" },
        { category: "Books", amount: 5000, status: "Completed", date: "2024-09-20" },
        { category: "Furniture", amount: 7000, status: "Cancelled", date: "2024-11-05" },
      ]);
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, statusFilter, fromDate, toDate]);

  useEffect(() => {
    if (authChecked) fetchSales();
  }, [authChecked, fetchSales]);

  // ── Guards ──────────────────────────────────────────────
  if (!authChecked) return <p className="status-msg">Checking authentication...</p>;
  if (loading) return <p className="status-msg">Loading dashboard...</p>;

  // ── Computed ────────────────────────────────────────────
  const totalRevenue = sales.reduce((sum, item) => sum + item.amount, 0);
  const totalOrders = sales.length;

  // ── Render ──────────────────────────────────────────────
  return (
    <div className="dashboard">

      {/* ── Header ── */}
      <div className="dashboard-header">
        <h2>📊 Analytics Dashboard</h2>
        <button
          className="logout-btn"
          onClick={() => { localStorage.removeItem("token"); navigate("/login"); }}
        >
          Logout
        </button>
      </div>

      {/* ── Error banner ── */}
      {error && <p className="error-banner">⚠️ {error} — showing sample data</p>}

      {/* ── Filter bar ── */}
      <div className="filter-bar">
        <div className="filter-group">
          <label>Category</label>
          <select value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>Status</label>
          <select value={statusFilter} onChange={e => setStatusFilter(e.target.value)}>
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        <div className="filter-group">
          <label>From Date</label>
          <input type="date" value={fromDate} onChange={e => setFromDate(e.target.value)} />
        </div>

        <div className="filter-group">
          <label>To Date</label>
          <input type="date" value={toDate} onChange={e => setToDate(e.target.value)} />
        </div>

        <button className="reset-btn" onClick={() => {
          setCategoryFilter("All");
          setStatusFilter("All");
          setFromDate("");
          setToDate("");
        }}>
          Reset
        </button>
      </div>

      {/* ── Summary Cards ── */}
      <div className="cards">
        <div className="card">
          <h3>Total Revenue</h3>
          <p>₹ {totalRevenue.toLocaleString()}</p>
        </div>
        <div className="card">
          <h3>Total Orders</h3>
          <p>{totalOrders}</p>
        </div>
        <div className="card">
          <h3>Avg Order Value</h3>
          <p>₹ {totalOrders ? Math.round(totalRevenue / totalOrders).toLocaleString() : 0}</p>
        </div>
      </div>

      {/* ── Charts Grid ── */}
      <div className="charts-grid">
        <div className="chart-container">
          <h4>Revenue Over Time</h4>
          <LineChart data={sales} />
        </div>
        <div className="chart-container">
          <h4>Sales by Category</h4>
          <BarChart data={sales} />
        </div>
        <div className="chart-container">
          <h4>Order Status Distribution</h4>
          <PieChart data={sales} />
        </div>
        <div className="chart-container">
          <h4>Category Proportion</h4>
          <DoughnutChart />
        </div>
        <div className="chart-container">
          <h4>Growth Over Weeks</h4>
          <AreaChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;