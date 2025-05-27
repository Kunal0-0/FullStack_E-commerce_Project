import React, { useState } from "react";
import OtpInput from "./otp-input";

const PhoneOtpForm = () => {
  // const [phoneNumber, setPhoneNumber] = useState("")
  const [email, setEmail] = useState("");
  const [showOtpInput, setShowOtpInput] = useState(false);

  const handleEmail = (event) => {
    setEmail(event.target.value);
  };

  const handleEmailSubmit = async (event) => {
    event.preventDefault();

    // phone validations
    // const regex = /[^0-9]/g;
    // if(phoneNumber.length < 10 || regex.test(phoneNumber)) {
    //   alert("Invalid Phone Number");
    //   return;
    // }

    // Email validations
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      alert("Invalid Email Address");
      return;
    }

    // call backend API
    try {
      const res = await fetch("http://localhost:8000/api/otp/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email: email }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("userEmail", email);
        setShowOtpInput(true);
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (error) {
      alert("Network error");
    }
  };

  const onOtpSubmit = (otp) => {
    console.log("Login Successful", otp);
  };
  return (
    <div>
      {!showOtpInput ? (
        <form onSubmit={handleEmailSubmit}>
          <input
            type="text"
            value={email}
            onChange={handleEmail}
            placeholder="Enter email or Number"
            className="border border-gray-400 rounded focus:outline-none focus:border-black-500 mr-2 px-2"
          />
          <button
            type="submit"
            className="border border-gray-400 rounded focus:outline-none focus:border-black bg-red-500 px-2"
          >
            Submit
          </button>
        </form>
      ) : (
        <div>
          <p> Enter OTP sent to {email}</p>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>
      )}
    </div>
  );
};

export default PhoneOtpForm;
