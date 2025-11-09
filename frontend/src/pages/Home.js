import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import { jwtDecode } from "jwt-decode";
import Toast from "../components/Toast";
import "./Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [toast, setToast] = useState({ show: false, message: "" });
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        jwtDecode(token);
      } catch (error) {
        console.error("Invalid token:", error);
      }
    }
  }, []);

  useEffect(() => {
    API.get("/admin/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.error("Failed to fetch products:", err));
  }, []);

  const handleAddToCart = (product) => {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingIndex = cart.findIndex((item) => item.id === product.id);

    if (existingIndex > -1) {
      cart[existingIndex].quantity += 1;
    } else {
      cart.push({ ...product, quantity: 1 });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    setToast({
      show: true,
      message: `${product.name} added to cart!`,
    });
  };

  const handleViewCart = () => {
    setToast({ ...toast, show: false });
    navigate("/cart");
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <h1>
          🛍️ Welcome to <span className="highlight">ScanShop</span>
        </h1>
        <p className="subtitle">
          Discover top products curated just for you. Shop, explore, and enjoy!
        </p>
      </header>

      <main className="product-section">
        {products.length === 0 ? (
          <div className="no-products">
            <p>No products available at the moment.</p>
          </div>
        ) : (
          <div className="product-grid">
            {products.map((product) => (
              <div key={product.id} className="product-card modern-card">
                <div className="image-container">
                  <img
                    src={
                      product.image
                        ? `data:image/jpeg;base64,${product.image}`
                        : "https://via.placeholder.com/300x200"
                    }
                    alt={product.name}
                  />
                </div>
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p className="price">₹{product.price.toFixed(2)}</p>
                  <button
                    className="add-btn"
                    onClick={() => handleAddToCart(product)}
                  >
                    🛒 Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className="home-footer">
        © {new Date().getFullYear()} <span>ScanShop</span> — All Rights Reserved
      </footer>

      <Toast
        show={toast.show}
        message={toast.message}
        onClose={() => setToast({ ...toast, show: false })}
        onViewCart={handleViewCart}
      />
    </div>
  );
};

export default Home;
