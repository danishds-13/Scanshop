import React from "react";

const ProductCard = ({ product, userRole }) => {
  return (
    <div className="bg-white p-4 rounded-2xl shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 border border-yellow-100">
      <div className="relative">
        <img
          src={product.imageUrl || "https://via.placeholder.com/200x180"}
          alt={product.name}
          className="w-full h-48 object-cover rounded-xl mb-4"
        />

        {userRole === "ROLE_SELLER" && (
          <span className="absolute top-2 right-2 bg-blue-500 text-white text-xs font-semibold px-2 py-1 rounded">
            Seller
          </span>
        )}
        {userRole === "ROLE_ADMIN" && (
          <span className="absolute top-2 right-2 bg-gray-700 text-white text-xs font-semibold px-2 py-1 rounded">
            Admin
          </span>
        )}
      </div>

      <h2 className="text-lg font-bold text-gray-800 mb-1 truncate">
        {product.name}
      </h2>

      <p className="text-yellow-600 font-semibold text-lg mb-3">
        ₹{product.price?.toLocaleString()}
      </p>

      {/* Role-Based Buttons */}
      {userRole === "ROLE_CUSTOMER" && (
        <button className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 rounded-xl w-full font-medium transition">
          🛒 Add to Cart
        </button>
      )}

      {userRole === "ROLE_SELLER" && (
        <div className="flex gap-3">
          <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg font-medium transition">
            ✏️ Edit
          </button>
          <button className="flex-1 bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg font-medium transition">
            🗑️ Delete
          </button>
        </div>
      )}

      {userRole === "ROLE_ADMIN" && (
        <div className="flex gap-3">
          <button className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg font-medium transition">
            ✅ Approve
          </button>
          <button className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg font-medium transition">
            🚫 Remove
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductCard;
