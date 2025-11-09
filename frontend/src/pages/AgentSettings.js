import React, { useState, useEffect } from "react";
import { QRCodeCanvas } from "qrcode.react";
import "./agent.css";

const AgentSettings = () => {
  const [agent, setAgent] = useState({
    name: "",
    email: "",
    phone: "",
    id: "",
  });

  useEffect(() => {
    // Load mock agent info from localStorage or default
    const saved = JSON.parse(localStorage.getItem("agentInfo")) || {
      name: "Delivery Agent",
      email: "agent@scanshop.com",
      phone: "9876543210",
      id: "AGT-" + Math.floor(Math.random() * 10000),
    };
    setAgent(saved);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAgent((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    localStorage.setItem("agentInfo", JSON.stringify(agent));
    alert("✅ Profile updated successfully!");
  };

  return (
    <div className="agent-page">
      <h2>⚙️ Agent Account Settings</h2>

      <div className="agent-settings">
        <label>Name</label>
        <input
          type="text"
          name="name"
          value={agent.name}
          onChange={handleChange}
        />

        <label>Email</label>
        <input
          type="email"
          name="email"
          value={agent.email}
          onChange={handleChange}
        />

        <label>Phone</label>
        <input
          type="text"
          name="phone"
          value={agent.phone}
          onChange={handleChange}
        />

        <label>Agent ID</label>
        <input type="text" value={agent.id} readOnly />

        <button className="save-btn" onClick={handleSave}>
          Save Changes
        </button>
      </div>

      <div className="agent-qr">
        <h4>Agent QR ID:</h4>
        <QRCodeCanvas value={agent.id} size={150} />
      </div>
    </div>
  );
};

export default AgentSettings;
