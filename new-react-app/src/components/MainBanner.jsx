import React from 'react';
import { Link } from 'react-router-dom';
import assets from '../assets/assets';

const MainBanner = () => {
  return (
    <div className='relative w-full'>
      {/* Banner Image */}
      <img src={assets.images.profile} alt="banner" className='w-full hidden md:block' />
      <img src={assets.images.profile_small} alt="banner" className='w-full md:hidden' />

      {/* Overlay Content */}
      <div className='absolute top-10 left-1/2 transform -translate-x-1/2 text-center px-4 z-10'>
        <h1 className='text-3xl md:text-4xl font-bold text-black mb-4'>Trash Talk? We Recycle It.</h1>

        {/* Explore Products - for medium and up */}
        <Link
          to="/products"
          className='group flex items-center justify-center gap-2 bg-white text-black px-4 py-2 rounded-full shadow hover:bg-gray-100 transition-all duration-300'
        >
          Explore Products
          <img src={assets.images.black_arrow_icon} alt="arrow" className='w-4 h-4' />
        </Link>
      </div>
    </div>
  );
};

export default MainBanner;
