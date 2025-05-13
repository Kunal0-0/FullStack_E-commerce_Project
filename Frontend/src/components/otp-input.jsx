import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const OtpInput = ({ length = 4, onOtpSubmit = () => {} }) => {
  const [otp, setOtp] = useState(new Array(length).fill(""));
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus(); // this will focus on the very first field of the input field after entering the phone number
    }
  }, []);

  console.log(inputRefs);

  const handleChange = (index, e) => {
    const value = e.target.value;
    if (isNaN(value)) return;

    const newOtp = [...otp];
    // allow only one input
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // submit trigger
    const combinedOtp = newOtp.join("");
    if (combinedOtp.length === length) onOtpSubmit(combinedOtp);

    // Move to next input if current field is filled
    if (value && index < length - 1 && inputRefs.current[index + 1]) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleClick = (index) => {
    inputRefs.current[index].setSelectionRange(1, 1);

    // optional
    if (index > 0 && !otp[index - 1]) {
      inputRefs.current[otp.indexOf("")].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (
      e.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      inputRefs.current[index - 1]
    ) {
      // Move focus to the previous input field on backspace
      inputRefs.current[index - 1].focus();
    }
  };

  const navigate = useNavigate();

  const handleLogin = async () => {
    const email = localStorage.getItem("userEmail");
    // call backend API
    try {
      const res = await fetch("http://localhost:8000/api/otp/verify", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: email, otp: otp }),
      });

      const data = await res.json();
      if (res.ok) {
        alert("OTP verified successfully");
        navigate("/");
      } else {
        alert(data.message || "OTP verification failed");
      }
    } catch (error) {
      alert("Network error");
    }
  };

  return (
    <>
      <div>
        {otp.map((value, index) => {
          return (
            <input
              key={index}
              type="text"
              ref={(input) => (inputRefs.current[index] = input)} // this will provide reference of each input field
              value={value}
              onChange={(e) => handleChange(index, e)}
              onClick={() => handleClick(index)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              className="w-[40px] h-[40px] m-[5px] text-center text-[1.2em] border border-gray-400 rounded focus:outline-none focus:border-red-500 mb-2"
            />
          );
        })}
      </div>

      <button
        type="button"
        onClick={handleLogin}
        className="border border-gray-400 rounded focus:outline-none focus:border-black bg-red-500 px-2"
      >
        Login
      </button>
    </>
  );
};

export default OtpInput;
