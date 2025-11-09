import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./agent.css";

const AgentDashboard = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  // ✅ Fetch all customer orders from localStorage (for now)
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // ✅ Refresh orders after updates (optional manual refresh)
  const handleRefresh = () => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  };

  return (
    <div className="agent-dashboard">
      <header className="agent-header">
        <h2>📦 Delivery Agent Dashboard</h2>
        <button className="refresh-btn" onClick={handleRefresh}>
          🔄 Refresh
        </button>
      </header>

      {orders.length === 0 ? (
        <p className="no-orders">No customer orders available right now.</p>
      ) : (
        <div className="agent-order-grid">
          {orders.map((order) => (
            <div key={order.id} className="agent-order-card">
              <h4>Order #{order.id}</h4>
              <p><strong>Customer:</strong> {order.name}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Payment Mode:</strong> {order.payment}</p>
              <p><strong>Total:</strong> ₹{order.totalPrice}</p>

              <p>
                <strong>Status:</strong>{" "}
                <span
                  className={`status-tag ${
                    order.status === "Delivered"
                      ? "status-delivered"
                      : order.status === "Closed Manually"
                      ? "status-closed"
                      : "status-pending"
                  }`}
                >
                  {order.status}
                </span>
              </p>

              <div className="agent-actions">
                <button
                  className="scan-btn"
                  onClick={() => navigate(`/agent/scan/${order.id}`)}
                >
                  🚚 Scan & Deliver
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;
