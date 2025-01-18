import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { addToCart, deleteFromCart } from '../../redux/cartSlice';
import myContext from '../../context/myContext';

const ProductCard = ({ product }) => {
  const { id, title, price, productImageUrl } = product;
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isInCart = useSelector((state) => 
    state.cart.some(item => item.id === id)
  );

  const handleCartAction = () => {
    if (isInCart) {
      dispatch(deleteFromCart(product));
      toast.success('Removed from cart');
    } else {
      dispatch(addToCart(product));
      toast.success('Added to cart');
    }
  };

  return (
    <div className="group relative p-4 rounded-xl transition-all duration-300 hover:shadow-lg">
      <div className="relative h-full overflow-hidden rounded-xl border border-gray-200 bg-white">
        <div 
          onClick={() => navigate(`/productinfo/${id}`)}
          className="cursor-pointer"
        >
          <img
            src={productImageUrl}
            alt={title}
            className="h-64 w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="p-6">
          <div className="mb-2">
            <span className="text-xs font-medium text-gray-500">
              Alwar-Mall
            </span>
          </div>
          
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            {title.length > 25 ? `${title.substring(0, 25)}...` : title}
          </h3>
          
          <p className="mb-4 text-lg font-semibold text-gray-900">
            ₹{price.toLocaleString()}
          </p>
          
          <button
            onClick={handleCartAction}
            className={`w-full rounded-lg py-2 font-medium text-white transition-colors duration-200 ${
              isInCart 
                ? 'bg-red-600 hover:bg-red-700' 
                : 'bg-green-500 hover:bg-green-600'
            }`}
          >
            {isInCart ? 'Remove from Cart' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
};

const HomePageProductCard = () => {
  const { getAllProduct } = useContext(myContext);
  const cartItems = useSelector((state) => state.cart);

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  return (
    <div className="py-12">
      <h2 className="mb-8 text-center text-2xl font-bold text-gray-900">
        Bestselling Products
      </h2>
      
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {getAllProduct.slice(0, 8).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePageProductCard;