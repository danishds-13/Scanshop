import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cart.css"; // merged styles for both Cart & Orders

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const savedOrders = JSON.parse(localStorage.getItem("orders")) || [];
    setOrders(savedOrders);
  }, []);

  const handleCancelAll = () => {
    if (window.confirm("Are you sure you want to cancel all orders?")) {
      localStorage.removeItem("orders");
      setOrders([]);
    }
  };

  return (
    <div className="orders-page">
      <h2>📦 My Orders</h2>

      {orders.length === 0 ? (
        <p className="empty-cart">No orders found. Start shopping!</p>
      ) : (
        <>
          <div className="orders-grid">
            {orders.map((order) => (
              <div className="order-card" key={order.id}>
                <h4>Order #{order.id}</h4>
                <p><strong>Date:</strong> {new Date(order.orderDate).toLocaleString()}</p>
                <p><strong>Status:</strong> {order.status}</p>
                <p><strong>Customer:</strong> {order.name}</p>
                <p><strong>Address:</strong> {order.address}</p>
                <p><strong>Phone:</strong> {order.phone}</p>
                <p><strong>Payment Mode:</strong> {order.payment}</p>
                <p><strong>Total:</strong> ₹{order.totalPrice}</p>

                <div className="order-items">
                  <h5>Items:</h5>
                  <ul>
                    {order.items.map((item, idx) => (
                      <li key={idx}>
                        {item.name} × {item.quantity}
                      </li>
                    ))}
                  </ul>
                </div>

                {order.qrCode && (
                  <img
                    src={order.qrCode}
                    alt="Order QR"
                    className="order-qr"
                  />
                )}
              </div>
            ))}
          </div>

          <div style={{ textAlign: "center", marginTop: "30px" }}>
            <button className="cancel-all-btn" onClick={handleCancelAll}>
              Cancel All Orders
            </button>
            <button
              className="checkout-btn"
              style={{ marginLeft: "10px" }}
              onClick={() => navigate("/")}
            >
              Back to Home
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default OrdersPage;
