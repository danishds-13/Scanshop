import React, { useState, useEffect } from "react";
import "./agent.css";

const AgentDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [mode, setMode] = useState("");
  const [otherInfo, setOtherInfo] = useState({ reason: "", customerName: "", phone: "" });

  // Load orders from localStorage
  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  // Update order status
  const updateOrderStatus = (id, newStatus) => {
    const updatedOrders = orders.map((o) =>
      o.id === id ? { ...o, status: newStatus } : o
    );
    setOrders(updatedOrders);
    localStorage.setItem("orders", JSON.stringify(updatedOrders));
  };

  const handleConfirmDelivery = (id) => {
    updateOrderStatus(id, "Delivered");
    setSelectedOrder(null);
    setMode("");
    alert("✅ Order marked as Delivered!");
  };

  const handleOtherSubmit = (id) => {
    if (!otherInfo.reason || !otherInfo.customerName || !otherInfo.phone) {
      alert("Please fill all details!");
      return;
    }
    updateOrderStatus(id, "Closed");
    alert("📝 Order marked as Closed (manual update).");
    setSelectedOrder(null);
    setOtherInfo({ reason: "", customerName: "", phone: "" });
  };

  return (
    <div className="agent-dashboard">
      <h2>🚚 Delivery Agent Dashboard</h2>

      {orders.length === 0 ? (
        <p className="empty-cart">No orders found yet.</p>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div className="order-card" key={order.id}>
              <h4>Order #{order.id}</h4>
              <p><strong>Customer:</strong> {order.name}</p>
              <p><strong>Phone:</strong> {order.phone}</p>
              <p><strong>Address:</strong> {order.address}</p>
              <p><strong>Payment:</strong> {order.payment}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p><strong>Total:</strong> ₹{order.totalPrice}</p>

              {order.qrCode && (
                <img src={order.qrCode} alt="Order QR" className="order-qr" />
              )}

              <button
                className="checkout-btn"
                onClick={() => setSelectedOrder(order)}
              >
                Scan & Deliver
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedOrder && (
        <div className="delivery-box">
          <h3>Delivering Order #{selectedOrder.id}</h3>
          <div className="mode-buttons">
            <button className="checkout-btn" onClick={() => setMode("scan")}>📷 Scan QR</button>
            <button className="checkout-btn" onClick={() => setMode("upload")}>📁 Upload QR</button>
            <button className="clear-btn" onClick={() => setMode("other")}>✏️ Others</button>
          </div>

          {mode === "scan" && (
            <div className="scan-box">
              <p>✅ Scanned successfully!</p>
              <button className="checkout-btn" onClick={() => handleConfirmDelivery(selectedOrder.id)}>
                Confirm Delivery
              </button>
            </div>
          )}

          {mode === "upload" && (
            <div className="upload-box">
              <input type="file" accept="image/*" />
              <button className="checkout-btn" onClick={() => handleConfirmDelivery(selectedOrder.id)}>
                Confirm Delivery
              </button>
            </div>
          )}

          {mode === "other" && (
            <div className="other-box">
              <input
                type="text"
                placeholder="Reason"
                value={otherInfo.reason}
                onChange={(e) => setOtherInfo({ ...otherInfo, reason: e.target.value })}
              />
              <input
                type="text"
                placeholder="Customer Name"
                value={otherInfo.customerName}
                onChange={(e) => setOtherInfo({ ...otherInfo, customerName: e.target.value })}
              />
              <input
                type="text"
                placeholder="Phone Number"
                value={otherInfo.phone}
                onChange={(e) => setOtherInfo({ ...otherInfo, phone: e.target.value })}
              />
              <button className="checkout-btn" onClick={() => handleOtherSubmit(selectedOrder.id)}>
                Submit & Close Order
              </button>
            </div>
          )}

          <button className="clear-btn" onClick={() => setSelectedOrder(null)}>
            Close
          </button>
        </div>
      )}
    </div>
  );
};

export default AgentDashboard;
