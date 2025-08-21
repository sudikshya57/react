import React from 'react'

import ProductCard from './ProductCard'
import { useAppContext } from '../context/AppContext'; // Adjust the import path as needed

const NewLaunch = () => {
  const { products } = useAppContext(); // Assuming you have a context for products
  return (
    <div className='mt-16 pb-16'>
      <p className="text-2xl md:text-3xl font-medium">NEW LAUNCH</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 ">
        {products
          .filter((product) => product.inStock)
          .slice(0, 5)
          .map((product, index) => (
            <ProductCard key={index} product={product} />
          ))}

      </div>
    </div>
  )
}

export default NewLaunch
