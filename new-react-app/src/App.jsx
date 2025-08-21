import axios from 'axios';

axios.defaults.withCredentials = true;

import React from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { toast } from 'react-hot-toast'; // For showing toast notifications
import Navbar from './components/Navbar.jsx';
import { useAppContext } from './context/AppContext'; // Custom context for global state
import LoginModal from './components/LoginModal.jsx';
import MainBanner from './components/MainBanner.jsx';
import Footer from './components/Footer';
import SellerLogin from './components/seller/SellerLogin.jsx';
import BottomBanner from './components/BottomBanner.jsx';
import Categories from './components/Categories.jsx';
import NewLaunch from './components/NewLaunch.jsx';
import ProductCard from './components/ProductCard.jsx';

import AllProducts from './page/AllProducts.jsx';
import { Toaster } from 'react-hot-toast'; // Required to show toasts
import ProductCategory from './page/ProductCategory.jsx';
import ProductDetails from './page/ProductDetails.jsx';
import Cart from './page/Cart.jsx';
import AddAddress from './page/AddAddress.jsx';
import MyOrders from './page/MyOrders.jsx';
import SellerLayout from './page/seller/SellerLayout.jsx';
import ProductList from './page/seller/ProductList.jsx';
import Orders from './page/seller/Orders.jsx';
import AddProduct from './page/seller/AddProduct.jsx';
import Loading from './components/Loading.jsx';

const App = () => {
  const location = useLocation(); // Used to check the current route
  const isSellerPath = location.pathname.includes('/seller'); // If true, we are on a seller page

  // ✅ Get required values from context
  const { showUserLogin, isSeller, loadingSellerAuth } = useAppContext();

  return (
    // 🧱 Wrapper div with general styling
    <div className='text-default min-h-screen text-gray-700 bg-white'>

      {/* Show Navbar only if not in /seller path */}
      {!isSellerPath && <Navbar />}

      {/* Toast notifications */}
      <Toaster />

      {/* Show login modal if showUserLogin is true */}
      {showUserLogin && <LoginModal />}

      {/* Conditional rendering based on seller authentication loading state */}
      {loadingSellerAuth ? (
        // 🕒 Show this while checking auth
        <div className="text-center mt-20 text-lg">Checking authentication...</div>
      ) : (
        // ✅ Routes go here
        <Routes>
          <Route path="/" element={
            <>
              {/* Home page banners */}
              <MainBanner />
              <BottomBanner />
                <Categories />
                <NewLaunch />
                <ProductCard />
            </>
          } />

          {/* Public routes */}
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
          <Route path="/cart/" element={<Cart />} />
          <Route path="/add-address/" element={<AddAddress />} />
          <Route path="/my-orders/" element={<MyOrders />} />
          <Route path="/loader/" element={<Loading/>} />

          {/* Seller Routes */}
          <Route path="/seller" element={isSeller ? <SellerLayout /> : <SellerLogin />}>
            <Route path="add-product" element={<AddProduct />} />
            <Route path="product-list" element={<ProductList />} />
            <Route path="orders" element={<Orders />} />
          </Route>
        </Routes>
      )}

      {/* Show Footer unless in /seller path */}
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
