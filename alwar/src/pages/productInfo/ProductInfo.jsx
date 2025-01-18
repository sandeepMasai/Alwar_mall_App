import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { doc, getDoc } from "firebase/firestore";
import toast from "react-hot-toast";
import { fireDB } from "../../firebase/FirebaseConfig";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";
import myContext from "../../context/myContext";
import Layout from "../../components/layout/Layout";
import Loader from "../../components/loader/Loader";

const StockIndicator = ({ stock }) => {
  let color = 'gray';
  let text = 'Out of Stock';
  let bgColor = 'bg-gray-100';
  
  if (stock > 20) {
    color = 'green';
    text = 'In Stock';
    bgColor = 'bg-green-100';
  } else if (stock > 0) {
    color = 'orange';
    text = `Only ${stock} left`;
    bgColor = 'bg-orange-100';
  }

  return (
    <div className={`flex items-center ${bgColor} rounded-full px-3 py-1 max-w-fit`}>
      <div className={`w-2 h-2 rounded-full bg-${color}-500 mr-2`}></div>
      <span className={`text-${color}-700 text-sm font-medium`}>{text}</span>
    </div>
  );
};

const ProductInfo = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { loading, setLoading } = useContext(myContext);
  const cartItems = useSelector((state) => state.cart);
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const getProductData = async () => {
    setLoading(true);
    try {
      const productDoc = await getDoc(doc(fireDB, "products", id));
      if (productDoc.exists()) {
        setProduct({ ...productDoc.data(), id: productDoc.id });
      } else {
        toast.error("Product not found");
      }
    } catch (error) {
      toast.error("Error loading product");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProductData();
  }, [id]);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const handleQuantityChange = (newQuantity) => {
    const maxAvailable = product?.stock || 0;
    const validQuantity = Math.max(1, Math.min(maxAvailable, newQuantity));
    setQuantity(validQuantity);
  };

  const handleCartAction = () => {
    if (isProductInCart) {
      dispatch(deleteFromCart(product));
      toast.success("Removed from cart");
    } else {
      if (product.stock < 1) {
        toast.error("Product is out of stock");
        return;
      }
      dispatch(addToCart({ ...product, quantity }));
      toast.success("Added to cart");
    }
  };

  const isProductInCart = cartItems.some((p) => p.id === product?.id);

  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <p className="text-lg text-gray-600">Product not found</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="max-w-6xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Image Section */}
            <div className="flex flex-col space-y-4">
              <div className="aspect-w-1 aspect-h-1 rounded-lg overflow-hidden bg-gray-100">
                <img
                  src={product.productImageUrl}
                  alt={product.title}
                  className="object-contain w-full h-64 md:h-80"
                />
              </div>
            </div>

            {/* Product Details Section */}
            <div className="flex flex-col space-y-4">
              {/* Title and Stock Status */}
              <div className="flex justify-between items-start">
                <div>
                  <h1 className="text-2xl font-semibold text-gray-800">
                    {product.title}
                  </h1>
                  <p className="text-sm text-gray-500 mt-1">
                    Category: {product.category || 'General'}
                  </p>
                </div>
                <StockIndicator stock={product.stock} />
              </div>

              {/* Rating */}
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, idx) => (
                  <svg
                    key={idx}
                    className={`w-4 h-4 ${
                      idx < Math.floor(product.rating || 0) 
                        ? 'text-yellow-400' 
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="text-sm text-gray-500 ml-2">
                  ({product.rating || 0} rating)
                </span>
              </div>

              {/* Price */}
              <div className="text-2xl font-bold text-gray-900">
                ₹{product.price?.toLocaleString()}
              </div>

              {/* Description */}
              <div className="text-gray-600 text-sm">
                <h3 className="font-medium text-gray-800 mb-1">Description:</h3>
                <p className="leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              {product.stock > 0 && (
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-600">Quantity:</span>
                  <div className="flex items-center border border-gray-300 rounded-md">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      disabled={quantity <= 1}
                    >
                      -
                    </button>
                    <input
                      type="number"
                      min="1"
                      max={product.stock}
                      value={quantity}
                      onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                      className="w-12 text-center border-x border-gray-300 py-1"
                    />
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                      disabled={quantity >= product.stock}
                    >
                      +
                    </button>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex flex-col space-y-3 mt-4">
                <button
                  onClick={handleCartAction}
                  disabled={product.stock < 1}
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    isProductInCart
                      ? 'bg-red-500 hover:bg-red-600 text-white'
                      : product.stock < 1
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-teal-500 hover:bg-teal-600 text-white'
                  }`}
                >
                  {isProductInCart ? 'Remove from Cart' : 'Add to Cart'}
                </button>
                
                <button 
                  className={`px-6 py-2 rounded-md text-sm font-medium transition-colors ${
                    product.stock < 1
                      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
                      : 'bg-gray-800 hover:bg-gray-900 text-white'
                  }`}
                  disabled={product.stock < 1}
                >
                  Buy Now
                </button>
              </div>

              {/* Stock Details */}
              <div className="border-t border-gray-200 pt-4 mt-4">
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="text-gray-500">Availability Status:</span>
                    <span className={`ml-2 font-medium ${
                      product.stock > 20 
                        ? 'text-green-600' 
                        : product.stock > 0 
                        ? 'text-orange-600' 
                        : 'text-red-600'
                    }`}>
                      {product.stock > 20 
                        ? 'In Stock' 
                        : product.stock > 0 
                        ? `Limited Stock (${product.stock} left)`
                        : 'Out of Stock'}
                    </span>
                  </div>
                  {product.brand && (
                    <div>
                      <span className="text-gray-500">Brand:</span>
                      <span className="ml-2 font-medium text-gray-800">
                        {product.brand}
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductInfo;