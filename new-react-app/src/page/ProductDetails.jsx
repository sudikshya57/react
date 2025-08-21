import { useEffect, useState } from "react";
import { useAppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import ProductCard from "../components/ProductCard";

const ProductDetails = () => {
  const { products, navigate, currency, addToCart } = useAppContext();
  const { category, id } = useParams();

  const product = products.find(
    (item) =>
      (item._id === id || String(item._id) === id) &&
      item.category?.toLowerCase() === category?.toLowerCase()
  );

  const [thumbnail, setThumbnail] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    if (Array.isArray(product?.image) && product.image.length > 0) {
      setThumbnail(product.image[0]);
    } else {
      setThumbnail(null);
    }
  }, [product]);

  useEffect(() => {
    if (products.length > 0 && product) {
      const sameCategory = products.filter(
        (item) =>
          item.category === product.category &&
          item._id !== product._id &&
          item.inStock
      );
      setRelatedProducts(sameCategory.slice(0, 5));
    }
  }, [products, product]);

  if (!product) {
    return (
      <div className="mt-12 text-center text-lg text-red-600">
        Product not found.
      </div>
    );
  }

  return (
    <div className="mt-12">
      <p>
        <Link to="/">Home</Link> / <Link to="/products">Products</Link> /
        <Link to={`/products/${product.category.toLowerCase()}/${product._id}`}>
          {" "}{product.category}
        </Link>{" "}
        / <span className="text-[#8DA100] font-medium"> {product.name}</span>
      </p>

      <div className="flex flex-col md:flex-row gap-16 mt-4">
        {/* Image Section */}
        <div className="flex gap-3">
          <div className="flex flex-col gap-3">
            {Array.isArray(product.image) &&
              product.image.map((image, index) => (
                <div
                  key={index}
                  onClick={() => setThumbnail(image)}
                  className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer"
                >
                  <img src={image} alt={`Thumbnail ${index + 1}`} />
                </div>
              ))}
          </div>

          <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
            <img
              src={thumbnail || (product.image && product.image[0])}
              alt="Selected product"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="text-sm w-full md:w-1/2">
          <h1 className="text-3xl font-medium text-[#8DA100]">{product.name}</h1>

          <div className="mt-6">
            <p className="text-2xl font-medium text-[#8DA100]">
              MRP: {currency}
              {product.offerPrice || product.price}
            </p>
            <span className="text-gray-500/70">(inclusive of all taxes)</span>
          </div>

          <p className="text-base font-medium mt-6">About Product</p>
          <ul className="list-disc ml-4 text-gray-500/70">
            {Array.isArray(product.description) ? (
              product.description.map((desc, index) => <li key={index}>{desc}</li>)
            ) : (
              <li>No description available.</li>
            )}
          </ul>

          <div className="flex items-center mt-10 gap-4 text-base">
            <button
              onClick={() => addToCart(product._id)}
              className="w-full py-3.5 cursor-pointer font-medium bg-[#8DA100] text-white hover:bg-[#7C9100] transition"
            >
              Add to Cart
            </button>
            <button
              onClick={() => {
                addToCart(product._id);
                navigate("/cart");
              }}
              className="w-full py-3.5 cursor-pointer font-medium bg-[#8DA100] text-white hover:bg-[#7C9100] transition"
            >
              Buy now
            </button>
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div className="flex flex-col items-center mt-20">
        <div className="flex flex-col items-center w-max">
          <p className="text-lg font-semibold text-[#8DA100]">RELATED PRODUCTS</p>
          <div className="w-20 h-0.5 bg-[#8DA100] rounded-full mt-2"></div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6 w-full">
          {relatedProducts.map((related, index) => (
            <ProductCard key={index} product={related} />
          ))}
        </div>

        <button
          onClick={() => {
            navigate("/products");
            window.scrollTo(0, 0);
          }}
          className="mx-auto cursor-pointer px-12 my-16 py-2.5 border border-[#8DA100] rounded text-[#8DA100] hover:bg-[#7C9100] hover:text-white transition"
        >
          See more
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;
