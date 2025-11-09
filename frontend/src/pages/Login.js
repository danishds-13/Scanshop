import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // Correct import
import "./login.css";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auth/login", { username, password });

      // Extract token from response JSON
      const token = res.data.token;
      if (!token) throw new Error("Token not found in response");

      // Store token in localStorage
      localStorage.setItem("token", token);

      // Decode token to get role
      const decoded = jwtDecode(token);
      const role = decoded.role;

      // Navigate based on role
      if (role === "ROLE_ADMIN") navigate("/admin-dashboard");
      else if (role === "ROLE_SELLER") navigate("/seller-dashboard");
      else navigate("/");

    } catch (error) {
      console.error(error);
      // Display proper error message
      const message = error.response?.data?.error || error.message || "Login failed";
      alert(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Welcome to <span>ScanShop</span></h2>
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <label>👤 Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>🔒 Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn" disabled={loading}>
            {loading ? "Logging in..." : "🚪 Login"}
          </button>
        </form>

        <p className="login-footer">
          Don’t have an account?{" "}
          <span onClick={() => navigate("/register")}>Register</span>
        </p>
      </div>
    </div>
  );
};

export default Login;
