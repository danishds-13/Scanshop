import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import "./Navbar.css";

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [cartCount, setCartCount] = useState(0);
  const [userRole, setUserRole] = useState(null);

  const token = localStorage.getItem("token");

  // ✅ Decode token to get user role
  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUserRole(decoded.role || decoded.userRole || decoded.userType);
      } catch (error) {
        console.error("Invalid token:", error);
        setUserRole(null);
      }
    } else {
      setUserRole(null);
    }
  }, [token]);

  // ✅ Detect if agent page
  const isAgentPage = location.pathname.startsWith("/agent");

  // ✅ Cart count (for normal customers)
  useEffect(() => {
    if (!isAgentPage && userRole !== "seller" && userRole !== "admin") {
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      setCartCount(cart.reduce((acc, item) => acc + item.quantity, 0));
    }
  }, [token, isAgentPage, userRole]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("cart");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* 🛍️ Logo */}
        <div
          className="logo cursor-pointer"
          onClick={() =>
            navigate(
              isAgentPage
                ? "/agent/dashboard"
                : userRole === "seller"
                ? "/seller/dashboard"
                : userRole === "admin"
                ? "/admin/dashboard"
                : "/"
            )
          }
        >
          🛍️ ScanShop
        </div>

        {/* 🔗 Links */}
        <div className="nav-links">
          {/* 🏠 Common (for normal users) */}
          {!isAgentPage && userRole !== "seller" && userRole !== "admin" && (
            <>
              <Link to="/" className="nav-link">Home</Link>
              {token && <Link to="/cart" className="nav-link">🛒 Cart ({cartCount})</Link>}
              {token && <Link to="/orders" className="nav-link">My Orders</Link>}
              {!token && (
                <>
                  <Link to="/login" className="nav-link">Login</Link>
                  <Link to="/register" className="nav-link">Register</Link>
                </>
              )}
            </>
          )}

          {/* 🧑‍💼 Seller Routes */}
          {userRole === "seller" && (
            <>
              <Link to="/seller/dashboard" className="nav-link">Seller Dashboard</Link>
              <Link to="/seller/add-product" className="nav-link">Add Product</Link>
            </>
          )}

          {/* 🧑‍💻 Admin Routes */}
          {userRole === "admin" && (
            <>
              <Link to="/admin/dashboard" className="nav-link">Admin Dashboard</Link>
              <Link to="/admin/add-product" className="nav-link">Add Product</Link>
            </>
          )}

          {/* 🚚 Agent Routes */}
          {isAgentPage && (
            <>
              <Link to="/agent/dashboard" className="nav-link">Agent Dashboard</Link>
              <Link to="/agent/settings" className="nav-link">Account Settings</Link>
            </>
          )}

          {/* 🔒 Logout */}
          {token && (
            <button onClick={handleLogout} className="nav-button">
              Logout
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
