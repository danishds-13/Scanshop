// src/components/SellerNavbar.js
import React from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "./SellerNavbar.css";

const SellerNavbar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="seller-navbar">
      <div className="seller-navbar-container">
        <h2 className="seller-logo" onClick={() => navigate("/seller/dashboard")}>
          🛒 Seller Panel
        </h2>

        <div className="seller-nav-links">
          <Link
            to="/seller/dashboard"
            className={`seller-link ${location.pathname === "/seller/dashboard" ? "active" : ""}`}
          >
            My Products
          </Link>

          <Link
            to="/seller/add-product"
            className={`seller-link ${location.pathname === "/seller/add-product" ? "active" : ""}`}
          >
            ➕ Add Product
          </Link>

          <button className="seller-logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default SellerNavbar;
