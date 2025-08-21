import React from "react";
import { useAppContext } from "../../context/AppContext";
import { Link, NavLink, Outlet } from "react-router-dom";
import assets from "../../assets/assets";
import toast from "react-hot-toast";

const SellerLayout = () => {
  const { axios, navigate } = useAppContext();

  const sidebarLinks = [
    { name: "Add Product", path: "/seller/add-product", icon: assets.images.add_icon },
    { name: "Product List", path: "/seller/product-list", icon: assets.images.product_list_icon },
    { name: "Orders", path: "/seller/orders", icon: assets.images.order_icon },
  ];

  const logout = async () => {
    try {
      const { data } = await axios.post("/api/seller/logout"); // ✅ use POST
      if (data.success) {
        toast.success(data.message);
        navigate("/");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <>
      {/* Top Navbar */}
      <div className="flex items-center justify-between px-4 md:px-8 border-b border-gray-300 py-3 bg-white">
        {/* Logo */}
        <Link to="/">
          <img
            src={assets.images.logo}
            alt="logo"
            className="cursor-pointer w-24 md:w-30 h-auto"
          />
        </Link>

        {/* Right Section: Greeting + Logout */}
        <div className="flex items-center gap-3 text-gray-700">
          {/* Greeting */}
          <p className="text-sm">Hi! Admin</p>

          {/* Logout Button */}
          <button
            onClick={logout}
            className="bg-white hover:bg-gray-100 text-gray-700 font-semibold py-1 px-3 border border-gray-300 rounded-full transition duration-300 text-xs"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Sidebar + Page Outlet */}
      <div className="flex">
        {/* Sidebar */}
        <div className="md:w-64 w-16 border-r h-[95vh] text-base border-gray-300 pt-4 flex flex-col transition-all duration-300">
          {sidebarLinks.map((item) => (
            <NavLink
              to={item.path}
              key={item.name}
              end={item.path === "/seller"}
              className={({ isActive }) =>
                `flex items-center py-3 px-4 gap-3 ${
                  isActive
                    ? "border-r-4 md:border-r-[6px] border-[#8DA100] bg-gray-100 text-black"
                    : "hover:bg-gray-100/90 border-white text-gray-700"
                }`
              }
            >
              <img src={item.icon} alt={item.name} className="w-6 h-6" />
              <p className="md:block hidden text-center text-sm">{item.name}</p>
            </NavLink>
          ))}
        </div>

        {/* Page Content */}
        <div className="flex-1 px-4 py-6">
          <Outlet />
        </div>
      </div>
    </>
  );
};

export default SellerLayout;
