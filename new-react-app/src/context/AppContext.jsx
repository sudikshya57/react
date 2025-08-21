// AppContext.jsx
import { createContext, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_BACKEND_URL;
axios.defaults.withCredentials = true;

export const AppContext = createContext();

export const AppContextProvider = ({ children }) => {
  const navigate = useNavigate();
  const currency = import.meta.env.VITE_CURRENCY;

  const [user, setUser] = useState(null);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  const [products, setProducts] = useState([]);
  const [cartItems, setCartItems] = useState({});
  const [searchQuery, setSearchQuery] = useState('');

  // ✅ Attach sellerToken automatically to every request
  axios.interceptors.request.use((config) => {
    const sellerToken = localStorage.getItem("sellerToken");
    if (sellerToken) {
      config.headers.Authorization = `Bearer ${sellerToken}`;
    }
    return config;
  });

  // Fetch seller auth status
  const fetchSeller = async () => {
    try {
      const { data } = await axios.get('/api/seller/is-auth');
      setIsSeller(data.success);
    } catch (err) {
      console.log(err.response?.data || err.message);
      setIsSeller(false);
    }
  };

  // Fetch user info and cart
  const fetchUser = async () => {
    try {
      const { data } = await axios.get('/api/user/is-auth');
      if (data.success) {
        setUser(data.user);
        setCartItems(data.user.cartItems || {});
      } else {
        setUser(null);
      }
    } catch (err) {
      console.log(err.response?.data || err.message);
      setUser(null);
    }
  };

  // Fetch product list
  const fetchProducts = async () => {
    try {
      const { data } = await axios.get('/api/product/list');
      if (data.success) setProducts(data.products);
      else toast.error(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  // Add product to cart
  const addToCart = (itemId) => {
    const newCart = structuredClone(cartItems);
    newCart[itemId] = (newCart[itemId] || 0) + 1;
    setCartItems(newCart);
    toast.success("Item added to cart");
  };

  // Update cart item quantity
  const updateCartItem = (itemId, quantity) => {
    const newCart = structuredClone(cartItems);
    newCart[itemId] = quantity;
    setCartItems(newCart);
    toast.success("Cart updated successfully");
  };

  // Remove item from cart
  const removeFromCart = (itemId) => {
    const newCart = structuredClone(cartItems);
    if (newCart[itemId]) {
      delete newCart[itemId];
      setCartItems(newCart);
      toast.success("Removed from cart");
    }
  };

  // Get total item count
  const getCartCount = () => Object.values(cartItems).reduce((sum, qty) => sum + qty, 0);

  // Get total cart amount
  const getCartAmount = () => {
    return Object.entries(cartItems).reduce((total, [id, qty]) => {
      const item = products.find(p => p._id === id);
      if (item) total += (item.offerPrice ?? item.price ?? 0) * qty;
      return total;
    }, 0);
  };

  // Initial data fetch
  useEffect(() => {
    fetchUser();
    fetchSeller(); // ✅ will now include Authorization header
    fetchProducts();
  }, []);

  // Update cart on server
  useEffect(() => {
    const updateCartOnServer = async () => {
      if (!user) return;
      try {
        const { data } = await axios.post('/api/cart/update', {
          userId: user._id,
          cartItems,
        });
        if (!data.success) toast.error(data.message);
      } catch (err) {
        toast.error(err.message);
      }
    };
    updateCartOnServer();
  }, [cartItems, user]);

  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    currency,
    addToCart,
    updateCartItem,
    removeFromCart,
    cartItems,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount,
    axios,
    fetchProducts,
    fetchUser,
    setCartItems,
    fetchSeller,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export const useAppContext = () => useContext(AppContext);
