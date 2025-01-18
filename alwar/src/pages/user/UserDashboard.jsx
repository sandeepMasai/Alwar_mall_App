import { useContext } from "react";
import Layout from "../../components/layout/Layout";
import myContext from "../../context/myContext";
import Loader from "../../components/loader/Loader";

const UserDashboard = () => {
    // user
    const user = JSON.parse(localStorage.getItem('users'));

    const context = useContext(myContext);
    const { loading, getAllOrder } = context;

    return (
        <Layout>
            <div className="container mx-auto px-4 py-5 lg:py-8 bg-gradient-to-r from-teal-100 via-teal-200 to-teal-300 min-h-screen">
                {/* Profile Section */}
                <div className="top mb-10">
                    <div className="bg-white p-8 rounded-xl border border-teal-400 shadow-xl">
                        <div className="flex justify-center mb-5">
                            <img
                                src="https://cdn-icons-png.flaticon.com/128/2202/2202112.png"
                                alt="user-avatar"
                                className="w-24 h-24 rounded-full border-4 border-teal-500 object-cover"
                            />
                        </div>

                        <div>
                            <h1 className="text-center text-2xl font-semibold text-teal-600">
                                Welcome, {user?.name}
                            </h1>
                            <p className="text-center text-sm text-gray-600">Role: {user?.role}</p>

                            <div className="mt-5 space-y-3">
                                <p className="text-center text-lg">
                                    <span className="font-bold">Email: </span>{user?.email}
                                </p>
                                <p className="text-center text-lg">
                                    <span className="font-bold">Date Joined: </span>{user?.date}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Orders Section */}
                <div className="bottom">
                    <div className="mx-auto my-4 max-w-6xl px-2 md:my-6 md:px-0">
                        <h2 className="text-2xl lg:text-3xl font-bold text-teal-600 mb-6">
                            Your Order Details
                        </h2>

                        {loading && (
                            <div className="flex justify-center mb-8">
                                <Loader />
                            </div>
                        )}

                        {/* Order List */}
                        {getAllOrder
                            .filter((order) => order.userid === user?.uid)
                            .map((order, index) => {
                                return (
                                    <div key={index} className="mb-8 p-4 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all">
                                        <div className="flex justify-between items-center mb-4">
                                            <div>
                                                <span className="text-lg font-semibold text-teal-600">Order ID: #{order.id}</span>
                                            </div>
                                            <div className="text-sm text-gray-500">{order.date}</div>
                                        </div>

                                        {order.cartItems.map((item, itemIndex) => {
                                            const { id, date, quantity, price, title, productImageUrl, category } = item;
                                            const { status } = order;

                                            return (
                                                <div key={itemIndex} className="flex flex-col md:flex-row items-center p-5 mb-5 bg-teal-50 rounded-lg shadow-md hover:shadow-lg transition-all">
                                                    {/* Product Image */}
                                                    <div className="w-full md:w-32 h-32 md:h-40 flex-shrink-0 overflow-hidden rounded-lg shadow-sm">
                                                        <img
                                                            src={productImageUrl}
                                                            alt={title}
                                                            className="w-full h-full object-cover transform transition-transform duration-300 hover:scale-110"
                                                        />
                                                    </div>

                                                    {/* Order Details */}
                                                    <div className="md:ml-5 flex-1">
                                                        <p className="font-semibold text-teal-600">{title}</p>
                                                        <p className="text-sm text-gray-500">{category}</p>
                                                        <p className="mt-2 text-sm text-gray-800">x {quantity}</p>
                                                        <p className="mt-2 text-lg font-bold text-teal-600">₹ {price * quantity}</p>
                                                    </div>

                                                    {/* Order Status */}
                                                    <div className="ml-auto mt-4 md:mt-0">
                                                        <span
                                                            className={`text-sm font-semibold ${
                                                                status === "Pending"
                                                                    ? "text-yellow-500"
                                                                    : status === "Shipped"
                                                                    ? "text-blue-500"
                                                                    : "text-green-500"
                                                            }`}
                                                        >
                                                            {status}
                                                        </span>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    </div>
                                );
                            })}
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default UserDashboard;
