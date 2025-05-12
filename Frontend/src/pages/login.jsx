import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import PhoneOtpForm from '../components/otp-login';

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Just check both fields are filled
    if (!formData.email || !formData.password) {
      setError('Both fields are required');
      return;
    }
    // authenticate with backend here
    try {
      const res = await fetch("http://localhost:8000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send cookies like refresh token,
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Login failed");
      }
  
      const data = await res.json();
      console.log("User Logged in:", data);
      alert("Account logged in successfully!");
  
      setFormData({ email: '', password: '' });
    } catch (err) {
      console.error("Login error:", err.message);
      alert(err.message);
    }
  };

  const [showPhoneOtp, setShowPhoneOtp] = useState(false);

  const handlePhoneLoginClick = () => {
    setShowPhoneOtp(true);
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
          {!showPhoneOtp ? (
            <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email"
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
              <button
                type='button'
                onClick={handlePhoneLoginClick}
                className="px-8 py-2 bg-red-500 hover:bg-red-600 text-white font-medium rounded transition-colors"
              >
                Log In with OTP
              </button>
              <Link to="#" className="text-red-500 hover:underline text-sm">Forget Password?</Link>
            </div>
          </form>
          ) : (
            <PhoneOtpForm />
          )}
        </div>
      </div>
    </div>
  );
};

export default Login;
