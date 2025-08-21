import React from 'react';
import assets from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';  // <-- import this

const ProductCard = ({ product }) => {
  const navigate = useNavigate();  // <-- use this hook here
  const { currency, addToCart, removeFromCart, cartItems } = useAppContext();

  if (!product) return null;

  return (
    <div
      onClick={() => {
        navigate(`/products/${product.category.toLowerCase()}/${product._id}`);
        window.scrollTo(0, 0);
      }}
      className="border border-gray-300 rounded-md p-3 bg-white min-w-56 max-w-56 w-full"
      style={{ backgroundColor: '#f0f0f0' }}
    >
      {/* Image Container */}
      <div className="w-full h-[160px] flex items-center justify-center overflow-hidden mb-2 bg-white rounded">
        <img
          className="h-full object-contain transform transition duration-500 ease-in-out hover:scale-110"
          src={product.image[0]}
          alt={product.name}
        />
      </div>

      {/* Category */}
      <div className="text-gray-500 text-sm">{product.category}</div>

      {/* Name */}
      <p className="text-gray-800 font-semibold text-base truncate">{product.name}</p>

      {/* Price & Cart Button */}
      <div className="flex items-center justify-between mt-3">
        <p className="text-base font-medium text-gray-700">
          {currency}{product.price.toFixed(2)}
        </p>

        <div
          onClick={(e) => e.stopPropagation()}
          className="text-primary"
        >
          {!cartItems[product._id] ? (
            <button
              className="flex items-center justify-center gap-1 bg-white border border-gray-400 px-3 py-1 rounded text-sm hover:bg-gray-200 transition"
              onClick={() => addToCart(product._id)}
            >
              <img
                src={assets.images.add_cart_icon}
                alt="cart_icon"
                className="w-4 h-4"
              />
              Add
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-primary-100 px-2 py-1 rounded select-none">
              <button
                onClick={() => removeFromCart(product._id)}
                className="text-lg px-2"
              >
                -
              </button>
              <span className="w-5 text-center">{cartItems[product._id]}</span>
              <button
                onClick={() => addToCart(product._id)}
                className="text-lg px-2"
              >
                +
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
