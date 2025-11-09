import React, { useEffect } from "react";
import "./Toast.css";

const Toast = ({ message, show, onClose, onViewCart }) => {
  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 3500); // visible for 3.5 seconds
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <div className={`toast ${show ? "show" : ""}`}>
      <span>{message}</span>
      {onViewCart && (
        <button className="toast-button" onClick={onViewCart}>
          View Cart 🛒
        </button>
      )}
    </div>
  );
};

export default Toast;
