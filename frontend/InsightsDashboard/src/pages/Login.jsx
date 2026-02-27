import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await axios.post(`${import.meta.env.VITE_API_URL || "http://localhost:5000/api"}/auth/login`, { email, password });
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
        navigate("/dashboard");
      }
    } catch (err) {
      setError(err.response?.data?.message || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">

      {/* ── Left Hero Panel ── */}
      <div className="login-hero">
        <div className="hero-content">
          <div className="hero-logo">📊</div>
          <h1 className="hero-title">InsightBoard</h1>
          <p className="hero-subtitle">
            Your real-time analytics dashboard.<br />
            Visualise sales, revenue &amp; trends at a glance.
          </p>
          <div className="hero-stats">
            <div className="hero-stat"><span>5+</span><label>Chart Types</label></div>
            <div className="hero-stat"><span>Live</span><label>Data Filters</label></div>
            <div className="hero-stat"><span>JWT</span><label>Secured</label></div>
          </div>
        </div>
        {/* Decorative blobs */}
        <div className="blob blob-1" />
        <div className="blob blob-2" />
      </div>

      {/* ── Right Form Panel ── */}
      <div className="login-panel">
        <form className="login-form" onSubmit={handleLogin}>
          <div className="form-brand">
            <span>📊</span> InsightBoard
          </div>
          <h2>Welcome Back</h2>
          <p className="form-hint">Sign in to access your dashboard</p>

          {error && <div className="error">{error}</div>}

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              placeholder="admin@test.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-submit" disabled={loading}>
            {loading ? "Signing in…" : "Sign In →"}
          </button>
        </form>
      </div>

    </div>
  );
};

export default Login;