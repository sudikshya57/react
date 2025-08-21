import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";
import Assets from "../assets/assets";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const {
    products,
    currency,
    cartItems,
    removeFromCart,
    getCartCount,
    updateCartItem,
    getCartAmount,
    axios,
    user,
    setCartItems,
  } = useAppContext();

  const [cartArray, setCartArray] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [showAddress, setShowAddress] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentOption, setPaymentOption] = useState("COD");

  // Build cart array and add _id for backend
  useEffect(() => {
    const getCart = () => {
      let tempArray = [];
      for (const key in cartItems) {
        const product = products.find((item) => String(item._id) === String(key));
        if (product) {
          tempArray.push({
            ...product,
            _id: product._id, // add _id explicitly
            quantity: cartItems[key],
          });
        }
      }
      setCartArray(tempArray);
    };
    if (products.length > 0) getCart();
  }, [products, cartItems]);

  // Get user addresses
  useEffect(() => {
    const getUserAddresses = async () => {
      if (!user) return;
      try {
        const { data } = await axios.get(`/api/address/get?userId=${user._id}`);
        if (data.success && data.addresses.length > 0) {
          setAddresses(data.addresses);
          setSelectedAddress(data.addresses[0]);
        }
      } catch (error) {
        toast.error(error.message);
      }
    };
    getUserAddresses();
  }, [user]);

  // Place order
  const placeOrder = async () => {
    try {
      if (!user) return toast.error("User not logged in!");
      if (!selectedAddress) return toast.error("Please select a delivery address.");
      if (cartArray.length === 0) return toast.error("Cart is empty.");

      const addressString = [
        selectedAddress.street,
        selectedAddress.city,
        selectedAddress.state,
        selectedAddress.country,
      ]
        .filter(Boolean)
        .join(", ");

      const itemsToSend = cartArray.map((item) => ({
        _id: item._id,       // MongoDB product ID
        product: item._id,   // matches backend Order model
        name: item.name,
        price: Number(item.offerPrice ?? item.price),
        quantity: Number(item.quantity),
      }));

      const paymentOptionNormalized = paymentOption.toUpperCase(); // "COD" or "ONLINE"

      if (paymentOptionNormalized === "COD") {
        const { data } = await axios.post(
          "/api/orders/cod",
          { items: itemsToSend, address: addressString },
          { withCredentials: true }
        );
        if (data.success) {
          toast.success(data.message);
          setCartItems({});
          navigate("/my-orders");
        } else toast.error(data.message);
      } else if (paymentOptionNormalized === "ONLINE") {
        const { data } = await axios.post(
          "/api/orders/stripe",
          { items: itemsToSend, address: addressString },
          { withCredentials: true }
        );
        if (data.success && data.url) {
          window.location.href = data.url;
        } else toast.error(data.message || "Stripe checkout failed.");
      }
    } catch (error) {
      console.error("Order placement error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message || "Order placement failed");
    }
  };

  if (!products.length)
    return <div className="p-10 text-center">Loading products...</div>;

  return (
    <div className="flex flex-col md:flex-row mt-16">
      {/* Cart Items */}
      <div className="flex-1 max-w-4xl">
        <h1 className="text-3xl font-medium mb-6">
          Shopping Cart <span className="text-sm text-[#8DA100]">({getCartCount()})</span>
        </h1>
        <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
          <p className="text-left">Product Details</p>
          <p className="text-center">Subtotal</p>
          <p className="text-center">Action</p>
        </div>

        {cartArray.length > 0 ? (
          cartArray.map((product, i) => (
            <div
              key={i}
              className="grid grid-cols-[2fr_1fr_1fr] items-center text-sm md:text-base font-medium pt-3"
            >
              <div className="flex items-center md:gap-6 gap-3">
                <div
                  onClick={() => {
                    navigate(
                      `/products/${product.category.toLowerCase()}/${product._id}`
                    );
                    window.scrollTo(0, 0);
                  }}
                  className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded"
                >
                  <img
                    className="max-w-full h-full object-cover"
                    src={product.image[0]}
                    alt={product.name}
                  />
                </div>
                <div className="flex flex-col">
                  <p className="font-semibold">{product.name}</p>
                  <div className="flex items-center mt-1">
                    <p className="mr-1">Qty:</p>
                    <select
                      value={cartItems[product._id]}
                      onChange={(e) =>
                        updateCartItem(product._id, Number(e.target.value))
                      }
                      className="outline-none border border-gray-300 rounded px-1"
                    >
                      {Array.from({ length: 10 }, (_, i) => i + 1).map((q) => (
                        <option key={q} value={q} disabled={q < cartItems[product._id]}>
                          {q}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>
              <p className="text-center">
                {currency}
                {((product.offerPrice ?? product.price) * product.quantity).toFixed(2)}
              </p>
              <button
                onClick={() => removeFromCart(product._id)}
                className="cursor-pointer mx-auto"
              >
                <img
                  src={Assets.images.delete_icon || ""}
                  alt="remove"
                  className="inline-block w-6 h-6"
                />
              </button>
            </div>
          ))
        ) : (
          <p>No items in cart.</p>
        )}

        <button
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0);
          }}
          className="group cursor-pointer flex items-center mt-8 gap-2 text-[#8DA100] font-medium"
        >
          <img
            className="group-hover:-translate-x-1 transition h-6 w-6"
            src={Assets.images.arrow_right_icon_colored || ""}
            alt="arrow"
          />
          Continue Shopping
        </button>
      </div>

      {/* Order Summary */}
      <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
        <h2 className="text-xl font-medium">Order Summary</h2>
        <hr className="border-gray-300 my-5" />
        <div className="mb-6">
          <p className="text-sm font-medium uppercase">Delivery Address</p>
          <div className="relative flex justify-between items-start mt-2">
            <p className="text-gray-500">
              {selectedAddress
                ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.state}, ${selectedAddress.country}`
                : "No address found"}
            </p>
            <button
              onClick={() => setShowAddress(!showAddress)}
              className="text-[#8DA100] hover:underline cursor-pointer"
            >
              Change
            </button>
            {showAddress && (
              <div className="absolute top-12 py-1 bg-white border border-gray-300 text-sm w-full z-10">
                {addresses.map((a, i) => (
                  <p
                    key={i}
                    onClick={() => {
                      setSelectedAddress(a);
                      setShowAddress(false);
                    }}
                    className="text-gray-500 p-2 hover:bg-gray-100"
                  >
                    {a.street}, {a.city}, {a.state}, {a.country}
                  </p>
                ))}
                <p
                  onClick={() => navigate("/add-address")}
                  className="text-[#8DA100] text-center cursor-pointer p-2 hover:bg-[#8DA100]"
                >
                  Add address
                </p>
              </div>
            )}
          </div>
          <p className="text-sm font-medium uppercase mt-6">Payment Method</p>
          <select
            onChange={(e) => setPaymentOption(e.target.value)}
            className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none"
          >
            <option value="COD">Cash On Delivery</option>
            <option value="Online">Online Payment</option>
          </select>
        </div>
        <hr className="border-gray-300" />
        <div className="text-gray-500 mt-4 space-y-2">
          <p className="flex justify-between">
            <span>Price</span>
                       <span>{currency + getCartAmount().toFixed(2)}</span>
          </p>
          <p className="flex justify-between">
            <span>Shipping Fee</span>
            <span className="text-green-600">Free</span>
          </p>
          <p className="flex justify-between">
            <span>Tax (2%)</span>
            <span>{currency + ((getCartAmount() * 2) / 100).toFixed(2)}</span>
          </p>
          <p className="flex justify-between text-lg font-medium mt-3">
            <span>Total Amount:</span>
            <span>
              {currency +
                (getCartAmount() + (getCartAmount() * 2) / 100).toFixed(2)}
            </span>
          </p>
        </div>
        <button
          onClick={placeOrder}
          className="w-full py-3 mt-6 cursor-pointer bg-[#8DA100] text-white font-medium hover:bg-indigo-600 transition"
        >
          {paymentOption === "COD" ? "Place Order" : "Proceed to Checkout"}
        </button>
      </div>
    </div>
  );
};

export default Cart;
 
