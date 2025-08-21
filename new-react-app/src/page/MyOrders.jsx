import React, { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import Assets from "../assets/assets";

const MyOrders = () => {
  const [myOrders, setMyOrders] = useState([]);
  const { currency, axios, user } = useAppContext();

  const fetchMyOrders = async () => {
    try {
      const { data } = await axios.get("/api/orders/user", {
        withCredentials: true, // ✅ send cookies (auth)
      });

      if (data.success) {
        setMyOrders(data.orders);
      }
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  useEffect(() => {
    if (user) {
      fetchMyOrders();
    }
  }, [user]);

  return (
    <div className="mt-16 pb-16">
      <h2 className="text-2xl font-medium uppercase text-black mb-8">
        My Orders
      </h2>

      {myOrders.length === 0 && (
        <p className="text-center text-gray-500 mt-8">No orders found.</p>
      )}

      {myOrders.map((order, orderIndex) => (
        <div
          key={order._id || orderIndex}
          className="w-full border border-gray-300 rounded-md p-4 mb-6 text-black"
        >
          {/* Order header */}
          <div className="flex justify-between text-sm md:text-base font-medium mb-4">
            <span>OrderId: {order._id}</span>
            <span>Payment: {order.paymentType}</span>
            <span>
              Total Amount: {currency}
              {order.amount}
            </span>
          </div>

          {/* Order items */}
          {order.items.map((item, index) => {
            // ✅ Handle both populated and dummy product
            const product =
              item.product && item.product._id ? item.product : null;

            return (
              <div
                key={index}
                className={`flex items-center justify-between gap-4 py-4 px-2 ${
                  index !== order.items.length - 1
                    ? "border-b border-gray-200"
                    : ""
                }`}
              >
                {/* Product Image + Name */}
                <div className="flex items-center gap-4 w-1/3">
                  <div className="p-2 bg-gray-100 rounded-md">
                    {product && product.image && product.image[0] ? (
                      <img
                        src={product.image[0]}
                        alt={product.name}
                        className="w-14 h-14 object-contain"
                      />
                    ) : (
                      <img
                        src={Assets.noImage}
                        alt="No Image"
                        className="w-14 h-14 object-contain"
                      />
                    )}
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-black">
                      {product?.name || "Product not found"}
                    </h3>
                    <p className="text-black text-sm">
                      Category: {product?.category || "N/A"}
                    </p>
                  </div>
                </div>

                {/* Quantity + Status + Date */}
                <div className="text-sm text-black w-1/3">
                  <p>Quantity: {item.quantity || "1"}</p>
                  <p>Status: {order.status}</p>
                  <p>
                    Date:{" "}
                    {order.createdAt
                      ? new Date(order.createdAt).toLocaleDateString()
                      : "N/A"}
                  </p>
                </div>

                {/* Amount */}
                <div className="text-base font-semibold text-black w-1/3 text-right">
                  Amount: {currency}
                  {product ? product.price * item.quantity : 0}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default MyOrders;
