import React, { useEffect, useState } from 'react';
import assets from '../assets/assets';
import { useAppContext } from '../context/AppContext';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; // import toast if you want to show notifications

const InputField = ({ type, placeholder, name, handleChange, address, label }) => {
  return (
    <div className="flex flex-col">
      {label && <label className="text-sm text-gray-600 mb-1">{label}</label>}
      <input
        className='w-full px-3 py-2 border border-gray-300 rounded outline-none focus:border-[#7C9100] focus:ring-1 focus:ring-[#7C9100] transition'
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        name={name}
        value={address[name] || ''}
        required
      />
    </div>
  );
};

const AddAddress = () => {
  const { axios, user } = useAppContext();
  const navigate = useNavigate();

  const [address, setAddress] = useState({
    firstName: '',
    lastName: '',
    email: '',
    street: '',
    city: '',
    state: '',
    zipcode: '',
    country: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setAddress((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('/api/address/add', { address });

      if (data.success) {
        toast.success(data.message);
        navigate('/cart');
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (!user) {
      navigate('/cart');
    }
  }, [user, navigate]);

  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl text-gray-500'>
        Add Shipping <span className='font-semibold text-[#8DA100]'>Address</span>
      </p>

      <div className='flex flex-col md:flex-row justify-between mt-10'>
        <div className='flex-1 max-w-md'>
          <form onSubmit={onSubmitHandler} className='space-y-4 mt-6 text-sm'>
            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name='firstName'
                type='text'
                placeholder="First Name"
                label="First Name"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name='lastName'
                type='text'
                placeholder="Last Name"
                label="Last Name"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name='email'
              type='email'
              placeholder="Email Address"
              label="Email"
            />

            <InputField
              handleChange={handleChange}
              address={address}
              name='street'
              type='text'
              placeholder="Street"
              label="Street"
            />

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name='city'
                type='text'
                placeholder="City"
                label="City"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name='state'
                type='text'
                placeholder="State"
                label="State"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <InputField
                handleChange={handleChange}
                address={address}
                name='zipcode'
                type='number'
                placeholder="Zip code"
                label="Zip Code"
              />
              <InputField
                handleChange={handleChange}
                address={address}
                name='country'
                type='text'
                placeholder="Country"
                label="Country"
              />
            </div>

            <InputField
              handleChange={handleChange}
              address={address}
              name='phone'
              type='text'
              placeholder="Phone"
              label="Phone"
            />

            <button
              type="submit"
              className='w-full mt-6 bg-[#8DA100] text-white py-3 hover:bg-[#7C9100] transition cursor-pointer uppercase'
            >
              Save Address
            </button>
          </form>
        </div>

        <div className="flex items-center justify-center mt-8 md:mt-0 md:ml-8">
          <img
            src={assets.images.add_address_image}
            alt="Add Address"
            className="w-64 h-auto max-w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default AddAddress;
