import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./agent.css";

const AgentScan = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [mode, setMode] = useState("");
  const [formData, setFormData] = useState({ name: "", reason: "" });
  const [fakeScanValue, setFakeScanValue] = useState("");
  const [uploadProof, setUploadProof] = useState(null);

  // ✅ Load order details from localStorage
  useEffect(() => {
    const orders = JSON.parse(localStorage.getItem("orders")) || [];
    const foundOrder = orders.find((o) => o.id.toString() === id);
    setOrder(foundOrder || null);
  }, [id]);

  const handleModeSelect = (selectedMode) => setMode(selectedMode);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadProof(URL.createObjectURL(file));
    }
  };

  // ✅ Simulate QR Scan (using input field)
  const handleFakeScan = () => {
    if (fakeScanValue.trim() === "") {
      alert("⚠️ Enter a QR data value to simulate scan.");
      return;
    }
    alert("✅ QR Code scanned successfully!");
  };

  // ✅ Confirm Delivery (store to cache/localStorage)
  const handleConfirm = () => {
    if (!formData.name) {
      alert("⚠️ Please enter your name before confirming.");
      return;
    }

    const allOrders = JSON.parse(localStorage.getItem("orders")) || [];
    const updatedOrders = allOrders.map((o) => {
      if (o.id.toString() === id) {
        return {
          ...o,
          status: "Delivered",
          deliveredBy: formData.name,
          reason: formData.reason || "N/A",
          proof: uploadProof || null,
          fakeScanData: fakeScanValue || null,
          deliveryDate: new Date().toISOString(),
        };
      }
      return o;
    });

    localStorage.setItem("orders", JSON.stringify(updatedOrders));
    alert("✅ Order marked as delivered!");
    navigate("/agentdashboard");
  };

  if (!order) {
    return <p className="no-orders">❌ Order not found.</p>;
  }

  return (
    <div className="agent-scan-container">
      <h2>📦 Deliver Order #{order.id}</h2>

      <div className="order-summary">
        <p><strong>Name:</strong> {order.name}</p>
        <p><strong>Address:</strong> {order.address}</p>
        <p><strong>Phone:</strong> {order.phone}</p>
        <p><strong>Status:</strong> {order.status}</p>
        <p><strong>Total:</strong> ₹{order.totalPrice}</p>
      </div>

      <hr className="divider" />

      {/* Mode Buttons */}
      <div className="mode-buttons">
        <button
          className={`mode-btn ${mode === "scan" ? "active" : ""}`}
          onClick={() => handleModeSelect("scan")}
        >
          🔍 Scan QR (Simulated)
        </button>
        <button
          className={`mode-btn ${mode === "upload" ? "active" : ""}`}
          onClick={() => handleModeSelect("upload")}
        >
          📤 Upload Proof
        </button>
        <button
          className={`mode-btn ${mode === "skip" ? "active" : ""}`}
          onClick={() => handleModeSelect("skip")}
        >
          🚫 Skip (Other Reason)
        </button>
      </div>

      {/* SCAN SECTION */}
      {mode === "scan" && (
        <div className="scan-section">
          <h3>Simulate QR Scan</h3>
          <input
            type="text"
            placeholder="Enter QR data (simulate scan)"
            value={fakeScanValue}
            onChange={(e) => setFakeScanValue(e.target.value)}
          />
          <button className="confirm-btn" onClick={handleFakeScan}>
            ✅ Simulate Scan
          </button>
        </div>
      )}

      {/* UPLOAD SECTION */}
      {mode === "upload" && (
        <div className="upload-section">
          <h3>Upload Delivery Proof</h3>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {uploadProof && (
            <div>
              <p>📸 Proof Preview:</p>
              <img
                src={uploadProof}
                alt="proof"
                style={{ width: "100%", borderRadius: "10px", marginTop: "10px" }}
              />
            </div>
          )}
        </div>
      )}

      {/* SKIP SECTION */}
      {mode === "skip" && (
        <div className="other-section">
          <h3>Reason for Skipping Delivery</h3>
          <input
            type="text"
            name="reason"
            placeholder="Enter reason"
            value={formData.reason}
            onChange={handleInputChange}
          />
        </div>
      )}

      {/* Agent Confirmation */}
      <div className="other-section">
        <h3>Agent Confirmation</h3>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          value={formData.name}
          onChange={handleInputChange}
        />
        <button className="confirm-btn" onClick={handleConfirm}>
          ✅ Confirm Delivery
        </button>
      </div>
    </div>
  );
};

export default AgentScan;
