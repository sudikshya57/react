import React from 'react';
import assets from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const Categories = () => {
  const navigate = useNavigate();

  return (
    <div className='mt-16 pb-16'>
      <p className='text-2xl md:text-3xl font-medium'>CATEGORIES</p>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4'>
        {assets.categories.map((category, index) => (
          <div
            key={index}
            className='group cursor-pointer flex flex-col items-center justify-center gap-2 p-4 border rounded-lg hover:bg-gray-100 transition-all duration-300'
            style={{ backgroundColor: category.bgColor }}
            onClick={() => {
              navigate(`/products/${category.path.toLowerCase()}`);
              scrollTo(0, 0);
            }}
          >
            <img
              src={category.image}
              alt={category.text}
              className="group-hover:scale-105 transition max-w-28"
            />
            <p className="text-sm font-medium">{category.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Categories;
