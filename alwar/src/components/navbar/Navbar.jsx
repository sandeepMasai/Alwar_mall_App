import { Link, useNavigate } from "react-router-dom";
import SearchBar from "../searchBar/SearchBar";
import { useSelector } from "react-redux";
import { useState } from "react";

const Navbar = () => {
    const user = JSON.parse(localStorage.getItem('users')); // Get user from localStorage
    const navigate = useNavigate();
    const cartItems = useSelector((state) => state.cart);

    // For controlling dropdown visibility for user/admin
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // Logout function
    const logout = () => {
        localStorage.clear();
        navigate("/login");
    };

    // NavList Data
    const navList = (
        <ul className="flex space-x-3 text-white font-medium text-md px-5">
            {/* Home */}
            <li>
                <Link to={'/'}>Home</Link>
            </li>

            {/* All Products */}
            <li>
                <Link to={'/allproduct'}>All Product</Link>
            </li>

            {/* Conditional Signup/Login Links */}
            {!user ? (
                <>
                    <li>
                        <Link to={'/signup'}>Signup</Link>
                    </li>
                    <li>
                        <Link to={'/login'}>Login</Link>
                    </li>
                </>
            ) : null}

            {/* User/Admin Dropdown */}
            {user && (
                <li className="relative">
                    <button
                        onClick={() => setDropdownOpen(!dropdownOpen)}
                        className="flex items-center space-x-2 text-white"
                    >
                        <span>{user?.name}</span>
                        <svg
                            className="w-4 h-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>
                    {dropdownOpen && (
                        <div className="absolute right-0 mt-2 bg-gray-800 text-white rounded-lg shadow-lg w-48">
                            <ul>
                                {user?.role === "user" && (
                                    <li>
                                        <Link to="/user-dashboard" className="block px-4 py-2">User Dashboard</Link>
                                    </li>
                                )}
                                {user?.role === "admin" && (
                                    <li>
                                        <Link to="/admin-dashboard" className="block px-4 py-2">Admin Dashboard</Link>
                                    </li>
                                )}
                                <li>
                                    <button
                                        onClick={logout}
                                        className="block w-full text-left px-4 py-2 text-red-500"
                                    >
                                        Logout
                                    </button>
                                </li>
                            </ul>
                        </div>
                    )}
                </li>
            )}

            {/* Cart */}
            <li>
                <Link to="/cart" className="flex items-center space-x-2 text-white">
                    <span>Cart</span>
                    <span className="bg-red-500 text-xs rounded-full py-1 px-2">{cartItems.length}</span>
                </Link>
            </li>
        </ul>
    );

    return (
        <nav className="bg-gray-800 sticky top-0 z-50">
            {/* Main Navbar */}
            <div className="lg:flex lg:justify-between items-center py-3 lg:px-5">
                {/* Left: Logo */}
                <div className="left py-3 lg:py-0">
                    <Link to={'/'}>
                        <h2 className="font-bold text-white text-2xl text-center">Alwar-Mall</h2>
                    </Link>
                </div>

                {/* Center: Navigation Links */}
                <div className="flex-grow flex justify-center mb-4 lg:mb-0 lg:flex lg:items-center">
                    {navList}
                </div>

                {/* Right: Search Bar (Mobile and Desktop) */}
                <div className="relative lg:flex hidden">
                    <SearchBar />
                </div>

                {/* Mobile Search Toggle */}
                <div className="lg:hidden flex items-center">
                    <button
                        className="text-white"
                        onClick={() => setDropdownOpen((prev) => !prev)} // Toggle search on mobile
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M10 11h2M10 15h2M10 19h2M14 11h2M14 15h2M14 19h2M4 11h2M4 15h2M4 19h2"
                            />
                        </svg>
                    </button>
                </div>
            </div>

            {/* Mobile Menu */}
            {dropdownOpen && (
                <div className="block lg:hidden bg-gray-800 p-4 absolute top-16 left-0 right-0 shadow-lg z-50">
                    {navList}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
