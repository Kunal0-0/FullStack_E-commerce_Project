import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Just check both fields are filled
    if (!formData.email || !formData.password) {
      setError('Both fields are required');
      return;
    }
    // authenticate with backend here
    alert('Login successful!');
  };

  return (
    <div className="flex min-h-[calc(100vh-150px)]">
      {/* Left image */}
      <div className="hidden md:flex md:w-1/2 bg-blue-50 items-center justify-center p-10">
        <img
          src="./src/assets/dl.beatsnoop 1.jpg"
          alt="Shopping Cart"
          className="w-full h-auto max-w-md object-contain"
        />
      </div>
      {/* Right login box */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Log in to Exclusive</h1>
          <p className="text-gray-600 mb-8">Enter your details below</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email or Phone Number"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              />
            </div>
            {error && <div className="text-red-600 text-sm">{error}</div>}
            <div className="flex justify-between items-center mt-2">
              <button
                type="submit"
                className="px-8 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded transition-colors"
              >
                Log In
              </button>
              <Link to="#" className="text-red-500 hover:underline text-sm">Forget Password?</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
