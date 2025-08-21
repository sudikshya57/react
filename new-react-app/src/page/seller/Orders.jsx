// Orders.jsx
import React, { useEffect, useState } from 'react';
import { useAppContext } from '../../context/AppContext';
import assets, { dummyOrders } from '../../assets/assets';
import toast from 'react-hot-toast'; // ✅ fix: toast import

const Orders = () => {
  const { currency, axios } = useAppContext();
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await axios.get('/api/orders/seller'); // uses the new backend route
      if(data.success){
        setOrders(data.orders)
      }else{
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.message)
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // small helpers to keep your structure but avoid crashes if address is a string
  const renderName = (addr) =>
    typeof addr === 'object' ? `${addr?.firstName || ''} ${addr?.lastName || ''}`.trim() : '';
  const renderLine1 = (addr) =>
    typeof addr === 'object'
      ? `${addr?.street || ''}, ${addr?.city || ''}`.replace(/^, |, $/g, '')
      : String(addr || '');
  const renderLine2 = (addr) =>
    typeof addr === 'object'
      ? `${addr?.state || ''}, ${addr?.zipcode || ''}, ${addr?.country || ''}`.replace(/^, |, $/g, '')
      : '';
  const renderPhone = (addr) => (typeof addr === 'object' ? addr?.phone || '' : '');

  return (
    <div className='no-scrollbar flex-1 h-[95vh] overflow-y-scroll'>
      <div className="md:p-10 p-4 space-y-4">
        <h2 className="text-lg font-medium">Orders List</h2>
        {orders.map((order, index) => (
          <div key={order.id || order._id || index} className="flex flex-col md:items-center md:flex-row gap-5 justify-between p-5 max-w-4xl rounded-md border border-gray-300">
            <div className="flex gap-5 max-w-80">
              <img className="w-12 h-12 object-cover" src={assets.images.box_icon} alt="boxIcon" />
              <div>
                {order.items.map((item, idx) => (
                  <div key={(item.product?._id || idx) + idx} className="flex flex-col">
                    <p className="font-medium">
                      {item.product?.name || 'Product'}{" "}
                      <span className="text-[#8DA100]">x {item.quantity}</span>
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="text-sm md:text-base text-black/60">
              <p className='text-black/80'>{renderName(order.address)}</p>
              <p>{renderLine1(order.address)}</p>
              <p>{renderLine2(order.address)}</p>
              <p>{renderPhone(order.address)}</p>
            </div>

            <p className="font-medium text-lg my-auto">{currency}{order.amount}</p>

            <div className="flex flex-col text-sm md:text-base text-black/60 ">
              <p>Method: {order.paymentType}</p>
              <p>Date: {new Date(order.createdAt).toLocaleDateString()}</p>
              <p>Payment: {order.isPaid ? "Paid" : "Pending"}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
