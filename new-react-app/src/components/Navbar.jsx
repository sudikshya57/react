import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Assets from '../assets/assets.js';
import { useAppContext } from '../context/AppContext';
import toast from 'react-hot-toast';

const Navbar = () => {
  const navigate = useNavigate(); // ✅ React Router v6 hook
  const [open, setOpen] = useState(false);

  const {
    user,
    setUser,
    setShowUserLogin,
    setSearchQuery,
    searchQuery,
    getCartCount,
    axios,
  } = useAppContext();

  const logout = async () => {
    try {
      const { data } = await axios.get('/api/user/logout' , { withCredentials: true });
      if (data.success) {
        toast.success(data.message);
        setUser(null);
        navigate('/'); // ✅ redirect home after logout
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (searchQuery.length > 0) {
      navigate('/products');
    }
  }, [searchQuery, navigate]);

  return (
    <nav className="flex items-center justify-between px-4 md:px-10 lg:px-16 xl:px-20 py-4 border-b border-[#8DA100] bg-[#FAFDF2] relative transition-all">
      <NavLink to="/" onClick={() => setOpen(false)} className="flex items-center gap-2">
        <img className="h-10" src={Assets.images.logo} alt="logo" />
      </NavLink>

      <div className="hidden sm:flex flex-1 justify-between items-center text-[#5E473A] ml-4">
        <div className="flex items-center gap-6">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/products">All Product</NavLink>
          <NavLink to="/contact">Contact</NavLink>
        </div>

        <div className="hidden lg:flex items-center text-sm gap-2 border border-[#8DA100] px-3 rounded-full">
          <input
            onChange={(e) => setSearchQuery(e.target.value)}
            className="py-1.5 w-full bg-transparent outline-none placeholder-black text-black"
            type="text"
            placeholder="Search products"
            value={searchQuery}
          />
          <img src={Assets.images.search_icon} alt="search" className="w-4 h-4" />
        </div>

        <div className="flex items-center gap-6">
          <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
            <img src={Assets.images.nav_cart_icon} alt="cart" className="w-5 h-5" />
            <button className="absolute -top-2 -right-3 text-xs text-white bg-red-600 w-[18px] h-[18px] rounded-full">
              {getCartCount()}
            </button>
          </div>

          {!user ? (
            <button
              onClick={() => setShowUserLogin(true)}
              className="cursor-pointer px-6 py-2 bg-[#8DA100] hover:bg-[#99A73F] transition text-white rounded-full"
            >
              Login
            </button>
          ) : (
            <div className="relative group cursor-pointer">
              <img src={Assets.images.profile_icon} className="w-10" alt="profile" />
              <ul className="hidden group-hover:flex absolute top-10 right-0 bg-white shadow-lg border border-gray-200 py-2 w-36 rounded-lg text-sm text-[#5E473A] flex-col z-50 space-y-1">
                <li
                  onClick={() => navigate('/my-orders')}
                  className="px-4 py-2 hover:bg-[#f0e9e3] cursor-pointer"
                >
                  My Order
                </li>
                <li
                  onClick={logout}
                  className="px-4 py-2 hover:bg-[#f0e9e3] cursor-pointer"
                >
                  Logout
                </li>
              </ul>
            </div>
          )}
        </div>
      </div>

      {/* Mobile Navbar */}
      <div className="flex items-center gap-6 sm:hidden">
        <div onClick={() => navigate('/cart')} className="relative cursor-pointer">
          <img src={Assets.images.nav_cart_icon} alt="cart" className="w-5 h-5" />
          <button className="absolute -top-2 -right-3 text-xs text-white bg-red-600 w-[18px] h-[18px] rounded-full">
            {getCartCount()}
          </button>
        </div>
        <button onClick={() => setOpen(!open)} aria-label="Menu">
          <img src={Assets.images.menu_icon} alt="menu" className="w-6 h-6" />
        </button>
      </div>

      {open && (
        <div className="absolute top-[60px] left-0 w-full bg-[#FAFDF2] shadow-md py-4 flex-col items-start gap-2 px-5 text-sm md:hidden text-[#5E473A]">
          <NavLink to="/" onClick={() => setOpen(false)}>
            Home
          </NavLink>
          <NavLink to="/products" onClick={() => setOpen(false)}>
            All products
          </NavLink>
          {user && (
            <NavLink to="/my-orders" onClick={() => setOpen(false)}>
              My orders
            </NavLink>
          )}
          <NavLink to="/contact" onClick={() => setOpen(false)}>
            Contact
          </NavLink>

          {!user ? (
            <button
              onClick={() => {
                setOpen(false);
                setShowUserLogin(true);
              }}
              className="cursor-pointer px-6 py-2 mt-2 bg-[#A7BA47] hover:bg-[#7C9100] transition text-white rounded-full text-sm"
            >
              Login
            </button>
          ) : (
            <button
              onClick={logout}
              className="cursor-pointer px-6 py-2 mt-2 bg-[#A7BA47] hover:bg-[#7C9100] transition text-white rounded-full text-sm"
            >
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
