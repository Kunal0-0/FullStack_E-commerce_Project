import React, { useEffect, useState } from "react";
import { useSelector } from 'react-redux';
import { FaSearch, FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom'

const Header = () => {
  const user = useSelector((state) => state.auth.user)
  console.log("Header - user from Redux:", user);
  return (
    <header className="w-full">
      {/* Top banner */}
      <div className="w-full bg-black text-white text-center py-2 text-sm">
        <p>Summer Sale For All Items And Free Express Delivery - OFF 50%! <span className="font-semibold">ShopNow</span></p>
      </div>

      {/* Main header with navigation */}
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="font-bold text-xl">
          <Link to="/">Exclusive</Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="hover:text-gray-600">Home</Link>
          <Link to="/contact" className="hover:text-gray-600">Contact</Link>
          <Link to="/about" className="hover:text-gray-600">About</Link>
          <Link to="/signup" className="hover:text-gray-600 font-semibold">Sign Up</Link>
        </nav>

        {/* Search and Cart */}
        <div className="flex items-center space-x-4">
          {/* Search */}
          <div className="relative">
            <input
              type="text"
              placeholder="What are you looking for?"
              className="bg-gray-100 py-2 pl-4 pr-10 rounded-md w-56 focus:outline-none"
            />
            <button className="absolute right-3 top-1/2 transform -translate-y-1/2">
              <FaSearch className="text-gray-500" />
            </button>
          </div>

          {/* Cart icon only shown if logged in */}
          {user && (
            <Link to="/cart" className="relative">
              <FaShoppingCart className="text-2xl text-gray-700 bg-red-200" />
            </Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
