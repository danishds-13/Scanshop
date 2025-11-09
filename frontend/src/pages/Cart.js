import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import QRCode from "qrcode";
import "./Cart.css";

const bargainQuotes = [
  "💬 Good things come to those who bargain twice!",
  "💸 Sometimes, one more offer brings the best deal!",
  "😎 Let’s see if you can charm a better price this time!"
];

const CartPage = () => {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    phone: "",
    payment: "Cash on Delivery",
  });
  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [bargainAttempts, setBargainAttempts] = useState(0);
  const [quote, setQuote] = useState("");
  const [offerValue, setOfferValue] = useState("");
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    if (!formData.name || !formData.address || !formData.phone) {
      alert("Please fill all details before checkout.");
      return;
    }
    setShowModal(true);
    setQuote(bargainQuotes[bargainAttempts]);
  };

  const handleBargainTry = () => {
    if (offerValue.trim() === "") {
      alert("Please enter an offer amount.");
      return;
    }

    let offer = parseFloat(offerValue);
    if (isNaN(offer) || offer <= 0) {
      alert("Enter a valid amount.");
      return;
    }

    const minAcceptable = totalPrice * 0.8; // Accept offers within 20% discount
    if (offer >= minAcceptable || bargainAttempts >= 2) {
      handleAcceptOffer(offer);
    } else {
      if (bargainAttempts < 2) {
        setBargainAttempts(bargainAttempts + 1);
        setQuote(bargainQuotes[bargainAttempts + 1]);
        alert("Nice try! But that offer’s too low 😅 — try a slightly better one!");
      } else {
        handleAcceptOffer(totalPrice);
      }
    }
  };

  const handleAcceptOffer = async (finalPrice) => {
    setShowModal(false);

    const newOrder = {
      id: Date.now(),
      items: cart,
      totalPrice: finalPrice,
      ...formData,
      orderDate: new Date().toISOString(),
      status: "Pending",
    };

    try {
      const qrData = await QRCode.toDataURL(
        JSON.stringify({
          orderId: newOrder.id,
          name: newOrder.name,
          total: newOrder.totalPrice,
          items: newOrder.items.map((i) => i.name).join(", "),
        })
      );

      newOrder.qrCode = qrData;

      const existingOrders = JSON.parse(localStorage.getItem("orders")) || [];
      existingOrders.push(newOrder);
      localStorage.setItem("orders", JSON.stringify(existingOrders));

      localStorage.removeItem("cart");
      setCart([]);

      // Show success popup instead of alert
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        navigate("/orders");
      }, 2500);
    } catch (error) {
      console.error("QR generation failed:", error);
      alert("Something went wrong while generating the QR.");
    }
  };

  const handleClearCart = () => {
    localStorage.removeItem("cart");
    setCart([]);
  };

  return (
    <div className="cart-container">
      <h2>Your Cart</h2>

      <div className="cart-box">
        {cart.length === 0 ? (
          <p className="empty-cart">No items in the cart.</p>
        ) : (
          cart.map((item, index) => (
            <div className="cart-item" key={index}>
              <span>
                {item.name} × {item.quantity}
              </span>
              <span>₹{item.price * item.quantity}</span>
            </div>
          ))
        )}

        <div className="cart-total">Total: ₹{totalPrice}</div>

        {cart.length > 0 && (
          <>
            <div className="order-form">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="address"
                placeholder="Address"
                value={formData.address}
                onChange={handleInputChange}
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <select
                name="payment"
                value={formData.payment}
                onChange={handleInputChange}
              >
                <option>Cash on Delivery</option>
                <option>UPI</option>
                <option>Card</option>
              </select>
            </div>

            <div className="cart-buttons">
              <button className="checkout-btn" onClick={handleCheckout}>
                Bargain & Checkout
              </button>
              <button className="clear-btn" onClick={handleClearCart}>
                Clear Cart
              </button>
            </div>
          </>
        )}
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>🧾 Let’s make a deal!</h3>
            <p>{quote}</p>
            <input
              type="number"
              className="offer-input"
              placeholder="Enter your offer amount ₹"
              value={offerValue}
              onChange={(e) => setOfferValue(e.target.value)}
            />
            <div className="modal-buttons">
              <button className="modal-btn try" onClick={handleBargainTry}>
                Try Offer
              </button>
              <button
                className="modal-btn accept"
                onClick={() => handleAcceptOffer(totalPrice)}
              >
                Accept Current Price
              </button>
            </div>
          </div>
        </div>
      )}

      {showSuccess && (
        <div className="success-popup">
          <div className="success-box">
            <div className="success-icon">✅</div>
            <h3>Order Placed Successfully!</h3>
            <p>You’ll be redirected to your orders page shortly.</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
