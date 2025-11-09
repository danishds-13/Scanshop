import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import SellerDashboard from "./pages/SellerDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import AddProduct from "./pages/AddProduct";
import QRScanner from "./components/QRScanner";
import CartPage from "./pages/Cart";
import OrdersPage from "./pages/OrdersPage";
import Profile from "./pages/Profile";
import AgentDashboard from "./pages/AgentDashboard";
import AgentScan from "./pages/AgentScan";
import AgentSettings from "./pages/AgentSettings";
import { jwtDecode } from "jwt-decode";

function App() {
  const [userRole, setUserRole] = useState(null);

  // Decode JWT to get user role
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role);
      } catch (error) {
        console.error("Invalid token:", error);
        setUserRole(null);
      }
    }
  }, []);

  return (
    <Router>
      {/* Navbar always visible */}
      <Navbar userRole={userRole} />

      <Routes>
        {/* 🌐 Common Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />

        {/* 🛍️ Seller Routes */}
        <Route path="/seller/dashboard" element={<SellerDashboard />} />
        <Route path="/seller/add-product" element={<AddProduct />} />

        {/* 🧑‍💼 Admin Routes */}
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/add-product" element={<AddProduct />} />

        {/* 📱 QR Scanner */}
        <Route path="/qr" element={<QRScanner />} />

        {/* 🛒 Customer Pages */}
        <Route path="/cart" element={<CartPage />} />
        <Route path="/orders" element={<OrdersPage />} />

        {/* 🚚 Agent Pages */}
        <Route path="/agent/dashboard" element={<AgentDashboard />} />
        <Route path="/agent/scan/:id" element={<AgentScan />} />
        <Route path="/agent/settings" element={<AgentSettings />} />
      </Routes>
    </Router>
  );
}

export default App;
