import React, { useState } from "react";
import "./seller.css";

const SellerDashboard = () => {
  const [productName, setProductName] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) setImagePreview(URL.createObjectURL(file));
  };

  const handleAddProduct = (e) => {
    e.preventDefault();

    const newProduct = {
      name: productName,
      price,
      category,
      description,
      image: imagePreview,
    };

    setProducts([...products, newProduct]);
    setMessage("✅ Product added successfully!");
    setTimeout(() => setMessage(""), 3000);

    setProductName("");
    setPrice("");
    setCategory("");
    setDescription("");
    setImagePreview(null);
  };

  return (
    <div className="seller-dashboard">
      <h2 className="dashboard-title">🛒 Seller Dashboard</h2>

      <div className="add-product-card">
        <h3>Add New Product</h3>
        <form onSubmit={handleAddProduct}>
          <input
            type="text"
            placeholder="Product Name"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Price (₹)"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          />
          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
          <label className="file-label">
            Upload Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>

          {imagePreview && (
            <img
              src={imagePreview}
              alt="Preview"
              className="preview-image"
            />
          )}

          <button type="submit" className="add-button">
            ➕ Add Product
          </button>
        </form>

        {message && <p className="success-message">{message}</p>}
      </div>

      <div className="product-list-section">
        <h3>My Products</h3>
        <div className="product-grid">
          {products.length === 0 ? (
            <p className="no-products">No products added yet.</p>
          ) : (
            products.map((p, i) => (
              <div key={i} className="product-card">
                {p.image && <img src={p.image} alt={p.name} />}
                <h4>{p.name}</h4>
                <p className="price">₹{p.price}</p>
                <p className="category">{p.category}</p>
                <p className="desc">{p.description}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default SellerDashboard;
