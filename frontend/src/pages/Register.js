import React, { useState } from "react";
import API from "../services/api";
import { useNavigate } from "react-router-dom";
import "./Register.css"; // new CSS for the register page

const Register = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    role: "ROLE_CUSTOMER",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await API.post("/auth/register", form);
      alert("✅ Registration successful! Please login.");
      navigate("/login");
    } catch (err) {
      console.error("Registration failed:", err);
      alert("❌ Registration failed. Try again.");
    }
  };

  return (
    <div className="register-container">
      <div className="register-card">
        <h2 className="register-title">
          🛍️ Create Your <span>ScanShop</span> Account
        </h2>
        <form onSubmit={handleRegister}>
          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              name="username"
              placeholder="Enter username"
              value={form.username}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={form.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="input-group">
            <label>Role</label>
            <select
              name="role"
              value={form.role}
              onChange={handleChange}
            >
              <option value="ROLE_CUSTOMER">🛍️ Customer</option>
              <option value="ROLE_SELLER">🏪 Seller</option>
            </select>
          </div>

          <button type="submit" className="register-btn">
            🚀 Register
          </button>
        </form>

        <div className="register-footer">
          Already have an account?{" "}
          <span onClick={() => navigate("/login")}>Login</span>
        </div>
      </div>
    </div>
  );
};

export default Register;
