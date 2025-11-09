import React, { useEffect, useState } from "react";
import API from "../services/api";
import QRCode from "react-qr-code";
import "./orders.css"; // you can rename to profile.css if you want later

const Profile = () => {
  const [orders, setOrders] = useState([]);
  const username = localStorage.getItem("username");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await API.get(`/orders/${username}`);
        setOrders(res.data);
      } catch (err) {
        console.error("Error fetching orders:", err);
        setOrders(JSON.parse(localStorage.getItem("orders")) || []);
      }
    };
    fetchOrders();
  }, [username]);

  return (
    <div className="orders-page">
      <h2>My Orders</h2>
      {orders.length === 0 && <p>No orders found.</p>}

      {orders.map((order) => (
        <div className="order-card" key={order.id}>
          <h4>Order #{order.id}</h4>
          <p>Date: {new Date(order.orderDate).toLocaleString()}</p>
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.totalPrice}</p>

          <h5>Items:</h5>
          <ul>
            {order.items.map((item, index) => (
              <li key={index}>
                {item.name} × {item.quantity}
              </li>
            ))}
          </ul>

          <div style={{ marginTop: "15px", textAlign: "center" }}>
            <QRCode
              value={`Order ID: ${order.id}, Total: ₹${order.totalPrice}`}
              size={120}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Profile;
