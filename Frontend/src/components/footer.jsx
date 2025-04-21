import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedinIn } from 'react-icons/fa';


const Footer = () => {
  return (
    <footer className="bg-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Exclusive Section */}
          <div>
            <h3 className="font-bold text-xl mb-6">Exclusive</h3>
            <p className="mb-4">Subscribe</p>
            <p className="mb-4">Get 10% off your first order</p>
            <div className="flex items-center border border-white rounded-md overflow-hidden">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-transparent p-2 text-sm w-full focus:outline-none"
              />
              <button className="bg-transparent p-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-4 h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </button>
            </div>
          </div>

          {/* Support Section */}
          <div>
            <h3 className="font-bold text-xl mb-6">Support</h3>
            <ul className="space-y-3">
              <li>111 Bijoy sarani, Dhaka,<br />DH 1515, Bangladesh.</li>
              <li>exclusive@gmail.com</li>
              <li>+88015-88888-9999</li>
            </ul>
          </div>

          {/* Account Section */}
          <div>
            <h3 className="font-bold text-xl mb-6">Account</h3>
            <ul className="space-y-3">
              <li><Link to="/account">My Account</Link></li>
              <li><Link to="/login">Login / Register</Link></li>
              <li><Link to="/cart">Cart</Link></li>
              <li><Link to="/wishlist">Wishlist</Link></li>
              <li><Link to="/shop">Shop</Link></li>
            </ul>
          </div>

          {/* Quick Link Section */}
          <div>
            <h3 className="font-bold text-xl mb-6">Quick Link</h3>
            <ul className="space-y-3">
              <li><Link to="/privacy">Privacy Policy</Link></li>
              <li><Link to="/terms">Terms Of Use</Link></li>
              <li><Link to="/faq">FAQ</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Download App Section */}
          <div>
            <h3 className="font-bold text-xl mb-6">Download App</h3>
            <p className="text-sm text-gray-400 mb-4">Save $3 with App New User Only</p>
            <div className="flex space-x-4 mb-4">

              {/* App Store Links */}
              <div className="flex flex-col space-y-2">
                <a href="https://play.google.com" className="block">
                  <img src="/src/assets/googleplay.png" alt="Google Play" className="h-10 object-contain" />
                </a>
                <a href="https://www.apple.com/app-store" className="block">
                  <img src="/src/assets/googleplay.png" alt="App Store" className="h-10 object-contain" />
                </a>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex space-x-4 mt-4">
              <a href="https://facebook.com" className="hover:text-gray-400"><FaFacebook /></a>
              <a href="https://twitter.com" className="hover:text-gray-400"><FaTwitter /></a>
              <a href="https://instagram.com" className="hover:text-gray-400"><FaInstagram /></a>
              <a href="https://linkedin.com" className="hover:text-gray-400"><FaLinkedinIn /></a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-16 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>© Copyright Rimel 2022. All right reserved</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
