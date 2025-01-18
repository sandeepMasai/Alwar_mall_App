import { useNavigate } from "react-router";
import Layout from "../../components/layout/Layout";
import { useContext, useEffect, useCallback } from "react";
import myContext from "../../context/myContext";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { addToCart, deleteFromCart } from "../../redux/cartSlice";

const AllProduct = () => {
    const navigate = useNavigate();
    const context = useContext(myContext);
    const { getAllProduct } = context;

    const cartItems = useSelector((state) => state.cart);
    const dispatch = useDispatch();

    // Add item to cart
    const addCart = useCallback(
        (item) => {
            dispatch(addToCart(item));
            toast.success("Added to cart");
        },
        [dispatch]
    );

    // Remove item from cart
    const deleteCart = useCallback(
        (item) => {
            dispatch(deleteFromCart(item));
            toast.success("Removed from cart");
        },
        [dispatch]
    );

    // Store cart data in local storage
    useEffect(() => {
        localStorage.setItem("cart", JSON.stringify(cartItems));
    }, [cartItems]);

    return (
        <Layout>
            <div className="py-8">
                {/* Heading */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-semibold text-gray-900">All Products</h1>
                </div>

                {/* Main Product Grid */}
                <section className="text-gray-600 body-font">
                    <div className="container px-5 lg:px-0 py-5 mx-auto">
                        <div className="flex flex-wrap -m-4">
                            {getAllProduct.map((item) => {
                                const { id, title, price, productImageUrl } = item;
                                const isInCart = cartItems.some((p) => p.id === item.id);

                                return (
                                    <div key={id} className="p-4 w-full sm:w-1/2 lg:w-1/4">
                                        <div className="h-full border border-gray-300 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105 cursor-pointer">
                                            {/* Product Image */}
                                            <img
                                                onClick={() => navigate(`/productinfo/${id}`)}
                                                className="lg:h-80 h-96 w-full object-cover"
                                                src={productImageUrl}
                                                alt={title}
                                                onError={(e) => (e.target.src = "/images/fallback.png")} // Fallback image
                                            />

                                            {/* Product Info */}
                                            <div className="p-6">
                                                <h2 className="tracking-widest text-xs font-medium text-gray-400 mb-1">
                                                    Alwar-Mall
                                                </h2>
                                                <h1 className="text-lg font-medium text-gray-900 mb-3">
                                                    {title.length > 25 ? title.substring(0, 25) + "..." : title}
                                                </h1>
                                                <h2 className="text-lg font-semibold text-gray-900 mb-3">₹{price}</h2>

                                                {/* Add to Cart or Remove from Cart Button */}
                                                <div className="flex justify-center mt-4">
                                                    {isInCart ? (
                                                        <button
                                                            onClick={() => deleteCart(item)}
                                                            className="bg-red-700 hover:bg-red-600 w-full text-white py-2 px-4 rounded-lg font-bold transition duration-200"
                                                        >
                                                            Remove From Cart
                                                        </button>
                                                    ) : (
                                                        <button
                                                            onClick={() => addCart(item)}
                                                            className="bg-green-500 hover:bg-green-400 w-full text-white py-2 px-4 rounded-lg font-bold transition duration-200"
                                                        >
                                                            Add To Cart
                                                        </button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            </div>
        </Layout>
    );
};

export default AllProduct;
