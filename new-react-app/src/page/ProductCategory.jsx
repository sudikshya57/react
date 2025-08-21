

 import React from 'react';
import { useParams } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';
import { categories } from '../assets/assets';
import ProductCard from '../components/ProductCard';

const ProductCategory = () => {
  const { category } = useParams();
  const { products } = useAppContext();

  const searchCategory = categories.find(
    (item) => item?.path?.toLowerCase() === category?.toLowerCase()
  );

  const filteredProducts = products.filter(
    (product) =>
      product?.category?.toLowerCase() === category?.toLowerCase()
  );

  return (
    <div className="mt-16 flex flex-col">
      {searchCategory && (
        <div className="flex flex-col items-end w-max">
          <p className="text-2xl font-medium uppercase">{searchCategory.text}</p>
          <div className="w-16 h-0.5 bg-primary rounded-full" />
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-1 mt-6">
        {filteredProducts.map((product, index) => (
          <ProductCard key={index} product={product} />
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <p className="mt-6 text-gray-600">No products found for this category.</p>
      )}
    </div>
  );
};


export default ProductCategory;
