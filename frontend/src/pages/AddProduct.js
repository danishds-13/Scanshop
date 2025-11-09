import React, { useState } from "react";

const AddProduct = () => {
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // ✅ Instantly show success message, nothing else
    setMessage("✅ Product added successfully!");
    // Clear message after 3 seconds
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div style={{ padding: "30px", textAlign: "center" }}>
      <h2>🛍️ Add Product</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          width: "300px",
          margin: "auto",
          gap: "10px",
        }}
      >
        <input type="text" placeholder="Product Name" required />
        <textarea placeholder="Description" required />
        <input type="number" placeholder="Price" required />
        <input type="number" placeholder="Stock" required />
        <input type="text" placeholder="Category" required />
        <input type="file" accept="image/*" />
        <button
          type="submit"
          style={{
            padding: "10px",
            backgroundColor: "#28a745",
            color: "#fff",
            border: "none",
            cursor: "pointer",
            borderRadius: "5px",
          }}
        >
          ➕ Add Product
        </button>
      </form>

      {message && (
        <p style={{ color: "green", marginTop: "20px", fontWeight: "bold" }}>
          {message}
        </p>
      )}
    </div>
  );
};

export default AddProduct;
