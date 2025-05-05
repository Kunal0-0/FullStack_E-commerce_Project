import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await fetch("http://localhost:8000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // send cookies like refresh token,
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          mobile_number: formData.mobile_number,
          password: formData.password,
        }),
      });
  
      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText || "Signup failed");
      }
  
      const data = await res.json();
      console.log("User signed up:", data);
      alert("Account created successfully!");
  
      setFormData({ name: '', email: '', mobile_number: '', password: '' });
    } catch (err) {
      console.error("Signup error:", err.message);
      alert(err.message);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-150px)]">
      {/* Left side - Hero Image */}
      <div className="hidden md:flex md:w-1/2 bg-blue-50 items-center justify-center p-10">
        <img
          src="./src/assets/dl.beatsnoop 1.jpg"
          alt="Shopping Cart with Smartphone"
          className="w-full h-auto max-w-md object-contain"
        />
      </div>

      {/* Right side - Sign Up Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          <h1 className="text-2xl font-bold mb-6">Create an account</h1>
          <p className="text-gray-600 mb-8">Enter your details below</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Name"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <input
                type="tel"
                name="mobile_number"
                value={formData.mobile_number}
                onChange={handleChange}
                placeholder="Mobile Number"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 px-4 bg-red-500 hover:bg-red-600 text-white font-medium rounded transition-colors"
            >
              Create Account
            </button>
          </form>

          <button className="w-full mt-4 py-3 px-4 border border-gray-300 rounded flex items-center justify-center space-x-2 hover:bg-gray-50 transition-colors">
            <FcGoogle className="text-xl" />
            <span>Sign up with Google</span>
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have account?{" "}
              <Link to="/login" className="text-blue-600 font-semibold">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
