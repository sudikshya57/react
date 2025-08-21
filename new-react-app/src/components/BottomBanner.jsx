import React from 'react';
import assets from '../assets/assets';
import { features } from '../assets/assets';

const BottomBanner = () => {
  return (
    <div className='relative w-full'>
      <img src={assets.images.bottom_banner} alt="banner" className='w-full hidden md:block' />
      <img src={assets.images.bottom_banner_sm} alt="banner" className='w-full md:hidden' />

     <div className="absolute top-0 left-0 w-full h-full flex items-center justify-end pr-8 md:pr-24">
  <div>
    <h1 className="text-2xl md:text-3xl font-semibold text-black mb-6">Why we are the best?</h1>

    {features.map((feature, index) => (
      <div key={index} className="flex items-start gap-4 mt-4 max-w-md">
        <img src={feature.icon} alt={feature.title} className="md:w-11 w-9" />
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-black">{feature.title}</h3>
          <p className="text-sm text-black/70">{feature.description}</p>
        </div>
      </div>
    ))}
  </div>
</div>
 
    </div>
  );
};

export default BottomBanner;
